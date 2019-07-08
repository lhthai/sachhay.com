import React, { useState, useEffect } from 'react'
import { ListGroup, Alert } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = props => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [signal, setSignal] = useState(true)

    useEffect(() => {
        setSignal(true)
        const fetchCategories = async () => {
            setLoading(true)
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

                const { data } = await axios.post('/graphql', requestBody);
                if (signal) {
                    setLoading(false)
                    setCategories(data.data.categories)
                }
            } catch (error) {
                if (signal) {
                    setLoading(false)
                    setError(error)
                }
            }
        }
        fetchCategories();

        return () => {
            setSignal(false)
        }
    }, [])

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
    return (
        <ListGroup>
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
                            <div className="bg-primary text-white p-2">Thể loại</div>
                            {categories.map(category => {
                                return (
                                    <Link key={category.id} className="list-group-item nav-link text-muted" to={"/category/" + category.category_url} action>{category.name}</Link>
                                )
                            })}
                        </div>
                    )}
        </ListGroup>

    )
}

export default Sidebar
