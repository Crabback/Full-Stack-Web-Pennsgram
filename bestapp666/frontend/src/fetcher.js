
const getUsers = async () => {
    var res = await fetch(`localhost:8080/users`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getUsers
}