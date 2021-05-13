import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

function Movies({ results, nominees, addNominees, removeNominees, btnLimit }) {
    return (
        <div>
            <Container className='container p-3'>
                <Row>
                <Col className="container bg-light" lg={5}><h2>Movies</h2>
                <ul >
                {
                    results.map((result, i) => (
                        
                            <li key={result.imdbID}>
                                {result.Title} 
                                ({result.Year}) 
                            <button className="btn btn-success p-0" id="nominees"
                            onClick={()=>addNominees(result)} 
                            >
                            Nominate
                            </button>
                            </li>     
                    ))
                }
                </ul>
                </Col>
                <Col lg={1}></Col>
                <Col className="container bg-light" lg={6}><h2>Nominations</h2>
                <ul >
                {
                    nominees.map((nominee, i) => (
                        
                            <li key={nominee.imdbID}>
                                {nominee.Title} 
                                ({nominee.Year}) 
                            <button className="btn btn-success p-0" id="nominees"
                            onClick={()=>removeNominees(nominee)} 
                            >
                            Remove
                            </button>
                            </li>     
                    ))
                }
                </ul>
                </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default Movies;
