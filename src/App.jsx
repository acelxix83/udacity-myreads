import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Bookshelves from './components/bookshelves';
import Search from './components/search';
import BookDetails from './components/bookdetails';
import Modal from './components/modal';
import * as BooksAPI from './booksapi';

const bookshelves = [
  {
    id: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    id: 'wantToRead',
    title: 'Want to Read'
  },
  {
    id: 'read',
    title: 'Read'
  }
];

/**
 * Main application component for managing book shelves and book details. 
 * @returns {JSX.Element} The rendered application component.
 */
function App() {  
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []); 

  const [books, setBooks] = useState([]);
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
    BooksAPI.update(book, newShelfId).then(() => {
      setBooks((prevBooks) => {
        const existingBook = prevBooks.find((x) => x.id === book.id);
        if (!existingBook) {
          book.shelf = newShelfId;
          prevBooks.push(book);
        } else {
          existingBook.shelf = newShelfId;
        }
        return [...prevBooks];
      });
    });
  };

  return (
    <div className="app">
      {selectedBook &&
        <Modal isOpen={!!selectedBook} onClose={closeModal}>
          <BookDetails book={selectedBook} onClose={closeModal} onShelfChange={onShelfChange} />
        </Modal>
      }
      <Routes>
        <Route exact path="/" element={
          <Bookshelves bookshelves={bookshelves} books={books} onShelfChange={onShelfChange} openModal={openModal} />
        } />
        <Route exact path="/search" element={
          <Search books={books} onShelfChange={onShelfChange} openModal={openModal} />
        } />
      </Routes>
    </div>
  );
}

export default App;