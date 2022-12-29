const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: { type: String, require: true, enum: ['Mr', 'Ms', 'Miss'] },
    name: { type: String, require: true },
    adminId: { type: mongoose.SchemaTypes.ObjectId, ref: "Admin", default: null },
    email: {
        type: String, require: true, unique: true,
        validator: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
        message: `Please enter a valid emil address`
    },
    password: { type: String, require: true },
    createdAt: { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() },
    isActivated: { type: Boolean, default: true },
    activatedAt: { type: Date, default: null },
    isDeActiveAt: { type: Date, default: null },
},
    { timestamps: true },
)

module.exports = mongoose.model('User', userSchema);
