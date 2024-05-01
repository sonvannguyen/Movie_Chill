const MovieModel = require("../models/Movie");
const UserModel = require("../models/User");
const SystemStatsModel = require("../models/SystemStats");

const systemController = {
  updateSystemStats: async (field, quantityChange) => {
    const currentDate = getCurrentDate();
    const currentStats = await SystemStatsModel.findOne({
      stats_time: currentDate,
    });

    let newCurrentStats;

    if (!currentStats) {
      const totalUser = await UserModel.countDocuments({});
      const totalMovie = await MovieModel.countDocuments({});
      newCurrentStats = new SystemStatsModel({
        stats_time: currentDate,
        total_user: totalUser,
        total_movie: totalMovie,
      });
      await newCurrentStats.save();

    }

    const currentStatsId = currentStats?._id ?? newCurrentStats?._id;

    if (field === "totalUser" && currentStats) {
      await SystemStatsModel.findByIdAndUpdate(currentStatsId, {
        $inc: { total_user: quantityChange },
      });
    }

    if (field === "totalMovie" && currentStats) {
      await SystemStatsModel.findByIdAndUpdate(currentStatsId, {
        $inc: { total_movie: quantityChange },
      });
    }

    if (field == "totalView") {
      await SystemStatsModel.findByIdAndUpdate(currentStatsId, {
        $inc: { total_view: quantityChange },
      });
    }

    if (field == "totalComment") {
      await SystemStatsModel.findByIdAndUpdate(currentStatsId, {
        $inc: { total_comment: quantityChange },
      });
    }
  },

  getSystemStats: async (req, res, next) => {
    try {
      await systemController.updateSystemStats();
      const systemStats = await SystemStatsModel.find({}).sort({ stats_time: 1 });
      return res.status(200).json(systemStats);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
};

function getCurrentDate() {
  const currentDate = new Date();

  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Đảm bảo rằng tháng và ngày có đủ 2 chữ số
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}

module.exports = systemController;
