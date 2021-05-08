import React from 'react';
import { Container } from 'react-bootstrap';
import './index.css';
import Movies from '../Movies';

function Nominees({ results }) {
    return (
        <div>
            <Container className='container p-3'>
               {
                   results.map(btnNominees => (
                      <Movies key={btnNominees.imdbID}
                      btnNominees={btnNominees}
                      />
                   ))
               }
            </Container>
        </div>
    )
}

export default Nominees
