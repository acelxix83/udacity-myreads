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
  const [selectedBookId, setSelectedBookId] = useState(null);

  const openModal = (bookId) => {
    console.log('Opening modal for book ID:', bookId);
    setSelectedBookId(bookId);
  }

  const closeModal = () => {
    console.log('Closing modal');
    setSelectedBookId(null);
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

  return (
    <div className="app">
      {selectedBookId &&
        <Modal isOpen={!!selectedBookId} onClose={closeModal}>
          <BookDetails bookId={selectedBookId} onClose={closeModal} onShelfChange={onShelfChange} />
        </Modal>
      }
      <Routes>
        <Route exact path="/" element={
          <BookShelves bookShelves={bookShelves} books={books} onShelfChange={onShelfChange} openModal={openModal} />
        } />
        <Route exact path="/search" element={
          <Search books={books} onShelfChange={onShelfChange} openModal={openModal} />
        } />
      </Routes>
    </div>
  );
}

export default App;