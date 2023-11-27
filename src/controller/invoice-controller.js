// import jwt from 'jsonwebtoken';

import Invoice from '../models/Invoice.js';

export const createInvoice = async (req, res) => {
    try {
        const invoice = new Invoice({ ...req.body, client: req.user._id });
        await invoice.save();
        if (!invoice.paid) {
            io.emit('unpaidInvoice', invoice);
        }
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const unpaidInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ paid: false });
        io.emit('unpaidInvoices', invoices);
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const payInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        if (invoice.paid) return res.status(400).json({ error: 'Invoice already paid' });
        invoice.paid = true;
        await invoice.save();
        io.emit('invoicePaid', invoice);
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUnpaidInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ paid: false }).populate({
            path: 'client',
            match: { businessOwner: req.params.id }
        });
        const filteredInvoices = invoices.filter(invoice => invoice.client);
        io.emit('unpaidInvoices', filteredInvoices);
        res.json(filteredInvoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getClientInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ client: req.params.id });
        io.emit('clientInvoices', invoices);
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

