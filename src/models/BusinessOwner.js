import mongoose from "mongoose";

const businessOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   password: {
        type: String,
        required: true,
    },
});

const BusinessOwner = mongoose.model("BusinessOwner", businessOwnerSchema);

export default BusinessOwner;


