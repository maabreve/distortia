// server/models/Songs.js
/*
 |--------------------------------------
 | Songs Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  style: { type: String, required: true },
  iplay: { type: Boolean, required: false },
  wannaplay: { type: Boolean, required: true }
});

module.exports = mongoose.model('Songs', songsSchema);
