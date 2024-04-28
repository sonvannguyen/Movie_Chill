const createError = require("http-errors");
const CommentModel = require("../models/Comment");

const adminController = {
  getAllReportComment: async (req, res, next) => {
    try {
      const commentsReport = await CommentModel.find({})
        .populate({
          path: "userComment",
          select: "username avatar",
        })
        .populate({
          path: "movieId",
          select: "name origin_name thumb_url slug",
        })
        .sort({ totalReport: -1 });

      const response = []

      commentsReport.forEach((item) => {
        if(item.userComment) {
          response.push({
            commentId: item._id,
            userId: item.userComment._id,
            username: item.userComment.username,
            avatar: item.userComment.avatar,
            movie_name: item.movieId.name,
            thumbnail_url: item.movieId.thumb_url,
            totalReport: item.totalReport,
            updatedAt: item.updatedAt,
            commentContent: item.commentContent,
            movie_slug: item.movieId.slug,
          })
        }
      });

      return res.json(response);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
};

module.exports = adminController;
