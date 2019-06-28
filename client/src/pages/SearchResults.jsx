import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText, CardBody, CardImg, CardTitle, Alert } from 'reactstrap'

import axios from 'axios'
import bookReducer from '../reducers/bookReducer'
import { SEARCH_BOOKS_FAILURE, SEARCH_BOOKS_REQUEST, SEARCH_BOOKS_SUCCESS } from '../reducers/action_types'

import Search from '../components/Layout/Search'
import MainLayout from '../components/Layout/MainLayout'

const initialState = {
    loading: true,
    error: null,
    books: []
}

const SearchResults = props => {
    const [state, dispatch] = useReducer(bookReducer, initialState)
    const [signal, setSignal] = useState(true)
    const { query } = props.match.params

    useEffect(() => {
        setSignal(true)
        const search = async () => {
            dispatch({ type: SEARCH_BOOKS_REQUEST })
            try {
                const requestBody = {
                    query: `
                        query{
                            searchBooks(query:"${query}", page:1){
                                id
                                title
                                author
                                thumbnail
                                views
                                book_url
                                category{
                                  id
                                  name
                                  category_url
                                }
                              }
                        }
                      `
                };

                const { data } = await axios.post('http://localhost:8000/graphql', requestBody);
                if (signal) {
                    dispatch({
                        type: SEARCH_BOOKS_SUCCESS,
                        payload: data.data.searchBooks
                    })
                }
            } catch (error) {
                if (signal) {
                    dispatch({
                        type: SEARCH_BOOKS_FAILURE,
                        error: error
                    })
                }
            }
        }
        search();
        return () => {
            setSignal(false)
        }
    }, [query])

    const { books, loading, error } = state

    if (loading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    if (error) {
        return (
            <Alert color="danger">
                <h4 className="alert-heading">There are some errors!</h4>
            </Alert>
        )
    }
    if (books.length > 0) {
        return (
            <MainLayout>
                <div className="container col-sm-12">
                    <div className="row bg-primary text-white p-2">Kết quả tìm kiếm: {query}</div>
                    <div className="row">
                        {books.map(book => {
                            return (
                                <Link key={book.id} to={"/ebook/" + book.book_url} className="card text-decoration-none text-muted border-0 col-lg-3 col-md-4 col-sm-6 text-center">
                                    <CardBody className="px-0">
                                        <CardImg top className="rounded" style={{ height: '250px', width: '170px', objectFit: 'cover' }} src={book.thumbnail} alt={book.title} />
                                        <CardTitle>{book.title}</CardTitle>
                                    </CardBody>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </MainLayout>
        )
    } else {
        return (
            <MainLayout>
                <div className="container col-sm-12">
                    <div className="row bg-primary text-white p-2">Kết quả tìm kiếm: {query}</div>
                    <div className="row mt-2 p-2">
                        <Card>
                            <CardBody>
                                <CardText>Không tìm thấy ! Bạn vui lòng thử với từ khóa khác.</CardText>
                                <Search />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        )

    }
}

export default SearchResults
