import React, { useState } from 'react';
import {
            useHistory, 
            // useLocation
        }
    from 'react-router-dom';

import './search.css'

export default function SearchBar () {
    const [search, setSearch] = useState('')
    const history = useHistory()
    // const location = useLocation()


    // const query = new URLSearchParams(location.search).get('q');

    async function submitSearch(e) {
        e.preventDefault()

        if (search) {
            history.push(`/search?q=${search}`)
        }
    }

    return (
        <form id='search'
        method="GET"
        // action="../search"
        onSubmit={submitSearch}
        >
            <input type='search'
            className='search__input'
            value={search}
            placeholder='Search...'
            name="q"
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit'
            className='search__btn'
            >
                <i className="fas fa-search"></i>
            </button>
        </form>
    )
}
