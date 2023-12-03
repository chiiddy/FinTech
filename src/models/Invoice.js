import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    invoiceDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
    