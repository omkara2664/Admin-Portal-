const userModel = require("../models/user.model");
const favoriteModel = require("../models/user.favorite.model");
const bcrypt = require("bcrypt");
const {
    isValid,
    isValidString,
    isValidObject,
    isValidEmail,
    SALT,
} = require("../utils");

const getAllUsers = async (req, res) => {
    // console.log('yes request rich here');
    const response = {
        success: true,
        code: 200,
        message: "User list",
        error: null,
        data: null,
        resource: req.originalUrl,
    };
    try {
        const users = await userModel.find({
            // isActivated: true,
            // adminId: res.locals.adminId
        });
        // console.log(users);

        if (users.length === 0) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Admin doesn't Created any user till now.",
                data: null,
                error: null,
                resource: req.originalUrl,
            });
        }
        response.data = { users };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
};

const getAllDeactiveUsers = async (req, res) => {
    // console.log('yes request rich here');
    const response = {
        success: true,
        code: 200,
        message: "User list",
        error: null,
        data: null,
        resource: req.originalUrl,
    };
    try {
        const users = await userModel.find({
            isActivated: false,
            adminId: res.locals.adminId
        });
        // console.log(users);

        if (users.length === 0) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Admin doesn't Created any user till now.",
                data: null,
                error: null,
                resource: req.originalUrl,
            });
        }
        response.data = { users };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const response = {
        success: true,
        code: 200,
        message: "user list",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    try {
        const user = await userModel.findOne({ _id: userId });
        if (!user) throw new Error("User does not exist");
        if (user.adminId.toString() !== res.locals.adminId) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Unauthorized access, Admin not owner",
                data: null,
                error: null,
                resource: req.originalUrl,
            })
        }
        response.data = { user };
        return res.status(200).json(response);
    } catch (error) {
        response.error = error;
        response.message = error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
}

const createUser = async (req, res) => {
    const user = req.body;
    const response = {
        success: true,
        code: 200,
        message: "User Created Successfully",
        error: null,
        data: null,
        resourse: req.originalUrl,
    };
    if (!isValid(user) && !isValidObject(user)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid requset data";
        return res.status(400).json(response);
    }
    if (!isValid(user.title) || (isValid(user.title) && !isValidString(user.title))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.title is reqired";
        response.error = "Invalid request data.title is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(user.name) || (isValid(user.name) && !isValidString(user.name))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Name is reqired";
        response.error = "Invalid request data.Name is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(user.email) || (isValid(user.email) && !isValidEmail(user.email))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Email is reqired";
        response.error = "Invalid request data.Email is reqired";
        return res.status(400).json(response);
    }
    if (
        !isValid(user.password) ||
        (isValid(user.password) && !isValidString(user.password))
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
        const isTitleExist = arrTitle.indexOf(user.title);
        if (isTitleExist === -1) {
            response.success = false;
            response.code = 400;
            response.message = `Enter valid title, '${user.title}' is not valid.`;
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
        const isEmailExist = await userModel.findOne({
            email: user.email,
        });
        // console.log(isEmailExist);
        if (isEmailExist)
            throw new Error(`This email ${user.email} id is already registered.`)
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
    const hashPassword = await bcrypt.hash(user.password.trim(), SALT);
    const cleanedUserData = {
        // adminId: res.locals.adminId,
        title: user.title.trim(),
        name: user.name.trim(),
        email: user.email.trim(),
        password: hashPassword,
    }
    try {
        const newUser = new userModel(cleanedUserData);
        await newUser.save();
        response.data = { user: newUser };
        return res.status(201).json(response);
    } catch (error) {
        response.error = error;
        response.code = error.code ? error.code : 500;
        response.message = "Failed to create new user. ";
        return res.status(500).json(response);
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    if (!userData || (isValid(userData) && !isValidObject(userData))) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Empty request body, nothing to update.",
            error: null,
            data: null,
            resource: req.originalUrl,
        });
    }
    if (!isValid(userData.title) || isValid(userData.title) && !isValidString(userData.title)) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Empty user title, not allowed.",
            error: null,
            data: null,
            resource: req.originalUrl,
        });
    }

    if (!isValid(userData.name) || (isValid(userData.name) && !isValidString(userData.name))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Name is reqired";
        response.error = "Invalid request data.Name is reqired";
        return res.status(400).json(response);
    }
    if (!isValid(userData.email) || (isValid(userData.email) && !isValidEmail(userData.email))) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data.Email is reqired";
        response.error = "Invalid request data.Email is reqired";
        return res.status(400).json(response);
    }
    try {
        const isUserExist = await userModel.findOne({
            _id: userId, isActivated: false
        })
        if (!isUserExist)
            return res.status(400).json({
                success: false,
                code: 404,
                message: "Invalid request user item not exist.",
                error: null,
                data: null,
                resource: req.originalUrl,
            });
        if (isUserExist.adminId.toString() !== res.locals.adminId) {
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Unauthorized access, Admin not owner",
                data: null,
                error: null,
                resource: req.originalUrl,
            })
        }
        const updateUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        )
        await updateUser.save();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Blog updated successfully",
            error: null,
            data: { user: updateUser },
            resource: req.originalUrl,
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: error.message,
            error: error,
            data: null,
            resource: req.originalUrl,
        });
    }

}

