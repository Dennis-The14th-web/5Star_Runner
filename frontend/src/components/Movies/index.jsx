import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

function Movies() {
    return (
        <div>
            <Container className='portfolio-container section-container p-3'>
                <Row>
                <Col lg={4}></Col>
                <Col lg={4}></Col>
                <Col lg={4}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movies
