import { db } from './firebase';

// Save user as guests in realtime db

export const doCreateUser = (id, username, email) =>
  db.ref(`guests/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('guests').once('value');

// Make some attending choices

export const doCreateFood = (id, food, starterWithoutProscuitto, risotto, steak) =>
  db.ref(`guests/${id}`).update({
    food,
    starterWithoutProscuitto,
    risotto,
    steak
  })
