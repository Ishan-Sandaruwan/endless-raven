import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const addReview = async (req, res, next) => {
  try {
    const { name, mail, stars, content, img, project } = req.body;
    if (
      !name ||
      name === "" ||
      !mail ||
      mail === "" ||
      !stars ||
      stars === "" ||
      !content ||
      content === "" ||
      !project ||
      project === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const newReview = new Review({
      name,
      mail,
      stars,
      content,
      project,
      img,
    });
    await newReview.save();
    res.json({ message: "new review added" });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({}).sort({ updatedAt: -1 });
    // console.log(reviews);
    return res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

export const updateReviews = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      {
        $set: {
          name: req.body.name,
          mail: req.body.mail,
          stars: req.body.stars,
          content: req.body.content,
          project: req.body.project,
          img: req.body.img,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

export const deleteReviews = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};
