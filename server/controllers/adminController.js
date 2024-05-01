const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CommentModel = require("../models/Comment");
const UserModel = require("../models/User")

const adminController = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user || !user.isAdmin) {
        return res.json("Username or password is incorrect");
      }
      const isPasswordHashed = await bcrypt.compare(password, user.password);

      if (isPasswordHashed) {
        const accessToken = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        return res.status(200).json({ user, accessToken });
      } else {
        return res.json("Username or password is incorrect");
      }
    } catch (error) {
      next(createError(500, error.message));
    }
  },
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
