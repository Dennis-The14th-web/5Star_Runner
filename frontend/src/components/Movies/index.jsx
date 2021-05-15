import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Movies(props) {
    return (
        <div>
            <Container className='container p-3'>
                // TODO create another child component for Modal. Also add more animation
                <Modal 
                        isOpen={ props.modalView }
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                >
                    <ModalHeader className="modalHeader">
                       CONGRATULATIONS!!!
                    </ModalHeader>
                    <ModalBody id="modal-body">You have successfully made 5 nominations.</ModalBody>
                    <ModalFooter>
                    <Button 
                    onClick={props.toggle}
                    color="danger"
                    >
                    Close</Button>
                    </ModalFooter>
                </Modal>

                <Row>
                <Col className="container bg-light" lg={5}><h2>{
                    !props.search?.length ? 
                    <Spinner animation="border" variant="secondary" size="sm" /> 
                    :
                    `Results for "${props.search}"`
                    }
                    </h2><hr/>
                <ul >
                {
                    !props.results?.length ? 
                    <Spinner animation="grow" variant="primary" size="sm" /> 
                    :(
                    props.results.map((result, i) => (
                        
                            <li className="movie-list m-2"
                            key={i}>
                                {result.Title} 
                                ({result.Year}) 
                            
                            <button className="btn btn-success p-0" id="nominees" 
                            disabled={props.btnLimit(result)}
                            onClick={()=>props.addNominees(result)} 
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
                    !props.nominees?.length ?
                    <Spinner animation="grow" variant="warning" size="sm" /> 
                    :(
                    props.nominees.map((nominee, i) => 
                        (
                            <li className="nomination-list m-2"
                            key={nominee.imdbID}>
                                {nominee.Title} 
                                ({nominee.Year}) 
                            <button className="btn btn-danger p-0" id="nominees"
                            onClick={()=>props.removeNominees(nominee)} 
                            >
                            Remove
                            </button>
                            </li>     
                        )
                    )
                    )
                }
                </ul>
                </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default Movies;
