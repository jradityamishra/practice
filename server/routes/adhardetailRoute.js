import express from 'express'
import adharmulter from '../middleware/adharmulter.js'
import {adhar_detail_post_Controller,
    get_detail_post_Controller} from '../controller/adhardetailController.js';

//Router object
const router=express.Router();

//-------------- ROUTING-----------

//ADHAR DETAIL POST
router.post('/adhardetailpost',adharmulter.single("photo"),adhar_detail_post_Controller)
router.post('/getadhardetail',get_detail_post_Controller)

export default router;


