import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const BookShelves = ({ bookShelves, books, onShelfChange, openModal }) => {
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
          {bookShelves.map((bookShelf) => (
            <BookShelf key={bookShelf.id} title={bookShelf.title} books={getBooksByShelf(bookShelf.id)} onShelfChange={onShelfChange} isSearch={false} openModal={openModal} />
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