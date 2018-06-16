
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey)



exports.stripeCharge = functions.database
                                .ref('/donations/{userId}/{paymentId}/payload')
                                .onWrite((snap, context) => {

  console.log('EVENT', snap.after.val())
  const payment = snap.after.val()
  const userId = context.params.userId;
  const paymentId = context.params.paymentId;

  // return admin.database()
  //      .ref(`/donations/{userId}/{paymentId}/charge`)
  //      .set({event: amount})
  //
  // console.log('after write')

  // checks if payment exists or if it has already been charged
  if (!payment || payment.charge) return;

  return admin.database()
              .ref(`/users/${userId}`)
              .once('value')
              .then(snapshot => {
                  return snapshot.val();
               })
               .then(customer => {

                 const amount = payment.amount;
                 const idempotency_key = paymentId;  // prevent duplicate charges
                 const source = payment.token.id;
                 const currency = 'gbp';
                 const charge = {amount, currency, source};


                 return stripe.charges.create(charge, { idempotency_key });

               })

               .then(charge => {
                   admin.database()
                        .ref(`/payments/${userId}/${paymentId}/charge`)
                        .set(charge)
                  })
  //

});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
