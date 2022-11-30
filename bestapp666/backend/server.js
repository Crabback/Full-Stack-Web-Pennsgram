// backend ==> require
const express = require('express');

// (2) import and enable cors
// (cross-origin resource sharing)
const cors = require('cors');

// (3) create an instanece of our express app
const webapp = express();

// (4) enable cors
webapp.use(cors());

// (5) define the port
const port = 8080;

// (6) configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.json());

// (7) import the db interactions module
const dbLib = require('./dbFunctions');

// (8) declare a db reference variable
let db;

// start the server and connect to the DB
webapp.listen(port, async () => {
  db = await dbLib.connect();
  console.log(`Server running on port: ${port}`);
});


webapp.get('/users', async (req, res) => {
    try {
        const results = await dbLib.getUsers(db);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/user/:username', async (req, res) => {
    try {
        const results = await dbLib.getUser(db, req.params.username);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/user/', async (req, res) => {
    try {
        const results = await dbLib.getUsersAsList(db, req.body.usernames);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.post('/user/', async (req, res) => {
    try {
        const results = await dbLib.createNewUser(db, req.body.userObject);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/user/follow', async (req, res) => {
    try {
        const results = await dbLib.followUser(db, req.body.username1, req.body.username2);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/user/unfollow', async (req, res) => {
    try {
        const results = await dbLib.unfollowUser(db, req.body.username1, req.body.username2);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/posts', async (req, res) => {
    try {
        const results = await dbLib.getPosts(db);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/post/:postId', async (req, res) => {
    try {
        const results = await dbLib.getPost(db, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.post('/post/', async (req, res) => {
    try {
        const results = await dbLib.createNewPost(db, req.body.username, req.body.postObject);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.delete('/post/:postId', async (req, res) => {
    try {
        const results = await dbLib.deletePost(db, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/post/:postId', async (req, res) => {
    try {
        const results = await dbLib.updatePost(db, req.params.postId, req.body.newImage, req.body.newDescription);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/post/:postId/like', async (req, res) => {
    try {
        const results = await dbLib.likePost(db, req.body.username, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/post/:postId/unlike', async (req, res) => {
    try {
        const results = await dbLib.unlikePost(db, req.body.username, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/post/:postId/comments', async (req, res) => {
    try {
        const results = await dbLib.getComments(db, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.post('/post/:postId/comments', async (req, res) => {
    try {
        const results = await dbLib.addComment(db, req.params.postId, req.body.commentObject);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.delete('/post/:postId/comments', async (req, res) => {
    try {
        const results = await dbLib.deleteComment(db, req.params.postId, req.body.author, req.body.content);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/post/:postId/comments', async (req, res) => {
    try {
        const results = await dbLib.updateComment(db, req.params.postId, req.body.author, req.body.oldContent, req.body.newContent, req.body.newMention);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.use((req, resp) => {
    resp.status(404).json({ error: 'invalid endpoint' });
});