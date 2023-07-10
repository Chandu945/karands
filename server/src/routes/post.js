const router = require('express').Router();
const Post = require('../models/Post');
const {upload, resizeImage} = require('../middlewares/uploadImages');

//ROUTE 1: Creating a new proposal;(only for vendor and login required)
router.post("/", upload.array('image'), async(req,res) => {
    try{
        console.log(req.body);
        const result = await resizeImage(req.files[0].path)

        const post = await Post.create({
            ...req.body,
            postedBy:req.user,
            image: result.url,
            likes: []
        });
        
        res.status(201).json({
            status: true,
            message: 'post created successfully',
        })
    } catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
});

//Route 2 : get all the posts of a particular user
router.get('/',async(req, res)=>{
    const {page=1, size=20} = req.query;
    try {
        let posts = await Post.find({postedBy: req.user}).populate('postedBy').skip((page - 1)*size).limit(size).sort({createdAt: -1});
        
        return res.status(200).json({
            status: true,
            posts
        })
    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }

})

//Route 3 : Getting all the posts
router.get('/all', async(req, res)=>{
    //to add serach bar in page 14
    const {page=1, size=20} = req.query;
    try {
        let posts = await Post.find().populate('postedBy').skip((page - 1)*size).limit(size).sort({createdAt: -1});
        
        return res.status(200).json({
            status: true,
            posts
        })
    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }
} )

//Route 4 ; to delete a proposal (only vendor can access)
router.delete('/:_id' ,async(req, res)=>{
    const {_id} = req.params;
    try{
        const post = await Post.findOne({_id});
        if(post.postedBy.toString() !== req.user){
            return res.status(401).json({
                status:'failure',
                message: "you can't delete others proposals"
            })
        }
        const resp = await Post.deleteOne({_id});
        return res.status(200).json({
            status: true,
            message: 'post deleted successfully',
            resp
        })
    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }
})

//Route-5 : To like a post
router.get('/:_id/like/', async (req, res)=>{
    const {_id} = req.params;
    const {add} = req.query;
    try{
        let post 
        if(add == 'true'){
            console.log('here')
            post = await Post.updateOne({_id}, {
                $addToSet: {likes: req.user}
            })
        }else{
            post = await Post.updateOne({_id}, {
                $pull: {likes: req.user}
            })
        }
        post = await Post.findOne({_id});
        res.status(200).json({
            status: true,
            likes: post.likes
        })

    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }
})

//Route: 6: to get all posts that user liked
router.get('/likes', async(req, res)=>{
    try{
        const posts = await Post.find({likes: req.user});
        res.status(200).json({
            status: true,
            posts
        })
    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }
})

module.exports = router;