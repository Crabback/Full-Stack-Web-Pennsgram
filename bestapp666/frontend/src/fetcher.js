import axios from 'axios';

const getUsers = async () => {
    var res = await axios.get(`http://localhost:8080/users`);
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const getUser = async (username) => {
    var res = await axios.get(`http://localhost:8080/user/${username}`);
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const createNewUser = async (userObject) => {
    var res = await axios.post(`http://localhost:8080/user/`, {
        "userObject": userObject
    });
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const followUser = async (username1, username2) => {
    var res = await axios.put(`http://localhost:8080/follow`, {
        "username1": username1, 
        "username2": username2
    });
    return res.data.data;
}

const unfollowUser = async (username1, username2) => {
    var res = await axios.put(`http://localhost:8080/unfollow`, {
        "username1": username1, 
        "username2": username2
    });
    return res.data.data;
}

const getPosts = async () => {
    var res = await axios.get(`http://localhost:8080/posts`);
    return res.data.data;
}

const getPost = async (postId) => {
    var res = await axios.get(`http://localhost:8080/post/${postId}`);
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const createNewPost = async (username, postObject) => {
    var res = await axios.post(`http://localhost:8080/post/`,
    {
        "username": username, 
        "postObject": postObject
    }
    );
    return res.data.data;
}

const deletePost = async (postId) => {
    var res = await axios.delete(`http://localhost:8080/post/${postId}`);
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const updatePost = async (postId, newImage, newDescription) => {
    var res = await axios.put(`http://localhost:8080/post/${postId}`,
    {
        "newImage": newImage,
        "newDescription": newDescription
    }
    );
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const likePost = async (postId, username) => {
    var res = await axios.put(`http://localhost:8080/post/${postId}/like`,
    {
        "username": username,
    }
    );
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const unlikePost = async (postId, username) => {
    var res = await axios.put(`http://localhost:8080/post/${postId}/unlike`,
    {
        "username": username,
    }
    );
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const getComments = async (postId) => {
    var res = await axios.get(`http://localhost:8080/post/${postId}/comments`);
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const addComment = async (postId, commentObject) => {
    var res = await axios.post(`http://localhost:8080/post/${postId}/comments`,
    {
        "commentObject": commentObject
    }
    );
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const updateComment = async (postId, author, oldContent, newContent, newMention) => {
    var res = await axios.put(`http://localhost:8080/post/${postId}/comments`,
    {
        "author": author,
        "oldContent": oldContent,
        "newContent": newContent,
        "newMention": newMention
    }
    );
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const deleteComment = async (postId, author, content) => {
    var res = await axios.delete(`http://localhost:8080/post/${postId}/comments`,
    {
        "author": author,
        "content": content
    }
    );
    console.log(res.status + " " + res.statusText);
    return res.data.data;
}

const getUsersAsList = async (usernames) =>{
    const res = await axios.put(`http://localhost:8080/userlist`,
    {
        usernames: usernames
    });
    console.log(res);
    return res.data.data;
}

const getLastestPostOfAUser = async (username) =>{
    var res = await axios.get(`http://localhost:8080/user/${username}/latest`);
    return res.data.data;
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
    getLastestPostOfAUser
}