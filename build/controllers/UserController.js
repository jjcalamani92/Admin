"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const getUser = (req, res) => {
    res.json('getUser- controlador');
};
exports.getUser = getUser;
const getUsers = (req, res) => {
    res.json('getUsers- controlador');
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    res.json('createUser- controlador');
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    res.json('updateUser- controlador');
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    res.json('deleteUser- controlador');
};
exports.deleteUser = deleteUser;
