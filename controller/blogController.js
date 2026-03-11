const Blog = require("../models/blogModel");
const { sendResponse } = require("../utils/sendResponse");

exports.addBlogs = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    // blog create
    const createBlog = await Blog.create({
      title,
      content,
      tags,
      author: req.user._id,
    });
    return res
      .status(201)
      .send(sendResponse(createBlog, false, "Blog Created Successfully"));
  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server error : ${err.message}`));
  }
};

exports.getallBlog = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";

  try {
    // title search
    const query = { title: { $regex: search, $options: "i" } };
    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .skip(skip)
      .limit(limit);

    //   total blog count
    const totalBlogs = await Blog.countDocuments();
    return res
      .status(201)
      .send(
        sendResponse(
          { totalBlogs, page, limit, blogs },
          false,
          "Blog Fetched Successfully",
        ),
      );
  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server error : ${err.message}`));
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    // list by id
    const blog_list = await Blog.findById(id).populate("author", "name email");
    if (!blog_list) {
      return res.status(404).send(sendResponse(null, true, "Blog not found"));
    }
    return res
      .status(200)
      .send(sendResponse(blog_list, false, "Blog fetched sucessfully"));
  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server error : ${err.message}`));
  }
};

exports.deleteBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    // list by id
    const blog_list = await Blog.findById(id).populate("author", "name email");

    // check exist or not blog
    if (!blog_list) {
      return res.status(404).send(sendResponse(null, true, "Blog not found"));
    }

    if (blog_list.author._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .send(sendResponse(null, true, "Unauthorize for access this"));
    }
    const delete_blog = await Blog.findOneAndDelete(id);
    return res
      .status(200)
      .send(sendResponse(null, false, "Blog deleted sucessfully"));
  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server error : ${err.message}`));
  }
};

exports.updateBlogById = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;


  try {
    // find list
    const blog_list = await Blog.findById(id);
    // check exist or not blog

    if (!blog_list) {
      return res.status(404).send(sendResponse(null, true, "Blog not found"));
    }

    if (blog_list.author._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .send(sendResponse(null, true, "Unauthorized to update "));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        tags
      },
      { new: true } 
    );

    return res
      .status(200)
      .send(sendResponse(updatedBlog, false, "Blog updated sucessfully"));

  } catch (err) {
    return res
      .status(500)
      .send(sendResponse(null, true, `Server error: ${err.message}`));
  }
};
