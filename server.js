// backend ==> require
const express = require('express');
// import and enable cors
// (cross-origin resource sharing)
const cors = require('cors');
//import JWT
const jwt = require('jsonwebtoken');
// create an instanece of our express app
const webapp = express();
// enable cors
webapp.use(cors());
// define the port
require('dotenv').config();
const secret1 = process.env.SECRET1;
const secret2 = process.env.SECRET2;

const port = process.env.PORT || 8080;

// configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));
webapp.use(express.json());
// import the db interactions module
const dbLib = require('./dbFunctions');
// declare a db reference variable
let db;
// specifid our mongo db url to connect
const url = process.env.URL;
// deployment
const path = require('path');
webapp.use(express.static(path.join(__dirname, './frontend/build')));

// start the server and connect to the DB
//if (process.env.NODE_ENV !== 'test') {
if (true) {
    // start the server and connect to the DB
    webapp.listen(port, async () => {
        db = await dbLib.connect(url);
        console.log(`Server running on port: ${port}`);
    });
}

// authenticate a user by encoding the JWT
const authenticateUser = async (token, key) => {
    if (token === null || key === null || !key) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, key);
        const user = await dbLib.getUser(db, decoded.username);
        if (!user) {
            return false;
        }
        return true;
    } catch (err) {
        console.log('auth check error, auth token expired.');
        return false;
    }
}

const checkLocks = async (token, key) => {
    if (token === null || key === null || !key) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, key);
        return true;
    } catch (err) {
        console.log('lock check error, no lock or lock expired.');
        return false;
    }
}

webapp.post('/api/login', async (req, res) => {
    console.log('Create a new session with duration 20 mins.');
    if (!req.body.username) {
        res.status(401).json({ error: "missing username" });
        res.end();
    }
    try {   // account locked
        if (await checkLocks(req.headers.lock, secret2)){
            res.status(202).json({ token: null, data: null, message: "Account Locked! Try again in 30s." });
        }else{
            // retrieve the user information
            const results = await dbLib.getUser(db, req.body.username);
            // user not found
            if (results === null) {
                res.status(202).json({ token: null, data: null, message: "User Not Found!" });
            } else {
                // password correct
                if (results.password === req.body.password) {
                    const jwtoken = jwt.sign({ username: req.body.username, password: req.body.username }, secret1, { expiresIn: '1200s' });
                    res.status(201).json({ token: jwtoken, data: results });
                } else {
                // wrong password
                    res.status(202).json({ token: null, data: null, message: "Wrong Password!" });
                }
            }
        }
        return res;
    } catch (err) {
        res.status(401).json({ error: "error" });
    }
});

webapp.post('/api/logout', async (req, res) => {
    console.log('end a session, delete the token');
    if (!req.body.username) {
        res.status(401).json({ error: "missing username" });
        res.end();
    }
    try {
        //const jwtoken = jwt.sign({ username: req.body.username, password: req.body.username }, secret, { expiresIn: '60s' });
        res.status(201).json({ token: jwtoken });
    } catch (err) {
        res.status(401).json({ error: "error" });
    }
});

webapp.post('/api/lock', async(req, res) => {
    console.log('lock the username');
    try {
        const jwtoken = jwt.sign({ username: req.body.username }, secret2, { expiresIn: '30s' });
        res.status(201).json({ token: jwtoken });
        return res;
    } catch (err) {
        res.status(401).json({ error: "error" });
    }
});

webapp.post('/api/restoreauth', async(req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, secret1);
        const user = await dbLib.getUser(db, decoded.username);
        res.status(201).json({ data: user });
        console.log('restore user');
        return res;
    } catch (err) {
        res.status(401).json({ error: "error" });
    }
});

webapp.get('/api/users', async (req, res) => {
    try {
        const results = await dbLib.getUsers(db);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/api/user/:username', async (req, res) => {
    try {
        const results = await dbLib.getUser(db, req.params.username);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});


webapp.post('/api/user/', async (req, res) => {
    try {
        const results = await dbLib.createNewUser(db, req.body.userObject);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.put('/api/user/follow', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.followUser(db, req.body.username1, req.body.username2);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.put('/api/user/unfollow', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.unfollowUser(db, req.body.username1, req.body.username2);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.get('/api/posts', async (req, res) => {
    try {
        const results = await dbLib.getPosts(db);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.get('/api/post/:postId', async (req, res) => {
    try {
        const results = await dbLib.getPost(db, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.post('/api/post/', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.createNewPost(db, req.body.username, req.body.postObject);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.delete('/api/post/:postId', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.deletePost(db, req.params.postId);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.put('/api/post/:postId', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.updatePost(db, req.params.postId, req.body.newImage, req.body.newDescription);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.put('/api/post/:postId/like', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.likePost(db, req.body.username, req.params.postId);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.put('/api/post/:postId/unlike', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.unlikePost(db, req.body.username, req.params.postId);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});

webapp.get('/api/post/:postId/comments', async (req, res) => {
    try {
        const results = await dbLib.getComments(db, req.params.postId);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.post('/api/post/:postId/comments', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.addComment(db, req.params.postId, req.body.commentObject);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});


webapp.put('/api/post/:postId/comments', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.updateComment(db, req.params.postId, req.body.author, req.body.oldContent, req.body.newContent, req.body.newMention);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});


webapp.delete('/api/post/:postId/comments', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.deleteComment(db, req.params.postId, req.body.author, req.body.content);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});


webapp.put('/api/userlist', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.getUsersAsList(db, req.body.usernames);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});


webapp.get('/api/user/:username/latest', async (req, res) => {
    if (await authenticateUser(req.headers.authorization, secret1)) {
        try {
            const results = await dbLib.getLastestPostOfAUser(db, req.params.username);
            res.status(200).json({ data: results });
            return res;
        } catch (err) {
            res.status(404).json({ message: 'there was error' });
        }
    } else {
        res.status(401).json({ message: 'failed authentication' });
    }
});


webapp.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});


webapp.use((req, resp) => {
    resp.status(404).json({ error: 'invalid endpoint' });
});

module.exports = {
    url,
    webapp,
};