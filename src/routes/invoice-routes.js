import express from "express";
import {
  createInvoice,
  unpaidInvoices,
  payInvoice,
  getUnpaidInvoices,
  getClientInvoices
} from "../controller/invoice-controller.js";
import auth from "../middleware/auth.js";

const invoiceRouter = express.Router();

invoiceRouter.post("/createInvoice", auth, createInvoice);
invoiceRouter.get("/unpaidInvoices", auth, unpaidInvoices);
invoiceRouter.put("/payInvoice/:id", auth, payInvoice);
invoiceRouter.get("/businessOwner/:id/unpaidInvoices", auth, getUnpaidInvoices);
invoiceRouter.get("/client/:id/invoices", auth, getClientInvoices);

export default invoiceRouter;