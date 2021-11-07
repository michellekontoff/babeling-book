export const searchUsers = async (search, setUsers) => {
    if (search.length < 40) {
        const res = await fetch(`/api/users/search/${search}`);
        if (res.ok) {
            const data = await res.json();
            setUsers(data.users);
            return;
        }
    } else return;
};

export const searchPosts = async (search, setPosts) => {

    const res = await fetch(`/api/posts/search/${search}`)

    if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
    }
    return;
}

export function highlightQuery(query, post, setSubString) {
    // const title = post.title
    const content = post.content
    //content match
   if (query) {
        const queryIndex = content.toLowerCase().indexOf(query.toLowerCase())

        let queryMatch;
        let beforeQuery;
        let afterQuery;
        let matchFound;

        if (content.length < 300 && query.length < 300) {

            queryMatch = content.slice(queryIndex, queryIndex + query.length)
            beforeQuery = content.slice(0, queryIndex)
            afterQuery = content.slice(queryIndex + query.length)

        } else if (content.length > 300 && query.length < 300) {

            queryMatch = content.slice(queryIndex, queryIndex + query.length)

            beforeQuery = queryIndex - 200 > 0
                          ? '... ' +  content.slice(queryIndex - 200, queryIndex)
                          : content.slice(0, queryIndex)

            afterQuery = queryIndex + query.length + 200 < content.length
                        ? content.slice(queryIndex + query.length, (queryIndex + query.length + 200)) + ' ...'
                        : content.slice(queryIndex + query.length)

        } else if (query.length > 300) {
            matchFound = (<span className="query-match">{queryMatch}</span>)

            setSubString(matchFound)
            return
        }

        matchFound = (
            <>
                {beforeQuery}
                <span className="query-match">{queryMatch}</span>
                {afterQuery}
            </>
        )
        
        setSubString(matchFound)
   }

   //title match
}
