import express from 'express';
import adharmulter from '../middlewares/adharmulter.js'
//import router from './userRoutes';
import {faceRecognitionController,postDatafromCv,postResultCv} from "../controllers/faceRecognitinController.js"

//Object
const router=express.Router();


//Router
router.post("/face",faceRecognitionController);
router.post('/datapostCv',postDatafromCv)
router.post('/datapostresultCv',postResultCv)

export default router;