
const getUsers = async () => {
    var res = await fetch(`localhost:8080/users`, {
        method: 'GET',
    })
    return res.json()
}


const getUser = async (username) => {
    var res = await fetch(`localhost:8080/user/${username}`, {
        method: 'GET',
    })
    return res.json()
}

const creatNewUser = async (userObject) => {
    var res = await fetch(`localhost:8080/user/`, {
        method: 'POST',
        body: JSON.stringify(userObject)
        //body: userObject
    })
    return res.json()
}

const followUser = async (username1, username2) => {
    var res = await fetch(`localhost:8080/follow`, {
        method: 'PUT',
        body: JSON.stringify({"username1": username1, "username2": username2})
    })
    return res.json()
}

const unfollowUser = async (username1, username2) => {
    var res = await fetch(`localhost:8080/unfollow`, {
        method: 'PUT',
        body: JSON.stringify({"username1": username1, "username2": username2})
    })
    return res.json()
}

const getPosts = async () => {
    var res = await fetch(`localhost:8080/posts`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getUsers,
    getUser,
    creatNewUser,
    followUser,
    unfollowUser,
    getPosts
}