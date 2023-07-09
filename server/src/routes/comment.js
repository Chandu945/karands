const router = require('express').Router();
const Comment = require('../models/Comment');

//ROUTE 1: Creating a new comment;
router.post("/", async(req,res) => {
    try{
        console.log(req.body);

        const comment = await Comment.create({
            post: req.body.post,
            title: req.body.title,
            commentedBy:req.user
        });
        
        res.status(201).json({
            status: true,
            message: 'commented successfully',
        })
    } catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
});

//Route 2 : get all the comments of a particular user
router.get('/',async(req, res)=>{
    try {
        let comments = await Comment.find({commentedBy: req.user}).populate('post').sort({createdAt: -1});
        
        return res.status(200).json({
            status: true,
            comments
        })
    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }

})

//Route 3 : Getting all comments of post
router.get('/:id', async(req, res)=>{
    //to add serach bar in page 14
    const {id} = req.params
    try {
        let comments = await Comment.find({post: id}).limit(10).sort({createdAt: -1}).populate('commentedBy');
        
        return res.status(200).json({
            status: true,
            comments
        })
    } catch(e) {
        return res.status(500).json({
            status: false,
            message:e.message
        })
    }
} )


module.exports = router;