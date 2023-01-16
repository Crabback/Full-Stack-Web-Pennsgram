const dbLib = require('../dbFunctions'); 
const url = "mongodb+srv://dbUser:BestApp666@bestapp666.cn6zpfi.mongodb.net/Pennsgram?retryWrites=true&w=majority";

let db;

// cleanup the database after each test: remove the all created test users
const clearDatabase = async (db) => {
    try {
        const result1 = await db.collection('Users').deleteOne({ "username": "testuser1" });
        const result2 = await db.collection('Users').deleteOne({ "username": "testuser2" });
        const result3 = await db.collection('Users').deleteOne({ "username": "testuser3" });
        const deletedCount  = result1.deletedCount + result2.deletedCount + result3.deletedCount;
        if (deletedCount === 3) {
            console.log('info', 'Successfully deleted all test users');
        } else if(result1.deletedCount !== 1){
            console.log('warning', 'testuser1 was not deleted');
        } else if(result2.deletedCount !== 1){
            console.log('warning', 'testuser2 was not deleted');
        } else if(result3.deletedCount !== 1){
            console.log('warning', 'testuser3 was not deleted');
        }
    } catch (err) {
        console.log('error', err.message);
    }
};



/**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add - "jest": true -
 */


afterEach(async () => {
    await clearDatabase(db);
});

// test data
const commonAvatar =  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1566px-Test-Logo.svg.png" ;

const testUser1 = {
    id: -2 , 
    username: "testuser1",
    password: "test123",
    followings: [],
    followers: [],
    avatar: commonAvatar,
    posts: [],
    followerSuggestions: []
};

const testUser2 = {
    id: -3 , 
    username: "testuser2",
    password: "test123",
    followings: [],
    followers: [],
    avatar: commonAvatar,
    posts: [],
    followerSuggestions: []
};

const testUser3 = {
    id: -4 , 
    username: "testuser3",
    password: "test123",
    followings: [],
    followers: [],
    avatar: commonAvatar,
    post: [],
    followerSuggestions: []
};

// define a custom matcher to check if a specific object is contained in a list of object 
expect.extend({
    toContainObjectPartial(received, argument) {

        const pass = this.equals(received, 
        expect.arrayContaining([
            expect.objectContaining(argument)
        ])
        )

        if (pass) {
        return {
            message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
            pass: true
        }
        } else {
        return {
            message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
            pass: false
        }
        }
    }
})

// define a custom matcher to check if a specific object is NOT contained in a list of object 
expect.extend({
    toNotContainObjectPartial(received, argument) {

        const pass = this.equals(received, 
        expect.arrayContaining([
            expect.objectContaining(argument)
        ])
        )

        if (!pass) {
        return {
            message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
            pass: true
        }
        } else {
        return {
            message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
            pass: false
        }
        }
    }
})


describe('User operations tests', () => {


    test('test createNewUser()', async () => {
        db = await dbLib.connect(url);
        await dbLib.createNewUser(db, testUser1);
        await dbLib.createNewUser(db, testUser2);
        await dbLib.createNewUser(db, testUser3);
        // find new user in the DB
        const insertedUser = await db.collection('Users').findOne({ username: "testuser1" });
        expect(insertedUser.username).toEqual('testuser1');

        const insertedUser2 = await db.collection('Users').findOne({ username: "testuser2" });
        expect(insertedUser2.username).toEqual('testuser2');
    });

    test('createNewUser() exception', async () => {
      db = await dbLib.connect("");
      try{
        await dbLib.createNewUser(db, testUser1);
      } catch(err){
        expect(err.message).toBe('Error executing the query');
      }
    });
});




test('test getUsers() = async (db)', async () => {
    console.log("******** test getUsers() ******** ");
    db = await dbLib.connect(url);
    await dbLib.createNewUser(db, testUser1);
    await dbLib.createNewUser(db, testUser2);
    await dbLib.createNewUser(db, testUser3);

    const allUsers = await dbLib.getUsers(db);
    expect(allUsers).toContainObjectPartial({username: "testuser1"});
    expect(allUsers).toContainObjectPartial({username: "testuser2"});
    expect(allUsers).toContainObjectPartial({username: "testuser3"});

    // check if allUsers contain the three test users
    expect(allUsers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({username: "testuser1"}),
          expect.objectContaining({username: "testuser2"}),
          expect.objectContaining({username: "testuser3"}),
        ])
    ); 
});

