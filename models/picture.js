const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pictureSchema = new Schema({
  imgName: String,
  imgPath: String,
  albumID: { type : Schema.Types.ObjectId, ref: 'Album' }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model("Picture", pictureSchema);