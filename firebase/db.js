import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Make some attending choices

export const doCreateFood = (id, food) =>
  db.ref(`users/${id}`).update({
    food
  })
