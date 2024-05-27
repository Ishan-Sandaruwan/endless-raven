import mongoose from "mongoose";

const memberShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
      default: "https://materi-pkkmb.um.ac.id/layout/img/logo-user.png",
    },
    designation: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberShema);

export default Member;
