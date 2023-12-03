import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import invoiceRouter from "./src/routes/invoice-routes.js";
import businessOwnerRouter from "./src/routes/businessOwner-routes.js";
import clientRouter from "./src/routes/client-routes.js";
// import crypto from "crypto"

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

// middlewares
app.use("/invoice", invoiceRouter);
app.use("/businessOwner", businessOwnerRouter);
app.use("/client", clientRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
});

async function connect() {
  try {
    server.listen(4000, () => {
      connectDB(process.env.MONGODB_PASSWORD);
      console.log("server is running on  port 4000");
    });
  } catch (err) {
    console.log(err);
  }
}
connect();
//const secretkey = crypto.randomBytes(32).toString("hex")
//console.log(secretkey)

  // On the client side, you would listen for the new events like this:

//   const socket = io('http://localhost:3000');
// socket.on('unpaidInvoice', (invoice) => {
//   console.log('Unpaid invoice received:', invoice);
// });

// const socket = io('http://localhost:3000');

// socket.on('unpaidInvoice', (invoice) => {
//   displayNotification('Unpaid invoice received:', invoice);
// });

// socket.on('invoicePaid', (invoice) => {
//   displayNotification('Invoice paid:', invoice);
// });

// function displayNotification(title, message) {
//   // Display a notification to the user
// }

// function handleError(error) {
//   // Display an error message to the user
// }

// const socket = io('http://localhost:3000');

// socket.on('unpaidInvoice', (invoice) => {
//   displayNotification('Unpaid invoice received:', invoice);
// });

// socket.on('invoicePaid', (invoice) => {
//   displayNotification('Invoice paid:', invoice);
// });

// function displayNotification(title, message) {
//   // Display a notification to the user
// }

// function handleError(error) {
//   // Display an error message to the user
//   // Retry the request if it failed due to a network error
//   if (error.message === 'Network Error') {
//     retryRequest(error.config);
//   }
// }

// function retryRequest(config) {
//   // Retry the request with the same config
// }