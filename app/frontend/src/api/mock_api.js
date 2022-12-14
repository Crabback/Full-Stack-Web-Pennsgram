/* istanbul ignore file */

import { ManOutlined } from '@mui/icons-material';
import axios from 'axios';

//mockAPI URL 
// const rootURL = "";
//JSON-server URL
const rootURL ='http://localhost:8080';

// Sends a Get request to the /Users endpoint
// returns all the users in the DB
export const getUsers = async () =>{
    try{
        const response = await axios.get(`${rootURL+'/Users'}`);
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}

// Takes the username of a user as input
// and sends a Get request to the /user:id endpoint
// returns the attributes of the user
export const getUser = async (username) =>{
    try{    
        console.log(`localhost:8080/user/${username}`);
        const response = await axios.get(`http://localhost:8080/user/${username}`);
        //get the fetched data's username
        /*
        let fetchedUsername;
        response.data.forEach(element => {
            fetchedUsername = element.username;
        });        */
        console.log(`successfully getUser by username: object with username: ${username}`);
        return response;
    }
    catch(err){
        console.error(err);
    }
}

export const getUserAvatar= async (username) =>{
    try{
        // try to get a user with username
        let user = await getUser(username);
        user = user[0];
        return user.avatar;
    }catch(err){
        console.log("getUserAvatar() failed: username may not be valid ")
        console.error(err);
    }
}

// Takes the list of usernames as input
// and sends a Get request to the /user:id endpoint
// returns a list of user objects
export const getUsersAsList = async (usernames) =>{
    try{    
        const userObjects = [];
        const roster = await getUsers(); 
        roster.forEach((element) => {
            if(usernames.includes(element.username)){
                userObjects.push(element);
            }
        })
        userObjects.forEach((o)=>{console.log(o.username);})

        return userObjects;
    }
    catch(err){
        console.error(err);
    }
}

// Takes a user (without the id) as input
// and sends a POST request to the /user endpoint
// returns the attributes of the user with the id
export const createNewUser = async (userObject) =>{
    try{    
        const response = await axios.post(`${rootURL+'/Users'}`, userObject);
        console.log(`username=${userObject.username}&password=${userObject.password}&followings=${userObject.followings}&followers=${userObject.followers}&avatar=${userObject.avatar}&posts=${userObject.posts}`);
        return response.data; 
        // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}

export const followUser = async (username1, username2) =>{
    try{    
        const response1 = await axios.get(`${rootURL+'/Users'}?username=${username1}`);
        const response2 = await axios.get(`${rootURL+'/Users'}?username=${username2}`);
        let user1 = response1.data[0];
        let user2 = response2.data[0];
        user1.followings.push(username2);
        user2.followers.push(username1);
        const responseReturn = await axios.put(`${rootURL+'/Users'}/${user1.id}`, user1);
        await axios.put(`${rootURL+'/Users'}/${user2.id}`, user2);
        //get the fetched data's username
        console.log(`successfully ${username1} follows ${username2}`);
        return responseReturn.data;
    }
    catch(err){
        console.error(err);
    }
}

export const unfollowUser = async (username1, username2) =>{
    try{    
        const response1 = await axios.get(`${rootURL+'/Users'}?username=${username1}`);
        const response2 = await axios.get(`${rootURL+'/Users'}?username=${username2}`);
        let user1 = response1.data[0]
        let user2 = response2.data[0]
        user1.followings = user1.followings.filter(n => n !== username2);
        user2.followers = user2.followers.filter(n => n !== username1);
        const responseReturn = await axios.put(`${rootURL+'/Users'}/${user1.id}`, user1);
        await axios.put(`${rootURL+'/Users'}/${user2.id}`, user2);
        console.log(`successfully ${username1} unfollows ${username2}`);
        return responseReturn.data;
    }
    catch(err){
        console.error(err);
    }
}


///////////// Posts API //////////////


export const getPosts = async () =>{
    try{
        const response = await axios.get(`${rootURL+'/Posts'}`);
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}

export const getPost = async (postId) =>{
    try{    
        const response = await axios.get(`${rootURL+'/Posts'}?id=${postId}`);
        console.log(`successfully getPost by id: object with id: ${postId}`);
        console.log("post being fetched: author = ", response.data[0].author);
        return response.data[0];
    }
    catch(err){
        console.error(err);
    }
}

/**
 * get the latest post of a user specified by a username
 * @param {*} username 
 * return: the latest post of this user with an added field: the user's avatar
 * being called by FeedPage
 */
export const getLastestPostOfAUser = async (username) => {
    let user = null;
    try{
        // try to get a user with username
        user = await getUser(username);
        user = user[0];
    }catch(err){
        console.log("getUser() failed: username may not be valid ")
        console.error(err);
    }
    if(!user) return {};
    const userPostIdList = user.posts;
    const latestId = Math.max(...userPostIdList);
    // get the post with the latest id of this user
    let latestPost = {};
    try{
        // try to get a post with id
        latestPost = await getPost(latestId);

        //adding one more avatar field for this post
        latestPost.avatar = user.avatar;

    }catch(err){
        console.log("getPost() failed: wrong post id being passed in ")
        console.error(err);
    }
    
    return latestPost;
}

export const getUserFollowingSuggestion = async (username) => {
    let user = null;
    let followings = null;
    try{
        // try to get a user with username
        user = await getUser(username);
        user = user[0];
    }catch(err){
        console.log("getUser() failed: username may not be valid ")
        console.error(err);
    }
    if(!user) return {};
    followings = user.followings;
    let suggestions = [];
    let map = new Map();
    followings.forEach( async (username) => {
        let secondaryFollowings = {};
        let primaryFollowing = null;
        try{
            // try to get a user with username
            primaryFollowing = await getUser(username);
            primaryFollowing = user[0];
        }catch(err){
            console.log("getUser() failed: username may not be valid ")
            console.error(err);
        }
        if(primaryFollowing) {
            secondaryFollowings = primaryFollowing.followings;
            if (secondaryFollowings) {
                secondaryFollowings.forEach((username) => {
                    if (map.has(username)) {
                        const count = map.get(username);
                        map.delete(username);
                        map.set(username, count + 1);
                    } else {
                        map.set(username, 1);
                    }
                })
            }
        }
    });
    function pushIntoMap(value, key, map) {
        if (value > 1 && !followings.includes(key)) {
            suggestions.push(key);
        }
    }
    map.forEach(pushIntoMap);
    console.log(suggestions);
    return suggestions;
}


export const createNewPost = async (username, postObject) =>{
    try{    
        const response = await axios.get(`${rootURL+'/Users'}?username=${username}`);
        let user = response.data[0];
        user.posts.push(postObject.id);
        const responsePut = await axios.put(`${rootURL+'/Users'}/${user.id}`, user);
        const responsePost = await axios.post(`${rootURL+'/Posts'}`, postObject);
        console.log(`successfully ${username} creates a new post`);
        return responsePut.data[0]; 
        // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}


export const deletePost = async (postId) => {
    try{    
        const response = await axios.delete(`${rootURL+'/Posts'}/${postId}`);
        console.log("deletePost response: ", response);
        return response.data; 
        // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}

export const updatePost = async (postId, newImage, newDescription) =>{
    try{    
        let post = await getPost(postId);
        post.image = newImage;
        post.description = newDescription;
        const responsePut = await axios.put(`${rootURL+'/Posts'}/${postId}`, post);
        console.log(`successfully update post ${postId}` );
        //return responsePut.data[0]; 
        // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}

export const likePost = async (username, postId) =>{
    try{    
        let post = await getPost(postId);
        post.likes.push(username);
        const response = await axios.put(`${rootURL+'/Posts'}/${post.id}`, post);
        console.log(`successfully ${username} likes post ${postId}`);
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}

export const unlikePost = async (username, postId) =>{
    try{    
        let post = await getPost(postId);
        post.likes = post.likes.filter(n => n !== username);
        const response = await axios.put(`${rootURL+'/Posts'}/${post.id}`, post);
        console.log(`successfully ${username} likes post ${postId}`);
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}

export const getComments = async (postId) =>{
    try{    
        let post = await getPost(postId);
        console.log(`successfully comment post ${post.comments}`);
        return post.comments;
    }
    catch(err){
        console.error(err);
    }
}

export const addComment = async (postId, comment) =>{
    try{    
        let post = await getPost(postId);
        post.comments.push(comment);
        const response = await axios.put(`${rootURL+'/Posts'}/${postId}`, post);
        console.log(`successfully comment ${comment} on post ${postId}`);
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}

export const deleteComment = async (postId, content) =>{
    try{    
        let post = await getPost(postId);
        post.comments = post.comments.filter(n => n.comment !== content);
        const response = await axios.put(`${rootURL+'/Posts'}/${postId}`, post);
        console.log(`successfully delete comment [${content}] on post ${postId}`);
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}

export const updateComment = async (postId, oldcomment, newComment, newMention) =>{
    try{    
        let post = await getPost(postId);
        post.comments.forEach(function(obj){
            if(obj.comment == oldcomment){
                obj.comment = newComment;
                obj.mention = newMention;
            }
        })
        const responsePut = await axios.put(`${rootURL+'/Posts'}/${postId}`, post);
        console.log(`successfully update post ${postId}` );
        //return responsePut.data[0]; 
    }
    catch(err){
        console.error(err);
    }
}