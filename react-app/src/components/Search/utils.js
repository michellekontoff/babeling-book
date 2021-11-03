export const searchUsers = async (search, setUsers) => {
    if (search.length < 40) {
        const res = await fetch(`/api/users/search/${search}`)
        console.log(res)
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setUsers(data.users)
        }
    } else return;
};

export const searchPosts = async (search, setPosts) => {

    const res = await fetch(`/api/posts/search/${search}`)

    if (res.ok) {
        const data = await res.json()
        console.log(data)
        setPosts(data.posts)
    }
    return
}
