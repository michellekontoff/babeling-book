import React, { useState } from 'react';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function SearchBar () {
    const [search, setSearch] = useState('')
    // const [error, setError]

    // const history = useHistory()


    /* have a controlled input for search term.
        upon hitting search button, perform search fx.
        search fx checks length of term
            if < 40 chars, then make fetch reqs to both users and posts
            if > 40, only fetch to posts
        in backend: users checks usernames
                    posts checks matches in title and content
                    if post matches both title and content, only return it once
    */


    return (
        <form className='search'
        // onSubmit={() => history.push(`/search/${search}`)}
        >
            <input type='text'
            className='search__input'
            value={search}
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
            />
            <Link to={`/search/${search}`}>
                <button type='submit'
                className='search__btn'
                >
                    Search
                </button>
            </Link>
        </form>
    )
}
