const dbLib = require('../dbFunctions'); 
const serverLib = require('../server');

let db;

// cleanup the database after each test: remove the all created test users
const clearDatabase = async (db) => {
    try {
        const result1 = await db.collection('Users').deleteOne({ "username": "testuser1" });
        const result2 = await db.collection('Users').deleteOne({ "username": "testuser2" });
        const { deletedCount } = result1.deletedCount + result2.deletedCount;
        console.log("result 1 and 2: ", result1, result2);
        if (deletedCount === 2) {
            console.log('info', 'Successfully deleted all test users');
        } else if(result1.deletedCount !== 1){
            console.log('warning', 'testuser1 was not deleted');
        } else if(result2.deletedCount !== 1){
            console.log('warning', 'testuser2 was not deleted');
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

describe('Database operations tests', () => {
    // test data
    const testUser1 = {
        id: -2 , 
        username: "testuser1",
        password: "test123",
        followings: [],
        followers: [],
        avater: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1566px-Test-Logo.svg.png",
        post: [],
        followerSuggestions: []
    };

    const testUser2 = {
        id: -3 , 
        username: "testuser2",
        password: "test123",
        followings: [],
        followers: [],
        avater: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1566px-Test-Logo.svg.png",
        post: [],
        followerSuggestions: []
    };

    test('test createNewUser()', async () => {
        db = await dbLib.connect(serverLib.url);
        await dbLib.createNewUser(db, testUser1);
        await dbLib.createNewUser(db, testUser2);
        // find new user in the DB
        const insertedUser = await db.collection('Users').findOne({ username: "testuser1" });
        expect(insertedUser.username).toEqual('testuser1');

        const insertedUser2 = await db.collection('Users').findOne({ username: "testuser2" });
        expect(insertedUser2.username).toEqual('testuser2');
    });

    // test('addPlayer exception', async () => {
    //   db = await dbLib.connect(serverLib.url);
    //   try{
    //     await dbLib.addPlayer(db, testPlayer)
    //   } catch(err){
    //     expect(err.message).toBe('Error executing the query');
    //   }
    // });
});