const admin = require('../firebase.js');
const { ref, child, get } = require("firebase/database");

const dbRef = ref(admin.database());
async function readBirthday(userId) {
    try {
        const snapshot = await get(child(dbRef, `birthdays/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {readBirthday};