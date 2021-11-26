import { NavLink } from "react-router-dom"

export async function getLanguages(cb) {
    const res = await fetch('/api/languages')

    if (res.ok) {
        const list = await res.json()
        cb(list.languages)

    } else {
        return 'Something went wrong.'
    }
}

export function nextPageLinks(nextPages, query) {

    let links = (
        <nav className="page-links">
            {nextPages.map((pageNum, i) => {
            return <NavLink
                to={`/search?q=${query}&page=${pageNum}`}
                key={i}
                activeClassName="active-page"
                >{pageNum}</NavLink>
            })}
        </nav>
    );

    return links;
}
