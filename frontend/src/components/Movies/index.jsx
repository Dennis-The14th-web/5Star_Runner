import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import './index.css';

function Movies({ results, nominees, addNominees, removeNominees, btnLimit, setBtnLimit }) {
    return (
        <div>
            <Container className='container p-3'>
                <Row>
                <Col className="container bg-light" lg={5}><h2>Movies</h2><hr/>
                <ul >
                {
                    !results?.length ? 
                    <Spinner animation="border" variant="primary" size="sm" /> 
                    :(
                    results.map((result, id) => (
                        
                            <li className="movie-list m-2"
                            key={result.imdbID}>
                                {result.Title} 
                                ({result.Year}) 
                            
                            <button className="btn btn-success p-0" id="nominees" 
                            // disabled={!btnLimit ? true : false}
                            onClick={()=>addNominees(result)} 
                            >
                            Nominate
                            </button>
                            </li>           
                    )))
                }
                </ul>
                </Col>
                <Col lg={1}></Col>
                <Col className="container bg-light" lg={6}><h2>Nominations</h2><hr/>
                <ul >
                {
                    nominees.map((nominee, i) => (
                            <li className="nomination-list m-2"
                            key={nominee.imdbID}>
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
