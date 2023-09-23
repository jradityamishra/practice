import express from "express";
import {
  registerCandidate,
  voteController,
  getCandidate,
} from "../controllers/registerCandidateController.js";
import {
  verifyIfLoggedIn,
  verifyIfSuperAdmin,
} from "../middlewares/verifyAuthToken.js";
//Object
const router = express.Router();
router.use(verifyIfLoggedIn);
router.put("/vote/:voter_id/:can_id", voteController);
router.get("/candidate", getCandidate);
router.use(verifyIfSuperAdmin);
router.post("/registercandidate", registerCandidate);

export default router;
