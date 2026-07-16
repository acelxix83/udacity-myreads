import './App.css';
import { useState, useEffect, useCallback } from 'react';
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
  const [selectedBookId, setSelectedBookId] = useState(null);

  const openModal = useCallback((bookId) => {
    setSelectedBookId(bookId);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedBookId(null);
  }, []);

  /**
   * Handles the change of a book's shelf.  If the book is not already in the collection,
   * it will be added to the specified shelf.
   * @param {any} book - The book object whose shelf is being changed.  
   * @param {any} newShelfId - The new shelf ID. If null, the book will be removed from the collection.
   */
  const onShelfChange = useCallback((book, newShelfId) => {
    BooksAPI.update(book, newShelfId).then(() => {
      setBooks((prevBooks) => {
        const exists = prevBooks.some((x) => x.id === book.id);
        return exists
          ? prevBooks.map((existingBook) => (existingBook.id === book.id)
            ? { ...existingBook, shelf: newShelfId }  // Update the shelf of the existing book
            : existingBook) // Keep other books unchanged
          : [...prevBooks, { ...book, shelf: newShelfId }]; // Add the new book to the collection with the specified shelf
      });
    });
  }, []);

  return (
    <div className="app">
      {selectedBookId &&
        <Modal isOpen={!!selectedBookId} onClose={closeModal}>
          <BookDetails bookId={selectedBookId} onClose={closeModal} onShelfChange={onShelfChange} />
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