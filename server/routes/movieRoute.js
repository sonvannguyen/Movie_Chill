const router = require("express").Router();
const movieController = require("../controllers/movieController");
const adminAuth = require("../auth/adminAuth");

router.get("/", movieController.getAllMovie);
router.get("/search", movieController.searchMovieByName);
router.get("/filter", movieController.filterMoviesByMultiField);

router.post("/create", adminAuth, movieController.createMovie);
router.get("/detail/:slug", movieController.getMovieDetail);
router.put("/update/:movieId", adminAuth, movieController.updateMovie);
router.delete("/delete/:movieId", adminAuth, movieController.deleteMovie);

// router.post('admin/add/all', auth, movieController.addMoviesFromFileData)
// router.post('admin/create/all/comment', auth, movieController.createCommentForAllMovie)

module.exports = router;
