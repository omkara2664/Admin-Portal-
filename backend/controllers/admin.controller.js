const adminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const {
    isValid,
    isValidString,
    isValidObject,
    isValidEmail,
    SALT,
} = require('../utils');

const getAllAdmins = async (req, res) => {
    const response = {
        success: true,
        code: 200,
        message: "Admin List",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    try {
        const admin = await adminModel.find({});
        response.data = { admin };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
};

const createAdmin = async (req, res) => {
    const admin = req.body;
    const response = {
        success: true,
        code: 200,
        message: 'Admin Created Successfully',
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    if (!isValid(admin) && !isValidObject(admin)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid requset data";
        return res.status(400).json(response);
    }
    if (!isValid(admin.title) || (isValid(admin.title) && !isValidString(admin.title))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.title is reqired";
        response.error = "Invalid request data.title is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(admin.name) || (isValid(admin.name) && !isValidString(admin.name))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Name is reqired";
        response.error = "Invalid request data.Name is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(admin.email) || (isValid(admin.email) && !isValidEmail(admin.email))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Email is reqired";
        response.error = "Invalid request data.Email is reqired";
        return res.status(400).json(response);
    }
    if (
        !isValid(admin.password) ||
        (isValid(admin.password) && !isValidString(admin.password))
    ) {
        // console.log("in pass")
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Password is reqired";
        response.error = "Invalid request data. Password is reqired";
        return res.status(400).json(response);
    }
    const arrTitle = ['Mr', 'Ms', 'Miss'];
    try {
        const isTitleExist = arrTitle.indexOf(admin.title.trim());
        if (isTitleExist === -1) {
            response.success = false;
            response.code = 400;
            response.message = `Enter valid title, '${admin.title}' is not valid.`;
            response.error = "Invalid request title";
            return res.status(400).json(response);
        }
    } catch (error) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request title";
        response.error = "Invalid request title";
        return res.status(400).json(response);
    }
    try {
        const isEmailExist = await adminModel.findOne({
            email: admin.email,
        });
        console.log(isEmailExist);
        if (isEmailExist)
            throw new Error(`This email ${admin.email} id is already registered.`)
    } catch (error) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: error.message,
            error: error,
            data: null,
            resourse: req.originalUrl,
        })
    }

    const hashPassword = await bcrypt.hash(admin.password.trim(), SALT);

    const readyAdminData = {
        title: admin.title.trim(),
        name: admin.name.trim(),
        key: admin.key.trim(),
        email: admin.email.trim(),
        password: hashPassword,
    }
    try {
        const newAdmin = new adminModel(readyAdminData);
        await newAdmin.save();
        response.data = { admin: newAdmin };
        return res.status(201).json(response);
    } catch (error) {
        response.error = error;
        response.code = error.code ? error.code : 500;
        response.message = "Failed to create new user. ";
        return res.status(500).json(response);
    }
}

module.exports = {
    getAllAdmins,
    createAdmin,
};