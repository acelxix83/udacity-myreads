import ShelfChanger from './ShelfChanger';

const Book = ({ book, onShelfChange }) => { 
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