test('test getUser = async (db, username)', async () => {
    console.log("******** test getUser() ******** ");

    db = await dbLib.connect(url);
    await dbLib.createNewUser(db, testUser1);
    await dbLib.createNewUser(db, testUser2);
    await dbLib.createNewUser(db, testUser3);

    // start testing 
    const user1 = await dbLib.getUser(db, "testuser1");
    const user2 = await dbLib.getUser(db, "testuser2");
    const user3 = await dbLib.getUser(db, "testuser3");

    // check 
    expect(user1.id).toEqual(-2);
    expect(user1.username).toEqual("testuser1");

    expect(user2.id).toEqual(-3);
    expect(user2.username).toEqual("testuser2");

    expect(user3.id).toEqual(-4);
    expect(user3.username).toEqual("testuser3");
});


test('test getUsersAsList = async (db, usernames) ', async () => {
    console.log("******** test getUsersAsList = async (db, usernames)  ******** ");

    db = await dbLib.connect(url);
    await dbLib.createNewUser(db, testUser1);
    await dbLib.createNewUser(db, testUser2);
    await dbLib.createNewUser(db, testUser3);

    // start testing 
    const userList_12 = await dbLib.getUsersAsList(db, ["testuser1", "testuser2"]);
    const userList_23 = await dbLib.getUsersAsList(db, ["testuser2", "testuser3"]);

    // check 
    expect(userList_12).toContainObjectPartial({username: "testuser1"});
    expect(userList_12).toContainObjectPartial({username: "testuser2"});
    expect(userList_12).toNotContainObjectPartial({username: "testuser3"});

    expect(userList_23).toContainObjectPartial({username: "testuser2"});
    expect(userList_23).toContainObjectPartial({username: "testuser3"});
    expect(userList_23).toNotContainObjectPartial({username: "testuser1"});
});

test('test getUserAvatar = async (db, username)', async () => {
    console.log("******** test getUserAvatar = async (db, username) ******** ");

    db = await dbLib.connect(url);
    await dbLib.createNewUser(db, testUser1);
    await dbLib.createNewUser(db, testUser2);
    await dbLib.createNewUser(db, testUser3);

    // start testing 
    const avatar1 = await dbLib.getUserAvatar(db, "testuser1");
    const avatar2 = await dbLib.getUserAvatar(db, "testuser2");
    const avatar3 = await dbLib.getUserAvatar(db, "testuser3");
    // check 
    expect(avatar1).toEqual(commonAvatar);
    expect(avatar2).toEqual(commonAvatar);
    expect(avatar3).toEqual(commonAvatar);
});

test('test followUser = async (db, username1, username2)', async () => {
    console.log("******** test followUser = async (db, username1, username2) ");

    //start following 
    db = await dbLib.connect(url);
    await dbLib.createNewUser(db, testUser1);
    await dbLib.createNewUser(db, testUser2);
    await dbLib.createNewUser(db, testUser3);

    // start testing 
    await dbLib.followUser(db, "testuser1", "testuser2");
    await dbLib.followUser(db, "testuser2", "testuser3");
    await dbLib.followUser(db, "testuser3", "testuser1");

    const user1 = await dbLib.getUser(db, "testuser1");
    const user2 = await dbLib.getUser(db, "testuser2");
    const user3 = await dbLib.getUser(db, "testuser3");
    // check if user1 followed user2
    expect(user1.followings).toContain("testuser2");
    expect(user2.followers).toContain("testuser1");

    //check if user2 followed user3
    expect(user2.followings).toContain("testuser3");
    expect(user3.followers).toContain("testuser2");

    //check if user3 followed user1
    expect(user3.followings).toContain("testuser1");
    expect(user1.followers).toContain("testuser3");
});

