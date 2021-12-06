'use strict';

module.exports = (mongoose) =>
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      // title: String,
      // body: String,
      // buttonText: String,
      // buttonUrl: String,
      // url: String,
      // imageClassic: { type: String, required: true }, // 840 x 395
      // imageFull: { type: String, required: true }, // 1110 x 440
      // imageMobile: { type: String, required: true }, // 395 x 395
      // imageFlutterApp: { type: String, required: true }, // 900 x 500
      // status: { type: String, required: true, default: 'active' },
    },
    { timestamps: true }
  );
