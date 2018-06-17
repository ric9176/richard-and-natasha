import React from 'react'
import { Form, Input, Divider, Button, Confirm, Label } from 'semantic-ui-react'
import { firebase, db } from '../../firebase'
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

import {
	CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements'

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (e, data) => {
  console.log('[change]', data);
	console.log('e', e)
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends React.Component {

	constructor() {
	    super()
	    this.state = {
	      amount: undefined,
	    }
	  }

	handleChange = e => {
		const amount = parseInt(e.target.value) ? parseInt(e.target.value) : 0
		this.setState({amount})
	}

	processPayment = (token, amount) => {
		const payment = { token, amount }
		db.donate(user, payment)
	}

  handleSubmit = ev => {
    ev.preventDefault();
    const payload = this.props.stripe.createToken().then(payload => {
			payload.amount = this.state.amount
			console.log(payload)
			firebase.auth.onAuthStateChanged(authUser => {
				db.donate(authUser.uid, payload)
				console.log('saved!')
			})
		})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
				<div>
				<Label basic>£</Label>
					<Input
						value={this.state.amount}
						onChange={this.handleChange}
						placeholder="Amount in pounds GDP"
					>
     			</Input>
				<Label>.00</Label>
    		</div>
        <label style={{width: "50%"}}>
          Card details
          <CardElement
            style={{width: '100%'}}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <Button primary>Pay</Button>
      </Form>
    );
  }
}

const CardForm = injectStripe(_CardForm);

class _SplitForm extends React.Component {

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => console.log(payload));

  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
			<p>something</p>
        <label>
          Card number
          <CardNumberElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label>
          Postal code
          <PostalCodeElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pays</button>
      </form>
    );
  }
}
const SplitForm = injectStripe(_SplitForm);

class Checkout extends React.Component {
  constructor() {
    super();

		// const dom = new JSDOM(`<!DOCTYPE html>`);
    //
    // this.state = {
    //   elementFontSize: dom.window.innerWidth < 450 ? '14px' : '18px',
    // };
    //
    // dom.window.addEventListener('resize', () => {
    //   if (dom.window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
    //     this.setState({elementFontSize: '14px'});
    //   } else if (
    //     dom.window.innerWidth >= 450 &&
    //     this.state.elementFontSize !== '18px'
    //   ) {
    //     this.setState({elementFontSize: '18px'});
    //   }
    // });
  }

  render() {
    // const {elementFontSize} = this.state;
    return (
      <div className="Checkout">
				<h2>Donate via bank transfer or VENMO</h2>
				<p>If you'd prefer to transfer to our UK or USA bank account directly please contact us by email for the details</p>
        <h2>Donate via debit/credit card</h2>
        <Elements>
          <CardForm fontSize="1" />
        </Elements>
        {/* <h2>Card Split-field Form</h2> */}
        {/* <Elements>
          <SplitForm fontSize={elementFontSize} />
        </Elements> */}
      </div>
    );
  }
}

const Stipe = () => (
  <div>
    <StripeProvider style={{width: "100%"}} apiKey="pk_live_UdQGuT6Qe69RFTpuSgCurP5K">
      <Checkout />
    </StripeProvider>
  </div>
)

export default Stipe
