import React, { useState } from 'react';

export default function SearchBar () {
    const [search, setSearch] = useState('')
    /* have a controlled input for search term.
        upon hitting search button, perform search fx.
        search fx checks length of term
            if < 40 chars, then make fetch reqs to both users and posts
            if > 40, only fetch to posts
        in backend: users checks usernames
                    posts checks matches in title and content
                    if post matches both title and content, only return it once
    */

    async function submitSearch () {
        console.log('search me btich', search)
    }

    

    return (
        <div className='search'>
            <input type='text'
            className='search__input'
            value={search}
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type='button'
            className='search__btn'
            onClick={submitSearch}
            >
                Search
            </button>
        </div>
    )
}
