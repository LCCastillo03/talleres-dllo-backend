const express = require("express");
const {
  getUsersByHobby,
  getUsersExists,
  getUsersHobbyCount,
  getIsFree,
  suggestHobby,
  createUser
} =require("./controller");

// INIT ROUTES
const router = express.Router();

// WRAPPER FUNCTIONS 
router.get("/users/hobby", async (req, res) => {
  await getUsersByHobby(req, res);
});

router.get("/users/exists", async (req, res) => {
  await getUsersExists(req, res);
});

router.get("/users/hobby/count", async (req, res) => {
  await getUsersHobbyCount(req, res);
});

router.get("/users/is-free", async (req, res) => {
  await getIsFree(req, res);
});

router.post("/users/suggest", async (req, res) => {
  await suggestHobby(req, res);
});

router.post("/users", async (req, res) => {
  await createUser(req, res);
});

// EXPORT ROUTES
module.exports = router;




