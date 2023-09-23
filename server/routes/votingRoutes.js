
import { Router } from "express";
import { verifyIfLoggedIn,verifyIfSuperAdmin } from "../middlewares/verifyAuthToken.js";
import { createVoting,startVoting,endVoting,getVotingStatus,getResults} from "../controllers/voteController.js";

const router = Router(); 


router.use(verifyIfLoggedIn)
router.get("/get-results",getResults);
router.get("/get-status", getVotingStatus);
router.use(verifyIfSuperAdmin)
router.get("/create", createVoting);
router.put("/start", startVoting);
router.put("/end", endVoting);
export default router; 
