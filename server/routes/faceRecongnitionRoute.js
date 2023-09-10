import express from 'express';
import adharmulter from '../middlewares/adharmulter.js'
//import router from './userRoutes';
import {faceRecognitionController} from "../controllers/faceRecognitinController.js"

//Object
const router=express.Router();


//Router
router.post("/face",adharmulter.single("photo"),faceRecognitionController);

export default router;