import ShelfChanger from './ShelfChanger';
import { useNavigate } from 'react-router-dom';
import BookRating from './BookRating';

const Book = ({ book, onShelfChange, openModal, onRatingUpdate }) => {
  const navigate = useNavigate();

  const viewDetails = (e) => {
    openModal(book);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 135,
              height: 193,
              backgroundImage: `url(${book.imageLinks?.thumbnail})`,
            }}
            onClick={viewDetails}
            title="Click to view details"
          ></div>
          <ShelfChanger key={book.id} book={book} onShelfChange={onShelfChange} />
        </div>
        <BookRating key={book.id} book={book} onRatingUpdate={onRatingUpdate} />
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(', ')}</div>
      </div>
    </li>
  );
};

export default Book;