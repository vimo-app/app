const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const albumSchema = new Schema({
  name: String,
  pictureID: [{ type : Schema.Types.ObjectId, ref: 'Picture' }]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;