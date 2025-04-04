const { readUsersFile } = require("../services/dataService");

async function getUsersHobbyCount(hobby) {
    const users = await readUsersFile();
    return users.filter(user => user.hobbies.includes(hobby)).length;
}

module.exports = getUsersHobbyCount;
