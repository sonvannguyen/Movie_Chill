const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SystemStasSchema = new Schema(
  {
    stats_time: {
      type: String,
      required: true,
    },
    total_view: {
      type: Number,
      required: true,
      default: 0,
    },
    total_user: {
      type: Number,
      required: true,
      default: 0,
    },
    total_movie: {
      type: Number,
      required: true,
      default: 0,
    },
    total_comment: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const SystemStatsModel = mongoose.model("SystemStats", SystemStasSchema);

module.exports = SystemStatsModel;
