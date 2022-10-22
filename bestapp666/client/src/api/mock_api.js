/* istanbul ignore file */

import axios from 'axios';

//mockAPI URL 
// const rootURL = "";
//JSON-server URL
const rootURL ='http://localhost:8080/Users';
// Sends a Get request to the /Users endpoint
// returns all the users in the DB
export const getUsers = async () =>{
    try{
        const response = await axios.get(`${rootURL}`);
        return response.data;
        // the data is stored in the mockData
        // field of the response
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
        const response = await axios.get(`${rootURL}?username=${username}`);
        //get the fetched data's username
        let fetchedUsername;
        response.data.forEach(element => {
            fetchedUsername = element.username;
        });
        console.log(`successfully getUser by username: object with username: ${fetchedUsername}`);
        return response.data;
    }
    catch(err){
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
        const response = await axios.post(`${rootURL}`, userObject);
        console.log(`username=${userObject.username}&password=${userObject.password}&followings=${userObject.followings}&followers=${userObject.followers}&avatar=${userObject.avatar}&posts=${userObject.posts}`);
        return response.data; 
        // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}

export const createNewPost = async (username, postObject) =>{
    try{    
        const response = await axios.get(`${rootURL}?username=${username}`);
        let user = response.data[0];
        user.posts.push(postObject);
        const responsePut = await axios.put(`${rootURL}/${user.id}`, user);
        console.log(`successfully ${username} creates a new post`);
        return responsePut.data[0]; 
        // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}

export const followUser = async (username1, username2) =>{
    try{    
        const response1 = await axios.get(`${rootURL}?username=${username1}`);
        const response2 = await axios.get(`${rootURL}?username=${username2}`);
        let user1 = response1.data[0];
        let user2 = response2.data[0];
        user1.followings.push(username2);
        user2.followers.push(username1);
        const responseReturn = await axios.put(`${rootURL}/${user1.id}`, user1);
        await axios.put(`${rootURL}/${user2.id}`, user2);
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
        const response1 = await axios.get(`${rootURL}?username=${username1}`);
        const response2 = await axios.get(`${rootURL}?username=${username2}`);
        let user1 = response1.data[0]
        let user2 = response2.data[0]
        user1.followings = user1.followings.filter(n => n !== username2);
        user2.followers = user2.followers.filter(n => n !== username1);
        const responseReturn = await axios.put(`${rootURL}/${user1.id}`, user1);
        await axios.put(`${rootURL}/${user2.id}`, user2);
        //get the fetched data's username
        console.log(`successfully ${username1} unfollows ${username2}`);
        return responseReturn.data;
    }
    catch(err){
        console.error(err);
    }
}