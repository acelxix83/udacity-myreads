import { memo } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './bookshelf';

/**
 * Component for displaying bookshelves and their books.
 * @param {Object[]} bookshelves - Array of book shelf objects.
 * @param {Object[]} books - Array of book objects.
 * @param {Function} onShelfChange - Callback for changing a book's shelf.
 * @param {Function} openModal - Callback for opening the book details modal.
 * @returns {JSX.Element} The rendered BookShelves component.
 */
const BookShelves = memo(({ bookshelves, books, onShelfChange, openModal }) => {
  const getBooksByShelf = (shelfId) => {
    return books.filter((book) => book.shelf === shelfId);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((bookShelf) => (
            <Bookshelf key={bookShelf.id} title={bookShelf.title} books={getBooksByShelf(bookShelf.id)} onShelfChange={onShelfChange} isSearch={false} openModal={openModal} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
});

export default BookShelves;