test('test unfollowUser = async (db, username1, username2)', async () => {
    console.log("******** test unfollowUser = async (db, username1, username2) ");

    //start following 
    db = await dbLib.connect(url);
    await dbLib.createNewUser(db, testUser1);
    await dbLib.createNewUser(db, testUser2);
    await dbLib.createNewUser(db, testUser3);
    // start testing 
    await dbLib.followUser(db, "testuser1", "testuser2");
    await dbLib.followUser(db, "testuser2", "testuser3");
    await dbLib.followUser(db, "testuser3", "testuser1");
    const user1 = await dbLib.getUser(db, "testuser1");
    const user2 = await dbLib.getUser(db, "testuser2");
    const user3 = await dbLib.getUser(db, "testuser3");
    // check if user1 followed user2
    expect(user1.followings).toContain("testuser2");
    expect(user2.followers).toContain("testuser1");
    //check if user2 followed user3
    expect(user2.followings).toContain("testuser3");
    expect(user3.followers).toContain("testuser2");
    //check if user3 followed user1
    expect(user3.followings).toContain("testuser1");
    expect(user1.followers).toContain("testuser3");

    //continue to test unfollow()
    //let's unfollow all
    await dbLib.unfollowUser(db, "testuser1", "testuser2");
    await dbLib.unfollowUser(db, "testuser2", "testuser3");
    await dbLib.unfollowUser(db, "testuser3", "testuser1");

    //check if all the follower and followings are empty list
    const user1_after = await dbLib.getUser(db, "testuser1");
    const user2_after = await dbLib.getUser(db, "testuser2");
    const user3_after = await dbLib.getUser(db, "testuser3");
    expect(user1_after.followings).toEqual([]);
    expect(user1_after.followers).toEqual([]);
    expect(user2_after.followings).toEqual([]);
    expect(user2_after.followers).toEqual([]);
    expect(user3_after.followings).toEqual([]);
    expect(user3_after.followers).toEqual([]);
});


//////////////// part 2: post operation test ////////////

const post1 =     {
    "id": -2,
    "author": "testuser1",
    "description": "I am back!.",
    "date": "10/16/2022",
    "image": "https://www.usnews.com/object/image/00000183-d7ca-d4f7-ab97-f7fb58650000/gettyimages-1413330959.jpg?update-time=1665773592637&size=responsive640",
    "likes": [],
    "comments": []
  }

const post2 =     {
    "id": -3,
    "author": "testuser2",
    "description": "This is the description of a test post.: 'my avatar is like'",
    "date": "10/16/2022",
    "image": commonAvatar,
    "likes": [],
    "comments": []
}


