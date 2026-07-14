import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Bookshelves from './components/bookshelves';
import Search from './components/search';
import BookDetails from './components/bookdetails';
import Modal from './components/modal';

const bookshelves = [
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

/**
 * Main application component for managing book shelves and book details. 
 * @returns {JSX.Element} The rendered application component.
 */
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

  /**
   * Handles the change of a book's shelf.  If the book is not already in the collection, it will be added to the specified shelf.
   * @param {any} book - The book object whose shelf is being changed.  
   * @param {any} newShelfId - The new shelf ID to which the book is being moved. If null, the book will be removed from the collection.
   */ 
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

  /**
   * Handles the update of a book's rating.  If the bookshelf is not already in the collection, it will be added to the "Read" shelf by default.
   * @param {any} book - The book object whose rating is being updated.
   * @param {any} newRating - The new rating value for the book.
   */
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
          <Bookshelves bookshelves={bookshelves} books={books} onShelfChange={onShelfChange} openModal={openModal} onRatingUpdate={onRatingUpdate} />
        } />
        <Route exact path="/search" element={
          <Search books={books} onShelfChange={onShelfChange} openModal={openModal} onRatingUpdate={onRatingUpdate} />
        } />
      </Routes>
    </div>
  );
}

export default App;