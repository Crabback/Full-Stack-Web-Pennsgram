const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const url = "mongodb+srv://dbUser:BestApp666@bestapp666.cn6zpfi.mongodb.net/Pennsgram?retryWrites=true&w=majority";

// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    const con = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // check that we are connected to the db
    console.log(`connected to db: ${con.databaseName}`);
    return con;
  } catch (err) {
    console.log(err.message);
  }
};

const getUsers = async (db) =>{
  try{
    const result = await db.collection('Users').find({}).toArray();
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  }
  catch(err){
      console.error(err);
  }
}

const getUser = async (db, username) =>{
  try{    
      const result = await db.collection('Users').findOne({"username": username});
      //const response = await axios.get(`${rootURL+'/Users'}?username=${username}`);
      console.log(`successfully getUser by username: ${result}`);
      return result;
  }
  catch(err){
      console.error(err);
  }
}

const getUsersAsList = async (db, usernames) =>{
  try{    
      const userObjects = [];
      const roster = await getUsers(db); 
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

const getUserAvatar= async (db, username) =>{
  try{
      // try to get a user with username
      const result = await db.collection('Users').findOne({"username": username});
      return result.avatar;
  }catch(err){
      console.log("getUserAvatar() failed: username may not be valid ")
      console.error(err);
  }
}

const createNewUser = async (db, userObject) =>{
    await db.collection('Users').insertOne(
      userObject,
      (err, result) => {
        if(err){
          console.log(`error: ${err.message}`);
        }
        console.log(`New user created: ${result}`);
        return result;
      },
    );    
}

const followUser = async (db, username1, username2) =>{
  try{    
      let response1 = await getUser(db, username1);
      let response2 = await getUser(db, username2);

      response1.followings.push(username2);
      response2.followers.push(username1);

      await db.collection('Users').updateOne(
        {"username": username1},
        {$set: {"followings": response1.followings}}
      );
      await db.collection('Users').updateOne(
        {"username": username2},
        {$set: {"followers": response2.followers}}
      );

      console.log(`successfully ${username1} follows ${username2}`);
      return response1;
  }
  catch(err){
      console.error(err);
  }
}

const unfollowUser = async (db, username1, username2) =>{
  try{    
    let response1 = await getUser(db, username1);
    let response2 = await getUser(db, username2);

    response1.followings = user1.followings.filter(n => n !== username2);
    response2.followers = user2.followers.filter(n => n !== username1);
   
    await db.collection('Users').updateOne(
      {"username": username1},
      {$set: {"followings": response1.followings}}
    );
    await db.collection('Users').updateOne(
      {"username": username2},
      {$set: {"followers": response2.followers}}
    );

    console.log(`successfully ${username1} unfollows ${username2}`);
    return response1;
  }
  catch(err){
      console.error(err);
  }
}

///////////// Posts API //////////////

const getPosts = async (db) =>{
  try{
      const result = await db.collection('Posts').find({}).toArray();
      console.log(`Users: ${JSON.stringify(result)}`);
      return result;
  }
  catch(err){
      console.error(err);
  }
}

const getPost = async (db, postId) =>{
  try{    
      const response = await db.collection('Posts').findOne({"id": postId});
      console.log(`successfully getPost by id: object with id: ${postId}`);
      return response;
  }
  catch(err){
      console.error(err);
  }
}

const createNewPost = async (db, username, postObject) =>{
  try{    
      let response = await getUser(db, username);
      response.posts.push(postObject.id);
      await db.collection('Users').updateOne(
        {"username": username},
        {$set: {"posts": response.posts}}
      );      
      await db.collection('Posts').insertOne(postObject);
      console.log(`successfully ${username} creates a new post`);
      return response;
  }
  catch(err){
      console.error(err);
  }
}

const deletePost = async (db, postId) => {
  try{    
      const response = await db.collection('Posts').deleteMany({"id": postId});
      console.log("deletePost response: ", response);
      return response; 
  }
  catch(err){
      console.error(err);
  }
}

const updatePost = async (db, postId, newImage, newDescription) =>{
  try{    
      const response = await db.collection('Posts').updateOne(
        {"id": postId},
        {$set: {"image": newImage, "description": newDescription}}
      );  
      console.log(`successfully update post ${postId}` );
      return response;
  }
  catch(err){
      console.error(err);
  }
}

const likePost = async (db, username, postId) =>{
  try{    
      let response = await getPost(db, postId);
      response.likes.push(username);
      await db.collection('Posts').updateOne(
        {"id": postId},
        {$set: {"likes": response.likes}}
      );
      console.log(`successfully ${username} likes post ${postId}`);
      return response;
  }
  catch(err){
      console.error(err);
  }
}

const unlikePost = async (db, username, postId) =>{
  try{    
      let response = await getPost(postId);
      response.likes = response.likes.filter(n => n !== username);
      await db.collection('Posts').updateOne(
        {"id": postId},
        {$set: {"likes": response.likes}}
      );      
      console.log(`successfully ${username} unlikes post ${postId}`);
      return response;
  }
  catch(err){
      console.error(err);
  }
}

///////////// Comments API //////////////

const getComments = async (db, postId) =>{
  try{    
      let post = await getPost(db, postId);
      console.log(`successfully get comments ${post.comments}`);
      return post.comments;
  }
  catch(err){
      console.error(err);
  }
}

const addComment = async (db, postId, comment) =>{
  try{    
      let post = await getPost(db, postId);
      post.comments.push(comment);
      await db.collection('Posts').updateOne(
        {"id": postId},
        {$set: {"comments": post.comments}}
      );        
      console.log(`successfully comment ${comment} on post ${postId}`);
      return post;
  }
  catch(err){
      console.error(err);
  }
}

const deleteComment = async (db, postId, content) =>{
  try{    
      let post = await getPost(db, postId);
      post.comments = post.comments.filter(n => n.comment !== content);
      await db.collection('Posts').updateOne(
        {"id": postId},
        {$set: {"comments": post.comments}}
      );       
      console.log(`successfully delete comment [${content}] on post ${postId}`);
      return post;
  }
  catch(err){
      console.error(err);
  }
}

const updateComment = async (db, postId, oldcomment, newComment, newMention) =>{
  try{    
      let post = await getPost(db, postId);
      post.comments.forEach(function(obj){
          if(obj.comment == oldcomment){
              obj.comment = newComment;
              obj.mention = newMention;
          }
      })
      await db.collection('Posts').updateOne(
        {"id": postId},
        {$set: {"comments": post.comments}}
      );        
      console.log(`successfully update post ${postId}` );
      return post;
  }
  catch(err){
      console.error(err);
  }
}


module.exports = {
  connect,
  getUsers,
  getUser,
  getUsersAsList,
  getUserAvatar,
  createNewUser,
  followUser,
  unfollowUser,
  getPosts,
  getPost,
  createNewPost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
  getComments,
  addComment,
  deleteComment,
  updateComment
};