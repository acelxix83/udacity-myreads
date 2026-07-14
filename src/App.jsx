import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookShelves from './components/BookShelves';
import Search from './components/Search';
import BookDetails from './components/BookDetails';
import Modal from './components/Modal';

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
  const getBooksFromLocalStorage = () => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  }

  const [books, setBooks] = useState(getBooksFromLocalStorage);
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => {
    setSelectedBook(book);
  }

  const closeModal = () => {
    setSelectedBook(null);
  };

  const onShelfChange = (book, newShelfId) => {
    setBooks((prevBooks) => {
      if (newShelfId === null) {
        prevBooks = prevBooks.filter((x) => x.id !== book.id);
      } else {
        const existingBook = prevBooks.find((x) => x.id === book.id);
        if (!existingBook) {
          book.shelfId = newShelfId;
          prevBooks.push(book);
        } else {
          existingBook.shelfId = newShelfId;
        }
      }
      localStorage.setItem('books', JSON.stringify(prevBooks));
      return [...prevBooks];
    });
  };

  const onRatingUpdate = (book, newRating) => {
    setBooks((prevBooks) => {
      const existingBook = prevBooks.find((x) => x.id === book.id);
      if (!existingBook) {
        book.userRating = newRating;
        book.shelfId = 3; // Default to "Read" shelf
        prevBooks.push(book);
      }
      else {
        existingBook.userRating = newRating;
        existingBook.shelfId = book.shelfId || 3; // Default to "Read" shelf if not already assigned
      }
      localStorage.setItem('books', JSON.stringify(prevBooks));
      return [...prevBooks];
    });
  };

  return (
    <div className="app">
      {selectedBook &&
        <Modal isOpen={!!selectedBook} onClose={closeModal}>
          <BookDetails book={selectedBook} onClose={closeModal} onShelfChange={onShelfChange} onRatingUpdate={onRatingUpdate} />
        </Modal>
      }
      <Routes>
        <Route exact path="/" element={
          <BookShelves bookShelves={bookShelves} books={books} onShelfChange={onShelfChange} openModal={openModal} onRatingUpdate={onRatingUpdate} />
        } />
        <Route exact path="/search" element={
          <Search books={books} onShelfChange={onShelfChange} openModal={openModal} onRatingUpdate={onRatingUpdate} />
        } />
      </Routes>
    </div>
  );
}

export default App;