const express = require("express");

const router = express.Router();

// import controller
const { register, login, getUser, editUser, getUsers,
  deleteUser, updatePassword, resetPassword, checkAuth } = require("../controllers/user");

// import middleware auth
const { auth } = require("../middlewares/auth");

// add route
router.post("/user", auth, register);
router.post("/login", login);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", auth, editUser);
router.delete("/user/:id", auth, deleteUser);
router.patch("/password", auth, updatePassword);
router.post("/password", resetPassword);
router.get("/users", getUsers)

router.get("/check-auth", auth, checkAuth);

module.exports = router;