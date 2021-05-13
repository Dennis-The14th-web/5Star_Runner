import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Movies from './components/Movies';
import Footer from './components/Footer';
// import MoviesHeading from './components/MoviesHeading';
// import Nominate from './components/Nominate';
import apiKey from './keys.js';


function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [nominates, setNominates] = useState([]);
  // const [btnLimit, setBtnLimit] = useState([]);

//  const [selected, setSelected] = useState([]);
  
  const queryUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

  const handleSearch = (search) => {
   axios(`${queryUrl}&s=${search}`)
   .then(({ data })=>{
    console.log(data);
    if (data.Search){
    setResults(data.Search)
    }
   });
  }

  useEffect(() => {
    handleSearch(search)
  }, [search]);

  useEffect(() => {
    const result = JSON.parse(
      localStorage.getItem('Nominees')
    )
    setNominates(result)
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('Nominees', JSON.stringify(items))
  }

  const addNominees = (movie) => {
    console.log(" Just got clicked ");
   const result = [...nominates, movie]
  //  const display = [...state.btnLimit, movie]
  //  console.log(result);
    setNominates(result)
    saveToLocalStorage(result)
  }

  const removeNominees = (movie) => {
    const result = nominates.filter(
      nominate => nominate.imdbID !== movie.imdbID 
     );
    setNominates(result);
    saveToLocalStorage(result);
  }

  return (
    <div className="App">
      <Search
      search={search}
      handleInput={setSearch}
      handleSearch={handleSearch}
      />
      <Movies 
      results={results}
      // Nominate={Nominate}
      addNominees={addNominees}
      nominees={nominates}
      removeNominees={removeNominees}
      // btnLimit={state.btnLimit}
      />
      <Footer />
    </div>
  );
}

export default App;

