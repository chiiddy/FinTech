// import express from "express";
// import { addBusinessOwner } from "../controllers/businessOwner-controller.js";

// const businessOwnerRouter = express.Router();

// businessOwnerRouter.post("/addBusinessOwner", addBusinessOwner);

// export default businessOwnerRouter;

import express from "express";
import {
    signup,
    login,

} from "../controller/businessOwner-controller.js";


const businessOwnerRouter = express.Router();

businessOwnerRouter.post("/signup", signup);
businessOwnerRouter.post("/login", login);


export default businessOwnerRouter;