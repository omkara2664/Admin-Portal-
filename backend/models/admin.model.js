const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    title: { type: String, require: true, enum: ['Mr', 'Ms', 'Miss'] },
    name: { type: String, require: true },
    key: { type: String, require: true },
    email: {
        type: String, require: true, unique: true,
        validator: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
        message: `Please enter a valid email address`
    },
    password: { type: String, require: true },
    createdAt: { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() },
},
    { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema);