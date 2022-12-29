const mongoose = require("mongoose");

const userFavoriteSchema = new mongoose.Schema({
    movieIds: { type: Array, require: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: null },
},
    { timestamps: true },
)

module.exports = mongoose.model("UserFavorite", userFavoriteSchema);

