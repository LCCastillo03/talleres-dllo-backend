const filterUsersByField = require("../actions/filterUsersByField.action");
const filterUsersByFieldIncludes = require("../actions/filterUsersByFieldIncludes.action");
const checkUserExists = require("../actions/checkUserExists.action");
const createUserAction = require("../actions/createUser.action");
const { readUsersFile, writeUsersFile } = require("../services/dataService");


async function getUsersByHobby(req, res) {
  const { hobby } = req.query;
  if (!hobby) return res.status(400).json({ error: "Debes enviar un hobby" });

  const users = await filterUsersByFieldIncludes("hobbies", hobby);
  if (users.length === 0) return res.status(404).json({ message: "Este hobby no tiene usuarios" });
  res.json(users);
}

async function getUsersExists(req, res) {
  const { codigo } = req.query;
  if (!codigo) return res.status(400).json({ error: "Debes enviar un código" });

  const exists = await checkUserExists(codigo);
  res.json({ message: exists ? `Usuario con código ${codigo} existe` : "Usuario no encontrado" });
}

async function getUsersHobbyCount(req, res) {
  const { hobby } = req.query;
  if (!hobby) return res.status(400).json({ error: "Debes enviar un hobby" });

  const users = await filterUsersByFieldIncludes("hobbies", hobby);
  res.json({ hobby, cantidad: users.length });
}

async function getIsFree(req, res) {
  const users = await readUsersFile();
  const result = users
    .filter(u => u.hobbies.length < 3)
    .map(u => ({ nombre: `${u.nombre} ${u.apellido}`, hobbies: u.hobbies }));
  res.json(result);
}

async function suggestHobby(req, res) {
  const { codigo, hobby } = req.body;
  if (!codigo || !hobby) return res.status(400).json({ error: "Debes enviar un código y un hobby" });

  const users = await readUsersFile();
  const user = users.find(u => u.codigo === codigo);

  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  if (user.hobbies.length >= 3) {
    return res.json({ message: `El usuario ${user.nombre} ${user.apellido} ya tiene 3 hobbies` });
  }

  user.hobbies.push(hobby);
  await writeUsersFile(users);

  res.json({ message: `Hobby agregado a ${user.nombre} ${user.apellido}`, usuario: user });
}

async function createUser(req, res) {
  const { codigo, nombre, apellido, hobbies } = req.body;

  if (!codigo || !nombre || !apellido || !hobbies || hobbies.length < 2) {
    return res.status(400).json({ error: "Campos obligatorios: codigo, nombre, apellido y mínimo 2 hobbies" });
  }

  try {
    const user = await createUserAction({ codigo, nombre, apellido, hobbies });
    res.status(201).json({ message: "Usuario creado", usuario: user });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
}

module.exports = {
  getUsersByHobby,
  getUsersExists,
  getUsersHobbyCount,
  getIsFree,
  suggestHobby,
  createUser
};
