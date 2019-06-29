import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import categoryReducer from '../reducers/categoryReducer'
import { FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS } from '../reducers/action_types'

import MainLayout from '../components/Layout/MainLayout'
import PaginationComponent from '../components/PaginationComponent';

import { CardBody, CardImg, CardTitle, Alert } from 'reactstrap'

const initialState = {
    loading: true,
    category: {},
    error: null
}

const CategoryDetail = props => {
    const [books, setBooks] = useState([])
    const [signal, setSignal] = useState(true)
    const [state, dispatch] = useReducer(categoryReducer, initialState)

    const { category_url, pageNo } = props.match.params;

    const fetchCategory = async () => {
        dispatch({ type: FETCH_CATEGORY_REQUEST })
        try {
            const requestBody = {
                query: `
                    query{
                        categoryByCategoryUrl(category_url:"${category_url}", page: ${pageNo ? pageNo : 1}){
                            id
                            name
                            description
                            category_url
                            count
                            books{
                              id
                              title
                              book_url
                              thumbnail
                            }
                          }
                    }
                  `
            };

            const { data } = await axios.post('/graphql', requestBody);
            if (signal) {
                dispatch({
                    type: FETCH_CATEGORY_SUCCESS,
                    payload: data.data.categoryByCategoryUrl
                })
                setBooks(data.data.categoryByCategoryUrl.books)
            }
        } catch (error) {
            if (signal) {
                dispatch({
                    type: FETCH_CATEGORY_FAILURE,
                    error: error
                })
            }
        }
    }


    useEffect(() => {
        setSignal(true)
        fetchCategory();

        return () => {
            setSignal(false)
        }
    }, [category_url, pageNo])

    const { category, loading, error } = state

    return (
        <MainLayout>
            {loading && !error ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : error ? (
                <Alert color="danger">
                    <h4 className="alert-heading">There are some errors!</h4>
                </Alert>
            ) : (
                        <div className="container col-md-12">
                            <div className="row bg-primary text-white p-2">{category.name}</div>
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
                            <div className="row">
                                <PaginationComponent count={category.count} url={"/category/" + category.category_url + "/"} currentPage={pageNo} />
                            </div>

                        </div>
                    )}
        </MainLayout>
    )
}

export default CategoryDetail
