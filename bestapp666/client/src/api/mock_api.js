
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
            const response = await axios.post(`${rootURL}`,
            `username=${userObject.username}&password=${userObject.password}&followings=${userObject.followings}&posts=${userObject.posts}`);
            console.log(`username=${userObject.username}&password=${userObject.password}&followings=${userObject.followings}&posts=${userObject.posts}`);
            return response.data; 
            // return the data with the id of the user
    }
    catch(err){
        console.error(err);
    }
}