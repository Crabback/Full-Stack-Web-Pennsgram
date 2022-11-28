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

module.exports = {
  connect,
  getUsers,
  getUser,
  getUserAvatar,
  getPosts
};