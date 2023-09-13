import express from 'express'
import {mailconfirmController,verifymail} from '../controllers/mailAuthController.js'
const router=express.Router();


//ROUTER
router.post("/mailconfirm",mailconfirmController);
router.get("/verify",verifymail)

export default router;