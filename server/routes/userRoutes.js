
import { Router } from "express";
import { verifyIfLoggedIn,verifyIfAdmin,verifyIfSuperAdmin } from "../middlewares/verifyAuthToken.js";
import { getUsers, registerUser, loginUser, makeAdmin,refreshToken, getUserProfile,uploadImage } from "../controllers/userController.js";

const router = Router(); 

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(verifyIfLoggedIn)
router.post("/upload/:id",uploadImage);
router.get("/refresh-token",refreshToken)
router.get("/get-profile/:id",getUserProfile)
//profile routes

//admin routes
router.use(verifyIfAdmin)
router.get("/",getUsers)

// superadmin routes
router.use(verifyIfSuperAdmin)
router.put("/:id", makeAdmin);

export default router; 
