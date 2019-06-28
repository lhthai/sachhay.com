import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ history }) => {
    const [query, setQuery] = useState('')

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        history.push(`/search/${query}`);
    }

    return (
        <form className="navbar-right form-inline" onSubmit={handleSubmit}>
            <input className="form-control" type="text" placeholder="Search book" value={query} onChange={handleChange} />
            <button className="btn btn-primary my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
        </form>
    )
}

export default withRouter(Search)
