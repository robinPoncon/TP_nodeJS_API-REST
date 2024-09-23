const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const catchAsync = require("../helpers/catchAsync");
const { StatusCodes } = require("http-status-codes");

const create = catchAsync(async (req, res) => {
	const contact = await Contact.create(req.body);
	res.send(contact);
});

const getAll = catchAsync(async (req, res) => {
	const contacts = await Contact.find();
	res.send(contacts);
});

const getById = catchAsync(async (req, res) => {
	const { id } = req.params;
	try {
		new mongoose.Types.ObjectId(id);
	} catch (err) {
		res.status(StatusCodes.BAD_REQUEST).send("Format de l'ID invalide");
		return;
	}

	const contact = await Contact.findById(id);
	if (contact) {
		res.send(contact);
	} else {
		res.status(StatusCodes.NOT_FOUND).send("Contact introuvable");
	}
});

const updateById = catchAsync(async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (contact) {
		res.send(contact);
	} else {
		res.status(StatusCodes.NOT_FOUND).send("Contact introuvable");
	}
});

const deleteById = catchAsync(async (req, res) => {
	const contact = await Contact.findByIdAndDelete(req.params.id);
	if (contact) {
		res.send(contact);
	} else {
		res.status(StatusCodes.NOT_FOUND).send("Contact introuvable");
	}
});

module.exports = {
	create,
	getAll,
	getById,
	updateById,
	deleteById
};
