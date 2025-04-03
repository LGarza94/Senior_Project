import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserPosts, getFollowingPosts, getLikedPosts, getAllPosts, likeunlikePost, commentOnPost ,deletePost, createPost } from '../controllers/post.controllers.js';

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
//TODO: router.get("/following", protectRoute, getFollowingPosts); getMealPlanPosts && getWorkoutPosts
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeunlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;