describe('Post operations tests', () => {

    // create the three test users first 
    beforeEach(async () => {
        db = await dbLib.connect(url);
        await dbLib.createNewUser(db, testUser1);
        await dbLib.createNewUser(db, testUser2);
        await dbLib.createNewUser(db, testUser3);
        await dbLib.createNewPost(db, "testuser1", post1);
    });

    ////// test for manipulate posts ///////

    test('test createNewPost = async (db, username, postObject) ', async () => {
        console.log("******** test createNewPost = async (db, username, postObject) ******** ");

        // adding the above post 2 as the post of testuser2
        await dbLib.createNewPost(db, "testuser2", post2);

        const user2 = await dbLib.getUser(db, "testuser2");
        console.log("user2", user2);
        expect(user2.posts).toContain(-3); // check it the post id is in user's list
    });


    test('test getPost = async (db, postId) ', async () => {
        console.log("******** test getPost = async (db, postId) ******** ");

        const post2Received = await dbLib.getPost(db, -3); // get the post by post id
        expect(post2Received).toEqual(
            expect.objectContaining({
                "id": -3,
                "author": "testuser2",
                "description": "This is the description of a test post.: 'my avatar is like'",
                "date": "10/16/2022",
                "image": commonAvatar,
                "likes": [],
                "comments": []
            })
        );
    });

    test('test updatePost = async (db, postId, newImage, newDescription) ', async () => {
        console.log("******** test updatePost = async (db, postId, newImage, newDescription) ******** ");

        await dbLib.updatePost(db, -3, "test changed image url", "changed post description"); 

        const updatedPost = await dbLib.getPost(db, -3);

        expect(updatedPost.image).toEqual("test changed image url"); 
        expect(updatedPost.description).toEqual("changed post description"); 
    });


    test('test deletePost = async (db, postId) ', async () => {
        console.log("******** test deletePost = async (db, postId) ******** ");

        await dbLib.deletePost(db, -3); // delete the previous post2 on database

        const user2 = await dbLib.getUser(db, "testuser2");
        const allPosts = await dbLib.getPosts(db);

        expect(allPosts).toNotContainObjectPartial({id: "-3"});
        expect(user2.posts).toEqual([]); // check it the post id is in user's list
    });


    ////// test for post's likes ///////

    test('test likePost = async (db, username, postId) ', async () => {
        console.log("******** test likePost = async (db, username, postId) ******** ");

        await dbLib.likePost(db, "testuser2", -2); 

        const updatedPost = await dbLib.getPost(db, -2);

        expect(updatedPost.likes).toContain("testuser2"); 
    });

    test('test unlikePost = async (db, username, postId) ', async () => {
        console.log("******** test unlikePost = async (db, username, postId) ******** ");
        await dbLib.likePost(db, "testuser2", -2); 
        await dbLib.unlikePost(db, "testuser2", -2); 

        const updatedPost = await dbLib.getPost(db, -2);
        expect(updatedPost.likes).not.toContain("testuser2"); 
    });


    ////// test for post's comments ///////

    const testCommentObject = {
        author: "test Comment Author",
        comment: "the content of the comment",
        mention: "@[trump](trump)"
    };

    test('test  addComment = async (db, postId, commentObject)', async () => {
        console.log("******** test addComment = async (db, postId, commentObject) ******** ");

        await dbLib.addComment(db, -2, testCommentObject); 

        const updatedPost = await dbLib.getPost(db, -2);

        expect(updatedPost.comments).toContainObjectPartial({
            author: "test Comment Author",
            comment: "the content of the comment",
            mention: "@[trump](trump)"
        });
    });

    test('test  getComments = async (db, postId)', async () => {
        await dbLib.addComment(db, -2, testCommentObject); 

        //start testing 
        commentsList = await dbLib.getComments(db, -2); 
        expect(commentsList).toContainObjectPartial({
            author: "test Comment Author",
            comment: "the content of the comment",
            mention: "@[trump](trump)"
        });
    });

    test('test  updateComment = async (db, postId, author, oldContent, newContent, newMention)', async () => {
        console.log("******** test updateComment = async (db, postId, author, oldContent, newContent, newMention) ******** ");
        await dbLib.addComment(db, -2, testCommentObject); 

        await dbLib.updateComment(db, -2, "test Comment Author", "the content of the comment", "updated comment content", "@[james](james)"); 

        updatedComments = await dbLib.getComments(db, -2); 

        expect(updatedComments).toContainObjectPartial({
            author: "test Comment Author",
            comment: "updated comment content",
            mention: "@[james](james)"
        });
    });

    test('test deleteComment = async (db, postId, author, content) ', async () => {
        console.log("******** test deleteComment = async (db, postId, author, content) ******** ");
        await dbLib.addComment(db, -2, testCommentObject); 
        const commentsList = await dbLib.getComments(db, -2); 
        expect(commentsList).toContainObjectPartial({
            author: "test Comment Author",
            comment: "the content of the comment",
            mention: "@[trump](trump)"
        });
        
        await dbLib.deleteComment(db, -2, testCommentObject.author, testCommentObject.comment); // delete the comments

        const commentsListDeleted = await dbLib.getComments(db, -2); 
        expect(commentsListDeleted).toNotContainObjectPartial({
            author: "test Comment Author",
            comment: "the content of the comment",
            mention: "@[trump](trump)"
        }); 
    });

    test('test getLastestPostOfAUser = async (db, username) ', async () => {
        console.log("******** test getLastestPostOfAUser = async (db, username) ******** ");
        
        await dbLib.createNewPost(db, "testuser1", post2); // now testuser1 has both two sample post1 and post2

        const latestPost = await dbLib.getLastestPostOfAUser(db, "testuser1"); // the function will return the post with the largest post ID as the lastest 

        expect(latestPost.id).toBe(-2);
        expect(latestPost.author).toBe("testuser1");
    });

    
    ////// restore the database by removing test posts created ///////
    afterEach(async () => {
        try{
            await db.collection('Posts').deleteMany({"id": -2});
            console.log("successfully deletes all test post ");
        }catch(err){
            console.log(err);
        }
    });

});
