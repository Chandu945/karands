const router = require('express').Router();
const Follow = require('../models/Follow');
const User = require('../models/User')

//ROUTE 1: Creating a new follow request;
router.post("/", async(req,res) => {
    try{
        console.log(req.body);

        const follow = await Follow.create({
            followedBy: req.user,
            followedTo: req.body.to
        });
        
        res.status(201).json({
            status: true,
            message: 'follow request created successfully',
        })
    } catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
});

//ROUTE 2: accepting a follow request;
router.patch("/:_id", async(req,res) => {
    try{
        console.log(req.body);
        const{_id} = req.params

        const follow = await Follow.updateOne({_id}, {
            $set: {isAccepted: true}
        });
        
        res.status(200).json({
            status: true,
            message: 'follow request accepted successfully',
        })
    } catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
});

//Route-3 : getting all follow requests of a user
router.get('/requests', async(req, res)=>{
    try{

        const requests = await Follow.find({followedTo: req.user, isAccepted: false}).populate('followedBy');

        res.status(200).json({
            status: true,
            requests
        })

    }catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
})

//Route-3 : getting all followers
router.get('/followers', async(req, res)=>{
    try{

        const followers = await Follow.find({followedTo: req.user, isAccepted: true}).populate('followedBy');

        res.status(200).json({
            status: true,
            followers
        })

    }catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
})

//Route-3 : getting all followings
router.get('/followings', async(req, res)=>{
    try{

        const followings = await Follow.find({followedBy: req.user, isAccepted: true}).populate('followedTo');

        res.status(200).json({
            status: true,
            followings
        })

    }catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
})



//ROUTE 1: Get suggestions;
router.get("/suggestions", async(req,res) => {
    try{
        console.log(req.body);

        const follow = await Follow.find({followedBy: req.user},{followedTo: 1, _id: 0})

        const filterArr = follow.map((obj)=> obj.followedTo)
        filterArr.push(req.user);

        const users = await User.find({_id: { $nin: filterArr}})        

        res.status(201).json({
            status: true,
            users
        })
    } catch(e) {
        res.status(500).json({
            status: false,
            message:e.message
        })
    }
});


module.exports = router;