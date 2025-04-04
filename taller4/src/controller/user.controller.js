const getUsersByHobbyAction = require("../actions/filterUsersByFieldIncludes.action");
const getUsersExistsAction = require("../actions/checkUserExists.action");
const createUserAction = require("../actions/createUser.action");
const getIsFreeAction = require("../actions/getIsFree.action");
const suggestHobbyAction = require("../actions/suggestHobby.action");
const getUsersHobbyCountAction = require("../actions/getUsersHobbyCount.action");

async function getUsersByHobby(req, res) {
  const { hobby } = req.query;
  if (!hobby) return res.status(400).json({ error: "Debes enviar un hobby" });

  const users = await getUsersByHobbyAction("hobbies", hobby);
  if (users.length === 0) return res.status(404).json({ message: "Este hobby no tiene usuarios" });
  res.json(users);
}

async function getUsersExists(req, res) {
  const { codigo } = req.query;
  if (!codigo) return res.status(400).json({ error: "Debes enviar un código" });

  const exists = await getUsersExistsAction(codigo);
  res.json({ message: exists ? `Usuario con código ${codigo} existe` : "Usuario no encontrado" });
}

async function getUsersHobbyCount(req, res) {
  const { hobby } = req.query;

  if (!hobby) {
    return res.status(400).json({ error: "Debes enviar un hobby" });
  }
  try {
    const cantidad = await getUsersHobbyCountAction(hobby);
    res.json({ hobby, cantidad });
  } catch (error) {
    console.error("Error al obtener la cantidad de usuarios por hobby:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getIsFree(req, res) {
  try {
    const users = await getIsFreeAction();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios con menos de 3 hobbies." });
  }
}

async function suggestHobby(req, res) {
  const { codigo, hobby } = req.body;

  if (!codigo || !hobby) {
    return res.status(400).json({ error: "Debes enviar un código y un hobby" });
  }

  try {
    const result = await suggestHobbyAction(codigo, hobby);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function createUser(req, res) {
  const { codigo, nombre, apellido, hobbies } = req.body;

  if (!codigo || !nombre || !apellido || !hobbies || hobbies.length < 2) {
    return res.status(400).json({ error: "Campos obligatorios: codigo, nombre, apellido y mínimo 2 hobbies" });
  }

  try {
    const newUser = { codigo, nombre, apellido, hobbies };
    const user = await createUserAction(newUser);
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
