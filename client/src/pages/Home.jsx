import React, { useState, useEffect, useReducer } from 'react'
import Topbar from '../components/Layout/Topbar'
import Footer from '../components/Layout/Footer'
import axios from 'axios'

import categoryReducer from '../reducers/categoryReducer'
import { FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_REQUEST } from '../reducers/action_types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { Jumbotron, Alert, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'

const initialState = {
    loading: true,
    categories: [],
    error: null
}

const Home = props => {
    const [signal, setSignal] = useState(true)
    const [state, dispatch] = useReducer(categoryReducer, initialState)

    useEffect(() => {
        setSignal(true)
        const fetchCategories = async () => {
            dispatch({ type: FETCH_CATEGORIES_REQUEST })
            try {
                const requestBody = {
                    query: `
                        query{
                          categories{
                            id
                            name
                            description
                            category_url
                            books {
                                id
                                title
                            }                
                          }
                        }
                      `
                };

                const { data } = await axios.post('http://localhost:8000/graphql', requestBody);
                if (signal) {
                    dispatch({
                        type: FETCH_CATEGORIES_SUCCESS,
                        payload: data.data.categories
                    })
                }
            } catch (error) {
                if (signal) {
                    dispatch({
                        type: FETCH_CATEGORIES_FAILURE,
                        error: error
                    })
                }
            }
        }
        fetchCategories();
        return () => {
            setSignal(false)
        }
    }, [])

    const { categories, loading, error } = state

    return (
        <div>
            <Topbar />
            <Row>
                <Col lg={12}>
                    <Jumbotron className="text-center">
                        {loading && !error ? (
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : error ? (
                            <Alert color="danger">
                                <h4 className="alert-heading">There are some errors!</h4>
                            </Alert>
                        ) : (
                                    <div>
                                        <h2>Thư Viện Ebook Miễn Phí</h2>
                                        <p className="lead">
                                            Thư viện sachhay.com là dự án phi lợi nhuận, nhằm mục đích chia sẻ sách và đọc truyện online miễn phí vì cộng đồng.
                                    </p>
                                        <hr />
                                        <ListGroup className="row justify-content-center list-group-horizontal">
                                            {categories.map(category => {
                                                return (
                                                    <ListGroupItem key={category.id} tag="a" href={"/category/" + category.category_url} action className="d-inline text-left p-2 m-2 col-lg-3"><FontAwesomeIcon icon={faFolderOpen} /> {category.name}</ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </div>
                                )}
                    </Jumbotron>
                </Col>
            </Row>
            <hr />
            <Footer />
        </div>
    )
}

export default Home
