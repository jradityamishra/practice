import express from 'express'
import {mailconfirmController} from '../controllers/mailAuthController.js'
const router=express.Router();


//ROUTER
router.post("/mailconfirm",mailconfirmController)

export default router;