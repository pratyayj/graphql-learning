import React, { useState } from 'react';
import './App.css';
import BookView from './BookView';
import AuthorView from './AuthorView';
import BookForm from './BookForm';

function App() {
  
  const [tab, setTab] = useState('authors');

  // create error state for functional stateless component
  const [errorMessage, setErrorMessage] = useState(null)

  function changeTab(tab) {
    setTab(tab)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div className="App">
      { errorMessage? <p style={{color: "red"}}>{errorMessage}</p> : null }
      <button onClick={() => changeTab('authors')}>authors</button>
      <button onClick={() => changeTab('books')}>books</button>
      <button onClick={() => changeTab('add book')}>add book</button>
      { tab === 'authors' ? <AuthorView setError={notify}></AuthorView> : null }
      { tab === 'books' ? <BookView></BookView> : null }
      { tab === 'add book' ? <BookForm setError={notify}></BookForm> : null }
    </div>
  );
}

export default App;
