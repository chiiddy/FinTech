import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    businessOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessOwner",
    },
    invoices: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        },
    ],
    });

const Client = mongoose.model("Client", ClientSchema);

export default Client;


