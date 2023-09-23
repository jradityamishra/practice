import express from 'express'
import {mailconfirmController,verifymail,mailconfirmCheckController,} from '../controllers/mailAuthController.js'
const router=express.Router();


//ROUTER
router.post("/mailconfirm",mailconfirmController);
router.post("/mailconfirmcheck",mailconfirmCheckController);
router.get("/verify",verifymail)

export default router;