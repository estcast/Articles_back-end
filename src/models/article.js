"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  content: String,
  author: String,
},{collection: 'articles'});

module.exports = mongoose.model("Article", ArticleSchema);
