const { readUsersFile } = require("../services/dataService");

async function filterUsersByField(field, value) {
    const users = await readUsersFile();
    return users.filter(user => user[field] === value);
}

module.exports = filterUsersByField;
