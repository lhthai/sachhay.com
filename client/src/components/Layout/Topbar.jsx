import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Alert, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import categoryReducer from '../../reducers/categoryReducer'
import { FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS } from '../../reducers/action_types'
import Search from './Search';

const initialState = {
    loading: true,
    categories: [],
    error: null
}

const Topbar = props => {
    const [isOpen, setIsOpen] = useState(false)
    const [signal, setSignal] = useState(true)
    const [state, dispatch] = useReducer(categoryReducer, initialState)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

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

            const { data } = await axios.post('/graphql', requestBody);
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

    useEffect(() => {
        setSignal(true)
        fetchCategories();

        return () => {
            setSignal(false)
        }
    }, [])

    const { categories } = state

    return (
        <div>
            <Navbar color="light" light expand="md" className="p-3">
                <Link to="/" className="nav-link h2">sachhay.com</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mx-auto" navbar>
                        <NavItem className="mx-4">
                            <Link className="nav-link" to="/">Trang chủ</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className="mx-4">
                            <DropdownToggle nav caret>
                                Thể loại
                            </DropdownToggle>
                            <DropdownMenu right>
                                {categories.map((category, index) => {
                                    return (
                                        <DropdownItem key={index}><Link to={"/category/" + category.category_url} className="nav-link text-dark p-0">{category.name}</Link></DropdownItem>
                                    )
                                })}

                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar className="mx-4">
                            <DropdownToggle nav caret>
                                Thông tin
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem><Link to="/about-us" className="nav-link text-dark p-0">Lời nói đầu</Link></DropdownItem>
                                <DropdownItem><Link to="/copyright" className="nav-link text-dark p-0">Bản quyền</Link></DropdownItem>
                                <DropdownItem><Link to="/contact" className="nav-link text-dark p-0">Liên hệ</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><Link to="/donate" className="nav-link text-dark p-0">Ủng hộ</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><Link to="/report" className="nav-link text-dark p-0">Báo cáo vi phạm</Link></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Search />
                </Collapse>
            </Navbar>
            <hr />
            <Alert color="success">
                <strong>NÊN</strong> chia sẻ, <strong>KHÔNG NÊN</strong> thương mại hóa
            </Alert>
        </div>
    )
}

export default Topbar
