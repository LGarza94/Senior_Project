import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {v2 as cloudinary} from 'cloudinary';


export const createPost = async (req, res) => {
    try{
        const {text} = req.body;
        let {img} = req.body;
        let {video} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"})

        if(!text && !img){
            return res.status(400).json({error: "Post must have text or image"});
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        if(video){
            const uploadedResponse = await cloudinary.uploader.upload(video);
            video = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user:userId,
            text,
            img,
            video,
        })

        await newPost.save();
        res.status(201).json(newPost);
    }catch(error){
        res.status(500).json({error: "Internal server error"});
        console.log("Error in createPost controller: ", error);
    }
}

/*export const likeunlikePost = async (req, res) => {
    try{

    }catch(error){

    }
}*/

export const commentOnPost = async (req, res) => {
    try{
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            return res.status(400).json({error: "Text field is required"});
        }

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        const comment = {user: userId, text};

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);
    }catch(error){
        console.log("Error in commentOnPost controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export const deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error: "Your are not authorized to delete this post"})
        }

        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        if(post.vid){
            const vidId = post.vid.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(vidId);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({message: "Post deleted succesfully"});
    }catch(error){
        console.log("Error in deletePost controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
};