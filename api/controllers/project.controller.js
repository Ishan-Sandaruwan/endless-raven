import Project from "../models/project.model.js";
import { errorHandler } from "../utils/error.js";

export const getProjects = async (req, res, next) => {
  try {
    const type = req.query.type;

    if (
      !type ||
      type === "" ||
      (type !== "web" && type !== "mobile" && type !== "pos" && type !== "all")
    ) {
      return next(errorHandler(400, "type field error"));
    }
    let data = [];
    if (type !== "all") {
      data = await Project.find({ type: type });
    } else {
      data = await Project.find();
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "No projects found." });
    }
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const addProjects = async (req, res, next) => {
  try {
    const { name, type, description, photoUrl, link } = req.body;
    if (
      !name ||
      name === "" ||
      !type ||
      type === "" ||
      !description ||
      description === "" ||
      !photoUrl ||
      photoUrl === "" ||
      !link ||
      link === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    if (type !== "web" && type !== "mobile" && type !== "pos") {
      return next(errorHandler(400, "type field error"));
    }
    const newProject = new Project({
      name,
      type,
      description,
      photoUrl,
      link,
    });
    await newProject.save();
    res.json({ message: "new project saved" });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $set: {
          name: req.body.name,
          type: req.body.type,
          description: req.body.description,
          photoUrl: req.body.photoUrl,
          link: req.body.link,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};

// export const getposts = async (req, res, next) => {
//     try {
//       const startIndex = parseInt(req.query.startIndex) || 0;
//       const limit = parseInt(req.query.limit) || 9;
//       const sortDirection = req.query.order === 'asc' ? 1 : -1;
//       const posts = await Post.find({
//         ...(req.query.userId && { userId: req.query.userId }),
//         ...(req.query.category && { category: req.query.category }),
//         ...(req.query.slug && { slug: req.query.slug }),
//         ...(req.query.postId && { _id: req.query.postId }),
//         ...(req.query.searchTerm && {
//           $or: [
//             { title: { $regex: req.query.searchTerm, $options: 'i' } },
//             { content: { $regex: req.query.searchTerm, $options: 'i' } },
//           ],
//         }),
//       })
//         .sort({ updatedAt: sortDirection })
//         .skip(startIndex)
//         .limit(limit);

//       const totalPosts = await Post.countDocuments();

//       const now = new Date();

//       const oneMonthAgo = new Date(
//         now.getFullYear(),
//         now.getMonth() - 1,
//         now.getDate()
//       );

//       const lastMonthPosts = await Post.countDocuments({
//         createdAt: { $gte: oneMonthAgo },
//       });

//       res.status(200).json({
//         posts,
//         totalPosts,
//         lastMonthPosts,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
