import express from "express";
import {login,register} from "../controllers/loginandreg.js"
import getAllusers from "../controllers/getAllUsers.js"
import deleteUser from "../controllers/deleteUser.js";

const router = express.Router();

router.post("/login",login)
router.post("/register",register)
router.get("/allusers",getAllusers)
router.delete("/delete/:id",deleteUser)

export default router;