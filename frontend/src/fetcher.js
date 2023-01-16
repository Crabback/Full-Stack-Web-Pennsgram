import axios from 'axios';

const rootURL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
? 'http://localhost:8080'
: '';

// Add the token to all HTTP requests
const setHeaders = () => {
    axios.defaults.headers.common['Authorization'] = (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null
}

const setLockHeaders = () => {
    axios.defaults.headers.common['Lock'] = (sessionStorage.getItem('lock-token') !== null) ? sessionStorage.getItem('lock-token') : null
}

const reAuthenticate = (status) => {
    if (status == 401) {
        sessionStorage.removeItem('app-token');
        window.location.reload(true);
    }
}

const login = async (username, password) => {
    try {
        setLockHeaders();
        const res = await axios.post(`${rootURL}/api/login`, {
            "username": username,
            "password": password
        });
        if (res.status == 201){
            sessionStorage.setItem('app-token', res.data.token);
            sessionStorage.removeItem('lock-token');
        }
        return res;
    } catch (err) {
        console.log(err);
    }
}

const logout = async (username, password) => {
    try {
        const res = await axios.post(`${rootURL}/api/logout`, {
            "username": username,
            "password": password
        });
        //sessionStorage.setItem('app-token', res.data.token);
    } catch (err) {
        console.log(err);
    }
}

const lock = async (username) => {
    try {
        const res = await axios.post(`${rootURL}/api/lock`, {
            "username": username
        });
        if (res.status == 201){
            sessionStorage.setItem('lock-token', res.data.token);
        }       
        return res;
    } catch (err) {
        console.log(err);
    }
}

const restoreAuth = async (token) => {
    try {
        const res = await axios.post(`${rootURL}/api/restoreauth`, {
            "token": token
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}

const getUsers = async () => {
    try {
        var res = await axios.get(`${rootURL}/api/users`);
        console.log(res.status + " " + res.statusText);
        // reAuthenticate(res.status);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}

const getUser = async (username) => {
    try {
        var res = await axios.get(`${rootURL}/api/user/${username}`);
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}

const createNewUser = async (userObject) => {
    try {
        var res = await axios.post(`${rootURL}/api/user/`, {
            "userObject": userObject
        });
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}

const followUser = async (username1, username2) => {
    try {
        setHeaders();
        var res = await axios.put(`${rootURL}/api/user/follow`, {
            "username1": username1,
            "username2": username2
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const unfollowUser = async (username1, username2) => {
    try {
        setHeaders();
        var res = await axios.put(`${rootURL}/api/user/unfollow`, {
            "username1": username1,
            "username2": username2
        });
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const getPosts = async () => {
    try {
        var res = await axios.get(`${rootURL}/api/posts`);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}

const getPost = async (postId) => {
    try {
        var res = await axios.get(`${rootURL}/api/post/${postId}`);
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
}

const createNewPost = async (username, postObject) => {
    try {
        setHeaders();
        var res = await axios.post(`${rootURL}/api/post/`,
            {
                "username": username,
                "postObject": postObject
            }
        );
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const deletePost = async (postId) => {
    try {
        setHeaders();
        var res = await axios.delete(`${rootURL}/api/post/${postId}`);
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const updatePost = async (postId, newImage, newDescription) => {
    try {
        setHeaders();
        var res = await axios.put(`${rootURL}/api/post/${postId}`,
            {
                "newImage": newImage,
                "newDescription": newDescription
            }
        );
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const likePost = async (username, postId) => {
    try {
        setHeaders();
        var res = await axios.put(`${rootURL}/api/post/${postId}/like`,
            {
                "username": username,
            }
        );
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const unlikePost = async (username, postId) => {
    try {
        setHeaders();
        var res = await axios.put(`${rootURL}/api/post/${postId}/unlike`,
            {
                "username": username,
            }
        );
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const getComments = async (postId) => {
    var res = await axios.get(`${rootURL}/api/post/${postId}/comments`);
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const addComment = async (postId, commentObject) => {
    try {
        setHeaders();
        var res = await axios.post(`${rootURL}/api/post/${postId}/comments`,
            {
                "commentObject": commentObject
            }
        );
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const updateComment = async (postId, author, oldContent, newContent, newMention) => {
    try {
        setHeaders();
        console.log("(postId, author, oldContent, newContent, newMention) = ", `'${postId}' '${author}' '${oldContent}' '${newContent}' '${newMention}'`);
        var res = await axios.put(`${rootURL}/api/post/${postId}/comments`,
            {
                "author": author,
                "oldContent": oldContent,
                "newContent": newContent,
                "newMention": newMention
            }
        );
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const deleteComment = async (postId, author, content) => {
    try {
        setHeaders();
        console.log(`fetcher.js: '${postId}', '${author}', '${content}'`);
        var res = await axios(
            {
                method: 'delete',
                url: `${rootURL}/api/post/${postId}/comments`,
                data: {
                    "author": author,
                    "content": content
                }
            }
        );
        console.log(res.status + " " + res.statusText);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const getUsersAsList = async (usernames) => {
    try {
        setHeaders();
        const res = await axios.put(`${rootURL}/api/userlist`,
            {
                usernames: usernames
            });
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const getLastestPostOfAUser = async (username) => {
    try {
        setHeaders();
        var res = await axios.get(`${rootURL}/api/user/${username}/latest`);
        return res.data.data;
    } catch (err) {
        console.log(err);
        reAuthenticate(401);
    }
}

const getUserFollowingSuggestion = async (username) => {
    let user = null;
    let followings = null;
    user = await getUser(username);
    if (!user) return [];
    followings = user.followings;
    let suggestions = [];
    if (!followings) {
        return [];
    };
    const map1 = new Map();
    followings.forEach(async (followingUsername) => {
        const following = await getUser(followingUsername);
        const secondaryFollowers = following.followers;
        secondaryFollowers.forEach((secondayUsername) => {
            if(map1.has(secondayUsername)) {
                map1.set(secondayUsername, map1.get(secondayUsername) + 1);
                if (map1.get(secondayUsername) >= 3 && !followings.includes(secondayUsername) && secondayUsername != username && !suggestions.includes(secondayUsername)) {
                    suggestions.push(secondayUsername);
                }
            } else {
                map1.set(secondayUsername, 1);
            }
        })
    });
    console.log(suggestions);
    return suggestions;
}

const getTotalFollowingPosts = async (followingUsernames) => {
    let postCount = 0;
    const userObjects = await getUsersAsList(followingUsernames);
    userObjects.map((o) => {
        postCount += o.posts.length;
    });
    return postCount;
}

export {
    getUsers,
    getUser,
    createNewUser,
    followUser,
    unfollowUser,
    getPosts,
    getPost,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
    getComments,
    addComment,
    updateComment,
    deleteComment,
    getUsersAsList,
    createNewPost,
    getLastestPostOfAUser,
    getUserFollowingSuggestion,
    getTotalFollowingPosts,
    login,
    logout,
    lock,
    restoreAuth
}