import { memo, useCallback } from 'react';
import BookRating from './bookrating';
import ShelfChanger from './shelfchanger';

/**
 * Book component for displaying an individual book, including title, authors, cover image, shelf changer, and rating.
 * @param {Object} props - The component props.
 * @param {Object} props.book - The book object containing details such as title, authors, imageLinks, and shelfId.
 * @param {Function} props.onShelfChange - Callback function to handle shelf changes for the book.
 * @param {Function} props.openModal - Callback function to open a modal for viewing book details.
 * @returns {JSX.Element} The rendered Book component.
 */
const Book = memo(({ book, onShelfChange, openModal }) => {
  const viewDetails = useCallback((e) => {
    openModal(book.id);
  }, [book.id, openModal]);

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <button
            className="book-cover"
            style={{
              width: 135,
              height: 193,
              backgroundImage: `url(${book.imageLinks?.thumbnail})`,
            }}
            onClick={viewDetails}
            title="Click to view details"
          ></button>
          <ShelfChanger key={book.id} book={book} onShelfChange={onShelfChange} />
        </div>
        <BookRating key={book.id} book={book} />
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(', ')}</div>
      </div>
    </li>
  );
});

export default Book;