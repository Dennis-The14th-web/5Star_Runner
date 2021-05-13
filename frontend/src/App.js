import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Movies from './components/Movies';
import Footer from './components/Footer';
import apiKey from './keys.js';


function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [nominates, setNominates] = useState([]);
  const [btnLimit, setBtnLimit] = useState(false);

//  const [selected, setSelected] = useState([]);
  
  const queryUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

  const handleSearch = (search) => {
   axios(`${queryUrl}&s=${search}`)
   .then(({ data })=>{
    // console.log(data);
    if (data.Search){
    setResults(data.Search)
    }
   });
  }

  useEffect(() => {
    handleSearch(search)
  });

  useEffect(() => {
    const result = JSON.parse(
      localStorage.getItem('Nominees')
    )
    setNominates(result)
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('Nominees', JSON.stringify(items))
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNominates(nominates => `${nominates}<Spinner animation="border" variant="primary" size="sm" />`)
  //   }, 3000);
  //   return () => clearInterval(interval)
  // }, []);

  const addNominees = (movie) => {
    let isNominated = nominates.filter(nomination => nomination.imdbID === movie.imdbID).length !== 0;
    if (nominates.length === 5){
      alert("You have exeeded the numbers of nominations");
    } else{
      if(!isNominated){
        const result = [...nominates, movie];
        setNominates(result);
        saveToLocalStorage(result);
      }
    }
  }



  const handleEnterBtn = (e) => {
    if (e.keyCode === 13) {
        handleSearch()
    }
  };

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
      handleEnter={handleEnterBtn}
      />
      <Movies 
      results={results}
      addNominees={addNominees}
      nominees={nominates}
      removeNominees={removeNominees}
      btnLimit={btnLimit}
      setBtnLimit={setBtnLimit}
      />
      <Footer />
    </div>
  );
}

export default App;

