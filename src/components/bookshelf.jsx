import Book from './book';

/**
 * Bookshelf component for displaying a collection of books on a specific shelf.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the bookshelf.
 * @param {Object[]} props.books - Array of book objects to be displayed on the shelf.
 * @param {Function} props.onShelfChange - Callback function to handle shelf changes for books.
 * @param {boolean} props.isSearch - Flag indicating if the bookshelf is being used in a search context.
 * @param {Function} props.openModal - Callback function to open a modal for viewing book details.
 * @returns {JSX.Element} The rendered Bookshelf component.
 */
const Bookshelf = ({ title, books, onShelfChange, isSearch, openModal }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title + ` (${books.length})`}</h2>
      <div className="bookshelf-books">
        {books.length > 0 && (
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} onShelfChange={onShelfChange} openModal={openModal} />
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

export default Bookshelf;