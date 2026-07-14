import { Link } from 'react-router-dom';
import Bookshelf from './bookshelf';

/**
 * Component for displaying bookshelves and their books.
 * @param {Object[]} bookshelves - Array of book shelf objects.
 * @param {Object[]} books - Array of book objects.
 * @param {Function} onShelfChange - Callback for changing a book's shelf.
 * @param {Function} openModal - Callback for opening the book details modal.
 * @param {Function} onRatingUpdate - Callback for updating a book's rating.
 * @returns {JSX.Element} The rendered BookShelves component.
 */
const BookShelves = ({ bookshelves, books, onShelfChange, openModal, onRatingUpdate }) => {
  const getBooksByShelf = (shelfId) => {
    return books.filter((book) => book.shelfId === shelfId);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((bookShelf) => (
            <Bookshelf key={bookShelf.id} title={bookShelf.title} books={getBooksByShelf(bookShelf.id)} onShelfChange={onShelfChange} isSearch={false} openModal={openModal} onRatingUpdate={onRatingUpdate} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookShelves;