import { React, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Movies from './components/Movies';
import Footer from './components/Footer';
import apiKey from './keys.js';


function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: []
  })
  const queryUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

  const handleSearch = () => {
   axios(`${queryUrl}&s=${state.search}`)
   .then(({ data })=>{
    console.log(data);
    let result = data.Search;
    setState(prvState => {
      return { ...prvState, results:result }
    })
   });
   
  }

  const handleInput = (event) => {
    let search = event.target.value;
    setState(prvState=>{
      return {...prvState, search: search}
    })
    console.log(search);
  }

  const handleClick = () => {
    console.log(" Just got clicked ");
    let result = state.results;
    setState(prvState => {
      return { ...prvState, selected:result}
    })
  }

  return (
    <div className="App">
      <Search
      search={state.search}
      handleInput={handleInput}
      handleSearch={handleSearch}
      />
      <Movies 
      results={state.results}
      handleClick={handleClick}
      selected={state.selected}
      />
      <Footer />
    </div>
  );
}

export default App;

