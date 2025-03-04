import Contact from "../models/contacts.js";
import {HttpError} from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async(req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, ...query} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find(
        {owner, ...query},
        "-createdAt -updatedAt",
        {
            skip,
            limit
        },
    ).populate("owner", "email subscription");
    res.json(result);
};

const getBiId = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    } 
    res.json(result);
};

const add = async(req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
};

const updateBiId = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
};

const updateStatusContact = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
};

const deleteBiId = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404. `Contact with id=${id} not found`);
    }
    res.status(200).json({message: "Contact deleted"});
};

export default {
    getAll: ctrlWrapper(getAll),
    getBiId: ctrlWrapper(getBiId),
    add: ctrlWrapper(add),
    updateBiId: ctrlWrapper(updateBiId),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteBiId: ctrlWrapper(deleteBiId),
};