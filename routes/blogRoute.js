const express = require("express");
const router = express.Router();

const blogController = require("./../controller/blogController");
const { authenticate } = require("../middeware/authMiddeware");


router.post("/addBlogs" ,authenticate,blogController.addBlogs);
router.get("/getallBlog" ,authenticate,blogController.getallBlog);
router.get("/:id/getBlogById" ,authenticate,blogController.getBlogById);
router.delete("/:id/deleteBlogById" ,authenticate,blogController.deleteBlogById);
router.put("/:id/updateBlogById" ,authenticate,blogController.updateBlogById);


module.exports = router;