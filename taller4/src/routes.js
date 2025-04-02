const express = require("express");
const { getUsersByHobby, getUsersExists, getUsersHobbyCount, getIsFree, suggestHobby, createUser } = require("./controller");
const router = express.Router();

router.get("/users/hobby", getUsersByHobby);
router.get("/users/exists", getUsersExists);
router.get("/users/hobby/count", getUsersHobbyCount);
router.get("/users/is-free", getIsFree);
router.post("/users/suggest", suggestHobby);
router.post("/users/", createUser);

module.exports = router;


