const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");
const MovieModel = require("../models/Movie");
const systemController = require("./systemController");

const userController = {
  register: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!(username && password)) {
        return res.json("All input is required");
      }

      const oldUsername = await UserModel.findOne({ username });
      if (oldUsername) {
        return res.json("Username already exists.");
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        username,
        password: passwordHashed,
      });

      await newUser.save();
      await systemController.updateSystemStats("totalUser", 1);
      return res.status(200).json("Register success");
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
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
  getAllUser: async (req, res, next) => {
    try {
      const listUser = await UserModel.find({
        isAdmin: false,
      }).select("-password");
      const listUserResponse = listUser.map((user) => ({
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        total_movie_bookmark: user.moviesBookmarks.length,
        total_movie_watched: user.moviesWatched.length,
        updatedAt: user.updatedAt,
      }));
      return res.status(200).json(listUserResponse);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await UserModel.findByIdAndDelete(userId);
      await systemController.updateSystemStats("totalUser", -1);
      return res.json({ message: "User deleted" });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      console.log(req.params);
      const user = await UserModel.findById(userId).select("-password");
      if (user) {
        console.log(user);
        return res.status(200).json({ user });
      }
      throw createError(404, `Not found user with id ${userId}`);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  updateUserInfo: async (req, res, next) => {
    try {
      const { userId, username, avatar } = req.body;
      await UserModel.findByIdAndUpdate(userId, {
        username: username,
        avatar: avatar,
      });
      return res.status(200).json({ message: "success" });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  addMovieToListMoviesWatched: async (req, res, next) => {
    try {
      const { userId, movieId } = req.body;
      await systemController.updateSystemStats("totalView", 1);
      await MovieModel.findByIdAndUpdate(movieId, {
        $inc: { total_view: 1 },
      });

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json("Not found user !");
      }

      if (user.moviesWatched.includes(movieId)) {
        return;
      }

      user.moviesWatched.push(movieId);
      await user.save();

      return res.status(200).json(user.moviesWatched);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  getMoviesFromListMoviesWatched: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const moviesData = await UserModel.findById(userId).populate({
        path: "moviesWatched",
      });

      return res.status(200).json(moviesData.moviesWatched.reverse());
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  deleteMovieFromMoviesWatched: async (req, res, next) => {
    try {
      const { userId, movieId } = req.params;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json("Not found user");
      }

      user.moviesWatched = user.moviesWatched.filter(
        (movie) => movie != movieId
      );
      await user.save();

      return res.status(200).json(user.moviesWatched);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  deleteAllMovieFromMoviesWatched: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json("Not found user");
      }

      user.moviesWatched = [];
      await user.save();

      return res.status(200).json(user.moviesWatched);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  addMovieToListMoviesBookmark: async (req, res, next) => {
    try {
      const { userId, movieId } = req.body;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json("Not found user !");
      }

      if (user.moviesBookmarks.includes(movieId)) {
        return res.status(409).json("Movie already exist !");
      }

      user.moviesBookmarks.push(movieId);
      await user.save();

      return res.status(200).json(user.moviesBookmarks);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  getMoviesFromListMoviesBookmark: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const moviesData = await UserModel.findById(userId).populate({
        path: "moviesBookmarks",
      });

      return res.status(200).json(moviesData.moviesBookmarks.reverse());
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  deleteMovieFromMoviesBookmark: async (req, res, next) => {
    try {
      const { userId, movieId } = req.params;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(400).json("Not found user");
      }

      user.moviesBookmarks = user.moviesBookmarks.filter(
        (movie) => movie != movieId
      );
      await user.save();

      return res.status(200).json(user.moviesBookmarks);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  deleteAllMovieFromMoviesBookmark: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json("Not found user");
      }

      user.moviesBookmarks = [];
      await user.save();

      return res.status(200).json(user.moviesBookmarks);
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  createCommentMovie: async (req, res, next) => {
    try {
      const { userId, movieId, content } = req.body;
      const newComment = new CommentModel({
        userComment: userId,
        movieId: movieId,
        commentContent: content,
      });
      await newComment.save();
      await systemController.updateSystemStats("totalComment", 1);
      return res.json({ newComment });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  deleteCommentMovie: async (req, res, next) => {
    try {
      const { commentId } = req.params;

      await CommentModel.findByIdAndDelete(commentId);
      await systemController.updateSystemStats("totalComment", -1);
      return res.json({ message: "Comment deleted" });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  updateCommentMovie: async (req, res, next) => {
    try {
      const userId = req.userId;
      const { commentId, content } = req.body;

      await CommentModel.updateOne(
        { _id: commentId, userComment: userId },
        { commentContent: content }
      );
      return res.json({ message: "Update comment success" });
    } catch (error) {
      next(error);
    }
  },
  reportCommentMovie: async (req, res, next) => {
    try {
      const comment = await CommentModel.findById(req.body.commentId);
      if (!comment) {
        return res.json({ message: "Comment not found" });
      }

      if (comment.usersReport.includes(req.body.userReport)) {
        return res.json({ message: "Report comment success" });
      }

      await CommentModel.findByIdAndUpdate(
        req.body.commentId,
        {
          $inc: { totalReport: 1 },
          $push: { usersReport: req.body.userReport },
        },
        { new: true } // Return the updated document
      );

      return res.json({ message: "Report comment success" });
    } catch (error) {
      next(error);
    }
  },
  followMovie: async (req, res, next) => {
    try {
      const { userId, movieId } = req.body;
      const movie = await MovieModel.findById(movieId);

      if (!movie) {
        return res.status(404).json("Not found movie !");
      }

      if (movie.users_follow.includes(userId)) {
        return res.status(200).json("Follow movie success !");
      }

      movie.users_follow.push(userId);
      await movie.save();

      return res.status(200).json("Follow movie success !");
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  unfollowMovie: async (req, res, next) => {
    try {
      const { userId, movieId } = req.body;
      const movie = await MovieModel.findById(movieId);

      if (!movie) {
        return res.status(404).json("Not found movie !");
      }

      if (!movie.users_follow.includes(userId)) {
        return res.status(200).json("Unfollow movie success !");
      }

      movie.users_follow = movie.users_follow.filter(
        (userIdFollow) => userIdFollow != userId
      );
      await movie.save();

      return res.status(200).json("Unfollow movie success !");
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  getAllReportComment: async (req, res, next) => {
    try {
      const commentsReport = await CommentModel.find({
        totalReport: { $gt: 1 },
      })
        .populate({
          path: "userComment",
          select: "username avatar",
        })
        .populate({
          path: "movieId",
          select: "name origin_name",
        })
        .sort({ totalReport: -1 });

      return res.json({ commentsReport });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
};

module.exports = userController;
