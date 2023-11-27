import Client from "../models/Client.js";
import jwt from 'jsonwebtoken';


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const addClient = async (req, res) => {
    try {
        const client = new Client({ ...req.body, businessOwner: req.user._id });
        await client.save();
        const token = jwt.sign({ _id: client._id }, JWT_SECRET_KEY);
        res.status(201).json({ client, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find({ businessOwner: req.params.id });
        io.emit('clients', clients);
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getClientsWithUnpaidInvoices = async (req, res) => {
    try {
        const clients = await Client.find().populate({
            path: 'invoices',
            match: { paid: false },
            select: 'amount'
        });
        const clientsWithUnpaidInvoices = clients.filter(client => client.invoices.length > 0);
        io.emit('clientsWithUnpaidInvoices', clientsWithUnpaidInvoices);
        res.json(clientsWithUnpaidInvoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};