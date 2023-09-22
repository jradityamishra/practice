import express from 'express';
import {registerCandidate,voteController} from "../controllers/registerCandidateController.js"

//Object
const router=express.Router();

router.post("/registercandidate",registerCandidate);
router.put("/vote/:voter_id/:can_id",voteController);


export default router;