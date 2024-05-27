import mongoose from "mongoose";

const reviewShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    content: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "https://materi-pkkmb.um.ac.id/layout/img/logo-user.png",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewShema);

export default Review;
