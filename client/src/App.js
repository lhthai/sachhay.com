import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Container, Row, Col } from 'reactstrap'

import Routes from './Routes'

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Container fluid className="App">
        <Row>
          <Col lg={8} sm={12} className="mx-auto">
            <Routes />
          </Col>
        </Row>
      </Container>
    </Router>

  );
}

export default App;
