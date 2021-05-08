import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

function Movies({ results, handleClick, selected }) {
    return (
        <div>
            <Container className='container p-3'>
                <Row>
                <Col className="container bg-light" lg={5}><h2>Movies</h2>
                {
                    results.map(result => (
                        <ul key={result.imdbID}>
                            <li>{result.Title} 
                                ({result.Year}) 
                            <button className="btn btn-success p-0" id="nominees"
                            onClick={handleClick}
                            >
                            Nominate</button>
                            </li>     
                        </ul>
                    ))
                }
                </Col>
                <Col lg={1}></Col>
                <Col className="container bg-light" lg={6}><h2>Nominations</h2>
                {
                    selected.map(select => (
                        <ul key={select.imdbID}>
                            <li>
                                {select.Title}
                                ({select.Year})
                            <button className="btn btn-danger p-0" id="hide"
                            // onClick={handleClick}
                            >
                            Remove</button>
                            </li> 
                        </ul>
                    ))
                }
                </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default Movies
