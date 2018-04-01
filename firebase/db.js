import { db } from './firebase';

// Save user as guests in realtime db

export const doCreateUser = (id, username, email) =>
  db.ref(`guests/${id}`).set({
    username,
    email,
  });

export const doCreateNonAtendee = (name, message) =>
  db.ref(`notAttending/${name}`).set({
    message
  })

export const onceGetUsers = (id) =>
  db.ref(`guests/${id}`).once('value');

// Make some attending choices

export const doCreateFood = (id, food, starterWithoutProscuitto, risotto, steak, plusOneName = 'na', menuSelected) =>
  db.ref(`guests/${id}`).update({
    food,
    starterWithoutProscuitto,
    risotto,
    steak,
    plusOneName,
    menuSelected
  })
