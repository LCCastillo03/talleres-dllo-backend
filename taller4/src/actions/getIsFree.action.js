const { readUsersFile } = require("../services/dataService");

async function getIsFree() {
    const users = await readUsersFile();
    return users.filter(user => user.hobbies.length < 3)
                .map(user => ({ nombre: `${user.nombre} ${user.apellido}`, hobbies: user.hobbies }));
}

module.exports = getIsFree;
