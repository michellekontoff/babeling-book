export const searchUsers = async (search, setUsers) => {
    if (search.length < 40) {
        const res = await fetch(`/api/users/search/${search}`);
        if (res.ok) {
            const data = await res.json();
            data.users.sort((a, b) => {
                if (a.username < b.username) {
                  return -1;
                }
                if (a.username > b.username) {
                  return 1;
                }
                return 0;
        })
            setUsers(data.users);
            return;
        }
    } else return;
};

export const searchPosts = async (search, setPosts) => {

    const res = await fetch(`/api/posts/search/${search}`)

    if (res.ok) {
        const data = await res.json();
        data.posts.sort((a, b) => {
                if (a.id > b.id) {
                  return -1;
                }
                if (a.id < b.id) {
                  return 1;
                }
                return 0;
        })
        setPosts(data.posts);
    }
    return;
}

export function highlightQuery(query, post, setSubString, setTitle) {
    const title = post.title
    const content = post.content
    //content match
    let queryIndex = content.toLowerCase().indexOf(query.toLowerCase())
    if (queryIndex >= 0) {
        highlightContent(content, query, queryIndex, setSubString)
    }

   //title match
   queryIndex = title?.toLowerCase().indexOf(query.toLowerCase())
   if (title && queryIndex >= 0) {
        highlightTitle(title, query, queryIndex, setTitle)
   }
}

function highlightTitle(title, query, queryIndex, setTitle) {
    let {match, before, after} = sliceSmallQuery(title, query, queryIndex)

    const matchTitle = (
        <>
            {before}
            <span className="query-match">{match}</span>
            {after}
        </>
    )

    setTitle(matchTitle)
}

function highlightContent(content, query, queryIndex, setSubString) {
    
    let queryMatch;
    let beforeQuery;
    let afterQuery;
    let matchContent;

    if (content.length < 300 && query.length < 300) {

        let {match, before, after} = sliceSmallQuery(content, query, queryIndex)

        queryMatch = match;
        beforeQuery = before;
        afterQuery = after;

    } else if (content.length > 300 && query.length < 300) {

        queryMatch = content.slice(queryIndex, queryIndex + query.length)

        beforeQuery = queryIndex - 200 > 0
                      ? '... ' +  content.slice(queryIndex - 200, queryIndex)
                      : content.slice(0, queryIndex)

        afterQuery = queryIndex + query.length + 200 < content.length
                    ? content.slice(queryIndex + query.length, (queryIndex + query.length + 200)) + ' ...'
                    : content.slice(queryIndex + query.length)

    } else if (query.length > 300) {
        matchContent = (<span className="query-match">{queryMatch}</span>)

        setSubString(matchContent)
        return
    }

    matchContent = (
        <>
            {beforeQuery}
            <span className="query-match">{queryMatch}</span>
            {afterQuery}
        </>
    )
    
    setSubString(matchContent)
}

function sliceSmallQuery(string, query, queryIndex) {
    const match = string.slice(queryIndex, queryIndex + query.length)
    const before = string.slice(0, queryIndex)
    const after = string.slice(queryIndex + query.length)

    return {
        match,
        before,
        after
    }
}
