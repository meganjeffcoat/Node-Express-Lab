const express = require('express');

const Posts = require('../data/db')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error retrieving the posts'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message:"The post with the specified ID does not exist."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"The post information could not be retrieved."});
    }
});



router.delete('/:id', async (req, res) => {
    try{
        const counter = await Posts.remove(req.params.id);
        if (counter > 0) {
            res.status(200).json({message: "post has been deleted"});
        } else {
            res.status(404).json({message: 'could not find post'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error deleting this post"});
    }
});


router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: "Please provide title and contents for the post."});
    } else {
        try {
            let newPost = {
                title: req.body.title,
                contents: req.body.contents
            };
            let createdPostId = await Posts.insert(newPost);
            let createdPost = await Posts.findById(createdPostId.id)
            res.status(201).json(createdPost);
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"could not be saved to the database"});
        }
    }


});

router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: "Please provide title and contents for the post."});
    } else {
        // res.status(201).json(post);
    }
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message:"The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"The post information could not be modified." })
    }
})