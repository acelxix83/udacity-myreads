import Book from './Book';

const BookShelf = ({ title, books, onUpdateBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length > 0 && (
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdateShelf={onUpdateBook} />
              </li>
            ))}
          </ol>)
        }
        {books.length === 0 && (
          <div>
            No Books Selected.
          </div>
        )}

      </div>
    </div>
  );
};

export default BookShelf;