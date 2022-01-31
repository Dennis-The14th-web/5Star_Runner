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
  const [selected, setSelected] = useState([]);
  const [modalView, setModalView] = useState(false);
  const [isNominated, setIsNominated] = useState(false);
  
  const queryUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
  // console.log(queryUrl)

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
  });

  // useEffect(() => {
  //   handleAddNominees(results)
  // }, []);

  useEffect(() => {
    const result = JSON.parse(
      localStorage.getItem('Nominees')
    )
    setSelected(result)
  }, []);

  useEffect(() => {
    if (selected.length === 5) {
      setIsNominated(true);
      setModalView(true);
      return;
    }
    setIsNominated(false)
  }, [selected]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('Nominees', JSON.stringify(items))
  }

  const handleAddNominees = (movie) => {
    // TODO Add modal display || animation for individual click event 
      if (selected.length === 2){
        alert("Awesome! You're almost there 🙂")
      } else if (selected.length === 3){
        alert("Way to go!! Y🤩U're about to officially become a super⭐!!")
      }
      if(!isNominated){
        setSelected([...selected, movie]);
        saveToLocalStorage([...selected, movie]);
        return;
      }
  }
  

  const handleDisableBtn = (movie) => {
    return selected.some(select => select.imdbID === movie.imdbID);
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
      btnLimit={handleDisableBtn}
      />
      <Footer />
    </div>
  );
}

export default App;

