const createError = require("http-errors");
const CommentModel = require("../models/Comment");

const adminController = {
  getAllReportComment: async (req, res, next) => {
    try {
      const commentsReport = await CommentModel.find({
        totalReport: { $gt: 0 },
      })
        .populate({
          path: "userComment",
          select: "username avatar",
        })
        .populate({
          path: "movieId",
          select: "name origin_name thumb_url",
        })
        .sort({ totalReport: -1 });

        const response = commentsReport.map((item) => {
            return {
                commentId: item._id,
                userId: item.userComment._id,
                username: item.userComment.username,
                avatar: item.userComment.avatar,
                movie_name: item.movieId.name,
                thumbnail_url: item.movieId.thumb_url,
                totalReport: item.totalReport,
                updatedAt: item.updatedAt,
                commentContent: item.commentContent
            }
        })

      return res.json(response);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
};

module.exports = adminController;
