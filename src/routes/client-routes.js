import express from "express";
import {
  addClient,
  getClients,
  getClientsWithUnpaidInvoices
} from "../controller/client-controller.js";
import auth from "../middleware/auth.js";

const clientRouter = express.Router();

clientRouter.post("/addClient", auth, addClient);
clientRouter.get("/businessOwner/:id/clients", auth, getClients);
clientRouter.get("/clientsWithUnpaidInvoices", auth, getClientsWithUnpaidInvoices);

export default clientRouter;