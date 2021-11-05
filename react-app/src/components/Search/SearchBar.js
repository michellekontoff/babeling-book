import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchBar () {
    const [search, setSearch] = useState('')

    const history = useHistory()

    async function submitSearch(e) {
        e.preventDefault()
        history.push(`/search?q=${search}`)
    }

    return (
        <form className='search'
        onSubmit={submitSearch}
        >
            <input type='text'
            className='search__input'
            value={search}
            placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit'
            className='search__btn'
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    )
}
