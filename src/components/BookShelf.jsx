import Book from './Book';

const BookShelf = ({ title, books, onShelfChange, isSearch }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length > 0 && (
          <ol className="books-grid">
            {books.map((book) => (              
              <Book key={book.id} book={book} onShelfChange={onShelfChange} />              
            ))}
          </ol>)
        }
        {books.length === 0 && (
          <div>
            {isSearch ? "No books found." : "No books selected."}
          </div>
        )}

      </div>
    </div>
  );
};

export default BookShelf;