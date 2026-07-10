import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookShelves from './components/BookShelves';
import Search from './components/Search';

const bookShelves = [
  {
    id: 1,
    title: 'Currently Reading'
  },
  {
    id: 2,
    title: 'Want to Read'
  },
  {
    id: 3,
    title: 'Read'
  }
];

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);  
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'Ender\'s Game',
      authors: ['Orson Scott Card'],
      shelfId: 1,
      imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',  
      }
    }
  ]);

  const onShelfChange = (book, newShelfId) => {
    setBooks((prevBooks) => {
      prevBooks.find((x) => x.id === book.id).shelfId = newShelfId;
      return [...prevBooks];
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={ 
          <BookShelves bookShelves={bookShelves} books={books} onShelfChange={setBooks} />
        }/>
        <Route exact path="/search" element={
          <Search />
        }/>
      </Routes>
    </div>
  );
}

export default App;