const isDeActiveUser = async (req, res) => {
    const userId = req.params;
    // console.log(userId);
    // console.log("Om in deact");

    try {
        const isUserExist = await userModel.findOne({
            _id: userId.id, isActivated: true
        });
        if (!isUserExist) throw new Error("Invalid User id. User does not exist with this id.");
        // if (isUserExist.adminId.toString() !== res.locals.adminId) {
        //     return res.status(403).json({
        //         success: false,
        //         code: 403,
        //         message: "Unauthorize access, Admin not owner",
        //         data: null,
        //         error: null,
        //         resource: req.originalUrl,
        //     });
        // }
        isUserExist.isActivated = false,
            isUserExist.isDeActiveAt = new Date().toISOString();
        await isUserExist.save();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "User Deactivated successfully",
            error: null,
            data: { user: isUserExist },
            resource: req.originalUrl,
        });

    } catch (error) {
        return res.status(400);
        console.log(error);
    }
}

const isActiveUser = async (req, res) => {
    const userId = req.params;
    // const data = req.body
    // if (!data || (isValid(data) && !isValidObject(data))) {
    //     return res.status(400).json({
    //         success: false,
    //         code: 400,
    //         message: "Empty request body, nothing to update.",
    //         error: null,
    //         data: null,
    //         resource: req.originalUrl,
    //     });
    // }

    try {
        const isUserExist = await userModel.findOne({
            _id: userId.id, isActivated: false
        });
        if (!isUserExist) throw new Error("Invalid User id. User does not exist with this id or may be user is active");
        // if (isUserExist.adminId.toString() !== res.locals.adminId) {
        //     return res.status(403).json({
        //         success: false,
        //         code: 403,
        //         message: "Unauthorize access, Admin not owner",
        //         data: null,
        //         error: null,
        //         resource: req.originalUrl,
        //     });
        // }

        isUserExist.isActivated = true,
            isUserExist.activatedAt = new Date().toISOString();
        await isUserExist.save();
        return res.status(200).json({
            success: true,
            code: 200,
            message: "User Activated successfully",
            error: null,
            data: { user: isUserExist },
            resource: req.originalUrl,
        });

    } catch (error) {

    }
}

const userFavorite = async (req, res) => {
    const data = req.body;
    // console.log(data);
    const authorizationHeader = req.headers["authorization"];
    const [bearer, token] = authorizationHeader.split(" ");
    // console.log(token, "this is token");
    // console.log(data);
    // return res.status(200).json("okay");
    const response = {
        success: true,
        code: 200,
        message: "Added in favorite",
        error: null,
        data: null,
        resource: req.originalUrl,
    }
    if (!isValid(data) && !isValidObject(data)) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid requset data";
        return res.status(400).json(response);
    }
    try {
        const isUserFavExist = await favoriteModel.findOne({
            userId: res.locals.userId,
        })
        // console.log(isUserFavExist._id);
        if (!isUserFavExist) {
            const favUserData = {
                movieIds: data,
                userId: res.locals.userId,
            }
            try {
                const newUserFavorite = new favoriteModel(favUserData);
                await newUserFavorite.save();
                response.data = { user: newUserFavorite };
                return res.status(201).json(response);
            } catch (error) {
                response.error = error;
                response.code = error.code ? error.code : 500;
                response.message = "Failed to create new user Favorite. ";
                return res.status(500).json(response);
            }
        } else {
            try {
                favId = isUserFavExist._id;
                const updateFavUser = await favoriteModel.findByIdAndUpdate(
                    favId, { $set: { movieIds: data } },
                    { new: true }
                )
                await updateFavUser.save();
                response.data = updateFavUser;
                response.message = "Favorite list updated successfully";
                return res.status(201).json(response);
            } catch (error) {
                response.error = error;
                response.code = error.code ? error.code : 500;
                response.message = "Failed to update user Favorite. ";
                response.success = false;
                return res.status(500).json(response);
            }
        }

    } catch (error) {
        response.error = error;
        response.code = error.code ? error.code : 500;
        response.message = "Failed Favorite. ";
        response.success = false;
        return res.status(500).json(response);
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    isDeActiveUser,
    isActiveUser,
    getAllDeactiveUsers,
    userFavorite,
};