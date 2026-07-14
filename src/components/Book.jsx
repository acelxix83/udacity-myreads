import ShelfChanger from './ShelfChanger';
import { useNavigate } from 'react-router-dom';

const Book = ({ book, onShelfChange, openModal }) => { 
  const navigate = useNavigate();

  const viewDetails = (e) => {    
    openModal(book.id);
    console.log('Navigating to details for book ID:', book.id);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks?.thumbnail})`,
            }}
            onClick={viewDetails}
            title="Click to view details"
          ></div>
          <ShelfChanger key={book.id} book={book} onShelfChange={onShelfChange} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(', ')}</div>
      </div>
    </li>
  );
};

export default Book;