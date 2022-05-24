const admin = require('../firebase.js');
const { getDatabase, ref, set } = require("firebase/database");

const db = admin.database();
async function writeBirthday(userId, username, month, day) {
  try {
    await set(ref(db, 'birthdays/' + userId), {
      username,
      month,
      day
    });
  } catch (error) {
    console.error(`Something went wrong writing birthday ${month}/${day} for user ${userId}`);
  }
  
}

module.exports = {writeBirthday};