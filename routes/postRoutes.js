const express = require('express');
const fs = require('fs/promises');
const validatePostData = require('../middlewares/validateData');
const router = express.Router();

async function readData() {
    try {
        const data = await fs.readFile('./database/posts.json');
        return JSON.parse(data);
    } catch (error) {
        throw error
    }
}

//GET all posts
router.get('/', async (req, res, next) => {
    try {
        const data = await readData();
        res.status(200).send(data);
    } catch (error) {
        console.log(error.message);
    }
})
//GET specific post by ID
router.get('/post/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        const data = await readData();

        const post = data.find((post) => {
            return post.id === postId
        });

        if (!post) {
            res.status(404).json({error: "Post not found"});
        } else {
            res.status(200).send(post);
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
})
//CREATE a new post
router.post('/', validatePostData, async (req, res, next) => {
    try {
        const post = {
            id: Date.now().toString(),
            username: req.body.username,
            postTitle: req.body.title,
            postContent: req.body.content,
        }

        const data = await readData();
        data.push(post);

        await fs.writeFile('./database/posts.json', JSON.stringify(data));

        res.status(201).json(post);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
})
//UPDATE post
router.put('/post/:id', validatePostData, async (req, res, next) => {
    try {
        const postId = req.params.id;
        const data = await readData();

        const postIndex = data.findIndex((post) => {
            return post.id === postId
        });

        if (postIndex === -1) {
            res.status(404).json({error: "Post not found"});
        } else {
            const updatedData = {
                username: req.body.username,
                postTitle: req.body.title,
                postContent: req.body.content,
            }

            data[postIndex] = {
                ...data[postIndex],
                ...updatedData
            }
            await fs.writeFile('./database/posts.json', JSON.stringify(data));

            res.status(200).json(data[postIndex]);
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
})
//DELETE post by id
router.delete('/post/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;

        const data = await readData();

        const postIndex = data.findIndex((post) => {
            return post.id === postId
        });

        if (postIndex === -1) {
            res.status(404).json({error: "Post not found"});
        } else {
            data.splice(postIndex, 1);
            await fs.writeFile('./database/posts.json', JSON.stringify(data));
            res.status(200).json({message: "Post was delete successfully"});
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
})

module.exports = router;