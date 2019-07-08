import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home'
import CategoryDetail from './pages/CategoryDetail'
import BookDetail from './pages/BookDetail'
import AboutUs from './pages/AboutUs'
import Copyright from './pages/Copyright'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import Report from './pages/Report'
import SearchResults from './pages/SearchResults'

const Routes = props => {
    return (
        <Switch>
            <Route component={Home} exact path="/" />
            <Route component={CategoryDetail} exact path="/category/:category_url" />
            <Route component={CategoryDetail} path="/category/:category_url/:pageNo" />
            <Route component={BookDetail} exact path="/ebook/:book_url" />
            <Route component={AboutUs} exact path="/about-us" />
            <Route component={Copyright} exact path="/copyright" />
            <Route component={Contact} exact path="/contact" />
            <Route component={Donate} exact path="/donate" />
            <Route component={Report} exact path="/report" />
            <Route component={SearchResults} exact path="/search/:query" />
        </Switch>
    )
}

export default Routes
