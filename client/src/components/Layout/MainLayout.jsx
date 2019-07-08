import React, { Fragment } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

import { Row, Col } from 'reactstrap'

const MainLayout = props => {
    const { children } = props
    
    return (
        <Fragment>
            <Topbar  />
            <Row className="justify-content-center">
                <Col sm={12} md={9}>{children}</Col>
                <Col md={3}>
                    <Sidebar />
                </Col>
            </Row>
            <hr />
            <Footer />
        </Fragment>
    )
}

export default MainLayout
