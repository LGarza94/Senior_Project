import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getMealPrepPosts, getWorkOutPosts, getUserPosts, getFollowingPosts, getLikedPosts, getAllPosts, likeunlikePost, commentOnPost ,deletePost, createPost, getCategoryPostsByUser } from '../controllers/post.controller.js';

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
//TODO: router.getMealPlanPosts && getWorkoutPosts
router.get("/mealprep", protectRoute, getMealPrepPosts);
router.get("/workout", protectRoute, getWorkOutPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.get("/category/:category/user/:username", protectRoute, getCategoryPostsByUser)
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeunlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;