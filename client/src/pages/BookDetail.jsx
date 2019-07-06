import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faStar } from '@fortawesome/free-solid-svg-icons'

import MainLayout from '../components/Layout/MainLayout'

import { Alert, Col, Card, CardText, CardTitle, Button } from 'reactstrap'

const BookDetail = props => {
    const [book, setBook] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [signal, setSignal] = useState(true)
    const [category, setCategory] = useState({})
    const { book_url } = props.match.params;

    const updateViewsCount = async (bookId, viewsCount) => {
        try {
            const requestBody = {
                query: `
                    query{
                        updateBook(id:"${bookId}", views: "${viewsCount}"){
                            id
                            title
                            author
                            thumbnail
                            views
                            book_url
                            download_epub
                            download_mobi
                            download_pdf
                            category{
                                id
                                name
                                category_url
                            }                         
                          }
                    }
                  `
            };

            const { data } = await axios.post('/graphql', requestBody);
            if (signal) {
                setLoading(false)
                setBook(data.data.bookByBookUrl)
                setCategory(data.data.bookByBookUrl.category)
            }
        } catch (error) {
            if (signal) {
                setLoading(false)
                setError(error)
            }
        }
    }

    useEffect(() => {
        setSignal(true)
        const fetchBook = async () => {
            setLoading(true)
            try {
                const requestBody = {
                    query: `
                        query{
                            bookByBookUrl(book_url:"${book_url}"){
                                id
                                title
                                author
                                thumbnail
                                views
                                book_url
                                download_epub
                                download_mobi
                                download_pdf
                                category{
                                    id
                                    name
                                    category_url
                                }                         
                              }
                        }
                      `
                };

                const { data } = await axios.post('/graphql', requestBody);
                if (signal) {
                    setLoading(false)
                    setBook(data.data.bookByBookUrl)
                    setCategory(data.data.bookByBookUrl.category)
                }
            } catch (error) {
                if (signal) {
                    setLoading(false)
                    setError(error)
                }
            }
        }
        fetchBook()

        return () => {
            setSignal(false)
        }
    }, [])

    return (
        <MainLayout>
            <div className="container border border-dark p-4">
                <div className="row">
                    <Col lg={4}>
                        <img className="w-100" src={book.thumbnail} alt={book.title} />
                    </Col>
                    <Col lg={8}>
                        <Card body className="border-0">
                            <CardTitle><Link to={"/ebook/" + book.book_url}>{book.title}</Link></CardTitle>
                            <CardText>Tác giả: {book.author}</CardText>
                            <CardText>Thể loại: <Link to={"/category/" + category.category_url}>{category.name}</Link></CardText>
                            <CardText>Lượt xem: {book.views}</CardText>
                            <Alert color="primary">
                                <FontAwesomeIcon icon={faDownload} /> Vui lòng chọn định dạng file để tải hoặc đọc online.
                            </Alert>
                            <CardText>
                                {book.download_epub ? (
                                    <a className="mr-2" href={book.download_epub}>
                                        <Button color="primary">EPUB</Button>
                                    </a>
                                ) : null}
                                {book.download_mobi ? (
                                    <a className="mr-2" href={book.download_mobi}>
                                        <Button color="success">MOBI</Button>
                                    </a>
                                ) : null}
                                {book.download_pdf ? (
                                    <a className="mr-2" href={book.download_pdf}>
                                        <Button color="danger">PDF</Button>
                                    </a>
                                ) : null}
                                <a className="mr-2" href="https://sachvui.com/download/epub/5948">
                                    <Button color="warning" className="text-white"><FontAwesomeIcon icon={faStar} />Đọc online</Button>
                                </a>
                            </CardText>

                        </Card>

                    </Col>
                </div>

            </div>
        </MainLayout>
    )
}

export default BookDetail
