import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BookView from './BookView';
import AuthorView from './AuthorView';

function App() {
  
  const [tab, setTab] = useState('authors');

  function changeTab(tab) {
    setTab(tab)
  }

  return (
    <div className="App">
      <button onClick={() => changeTab('authors')}>authors</button>
      <button onClick={() => changeTab('books')}>books</button>
      { tab === 'authors' ? <AuthorView></AuthorView> : null }
      { tab === 'books' ? <BookView></BookView> : null }
    </div>
  );
}

export default App;
