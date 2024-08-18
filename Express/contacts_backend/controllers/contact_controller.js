const asyncHandler = require('express-async-handler');
const Contact = require("../models/contact_model");

//@desc Get all Contacts
//@router GET /api/contacts
//@access Public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Get single Contact details
//@router GET /api/contacts/:id
//@access Public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    } else {
        res.status(200).json(contact);
    }
});

//@desc Create new Contact
//@router POST /api/contacts
//@access Public

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fileds are mandatory !");
    } else {
        const contact = await Contact.create({ name, email, phone });
        res.status(201).json(contact);
        console.log(`The Request body id: ${req.body}`);
    }
});

//@desc Update Contact details
//@router PUT /api/contacts/:id
//@access Public

const updateContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, phone },
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@router DELETE /api/contacts/:id
//@access Public

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    } else {
        res.status(200).json({ message: `Contact - ${req.params.id} Deleted` });
    }
});


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact, };
