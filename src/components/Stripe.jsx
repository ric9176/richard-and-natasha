import React from 'react'
import { Form, Input, Divider, Button, Confirm, Label, Message } from 'semantic-ui-react'
import { firebase, db } from '../../firebase'
import SignInForm from '../signup/SignInForm'
import SignUpForm, { updateByPropertyName } from '../signup'
import Link from 'gatsby-link';

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
				errorMessage: null,
				message: "",
				complete: false
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
			payload.amount = parseInt(this.state.amount + "00")
			console.log('payload', payload)
			if (payload.error) {
				this.setState({ errorMessage: payload.error.message})
			} else {
				firebase.auth.onAuthStateChanged((authUser) => {
					const uid = authUser && authUser.uid || 'anon'
					console.log('uid', uid)
					db.donate(uid, payload)
						this.setState({
							message: "Thanks for donating!",
							amount: undefined,
							complete: true
						})
				})
			}
		})
  }

  render() {
    return (
			<div>
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
        <Button disabled={this.state.complete} primary>Pay</Button>
      </Form>
   			{
					this.state.errorMessage &&
					<Message floating>{this.state.errorMessage}</Message>
				}
				{
					this.state.message &&
					<Message floating>{this.state.message}</Message>
				}
				</div>
    )
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
		this.state = {
			loggedIn: undefined,
			mustSignUp: false
		}
  }
	componentDidMount() {
		firebase.auth.onAuthStateChanged((authUser) => {
			if (!authUser) {
				this.setState({ loggedIn: false})
			} else {
				this.setState({ loggedIn: true})
			}
		})
	}

	handleSignUp = () => {
		this.setState({ mustSignUp: true })
	}

  render() {
		console.log("state", this.state)
    // const {elementFontSize} = this.state;
    return (
			<div>
				{this.state.loggedIn ?
					<div className="Checkout">
						<h2>Donate via bank transfer or VENMO</h2>
						<p>If you'd prefer to transfer to our UK or USA bank account directly please contact us by email for the details</p>
						<h2>Donate via debit/credit card</h2>
						<Elements>
							<CardForm fontSize="1" />
						</Elements>
					</div>
					:
					<div>
						<SignInForm />
						<p>Don't have a login? Please <button onClick={this.handleSignUp}>click here</button> to sign up</p>
					</div>
				 }
				 {this.state.mustSignUp &&
					 <SignUpForm />
				 }
   		</div>
    )
  }
}

const Stripe = (props) => (
  <div>
    <StripeProvider style={{width: "100%"}} stripe={props.stripe}>
      <Checkout />
    </StripeProvider>
  </div>
)

export default Stripe
