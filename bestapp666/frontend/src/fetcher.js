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

const creatNewUser = async (userObject) => {
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

export {
    getUsers,
    getUser,
    creatNewUser,
    followUser,
    unfollowUser,
    getPosts
}