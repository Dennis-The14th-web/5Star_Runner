import { React, useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Movies from './components/Movies';
import Footer from './components/Footer';
import apiKey from './keys.js';


function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  // const [btnLimit, setBtnLimit] = useState([]);
  const [modalView, setModalView] = useState(false);
  
  const queryUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

  const handleSearch = async(search) => {
   const response = await fetch(`${queryUrl}&s=${search}`)
   const data = await response.json()
  //  .then(({ data })=>{
    if (data.Search){
    setResults(data.Search)
    }
  //  });
  }

  useEffect(() => {
    handleSearch(search)
  });

  useEffect(() => {
    const result = JSON.parse(
      localStorage.getItem('Nominees')
    )
    setSelected(result)
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('Nominees', JSON.stringify(items))
  }

  const handleAddNominees = (movie) => {
    let isNominated = selected.filter(nomination => nomination.imdbID === movie.imdbID).length !== 0;
    console.log("isNominated: ", isNominated);
    if (selected.length === 5){
      setModalView(true);
    } else{
      if(!isNominated){
        const result = [...selected, movie];
        console.log("result", result);
        setSelected(result);
        saveToLocalStorage(result);
      }
    }
    if (selected.length === 3){
      alert("Awesome! You're almost there 🙂")
    } else if (selected.length === 4){
      alert("Way to go!! Y🤩U're about to officially become a super⭐!!")
    }
  }

  const handleModalToggle = () => {
    setModalView(false);
  }

  const handleEnterBtn = (e) => {
    if (e.keyCode === 13) {
        handleSearch()
    }
  };

  const removeNominees = (movie) => {
    const result = selected.filter(
      nominate => nominate.imdbID !== movie.imdbID 
     );
    setSelected(result);
    saveToLocalStorage(result);
    if (selected.length === 1){
      alert("Go ahead and select new nominees! 🤩")
    }
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
      search={search}
      results={results}
      addNominees={handleAddNominees}
      nominees={selected}
      removeNominees={removeNominees}
      modalView={modalView}
      toggle={handleModalToggle}
      // btnLimit={btnLimit}
      // setBtnLimit={setBtnLimit}
      />
      <Footer />
    </div>
  );
}

export default App;

