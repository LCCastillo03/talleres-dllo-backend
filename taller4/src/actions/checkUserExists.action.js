const { readUsersFile } = require("../services/dataService");

async function checkUserExists(codigo) {
    const users = await readUsersFile();
    return users.some(user => user.codigo === codigo);
}

module.exports = checkUserExists;
