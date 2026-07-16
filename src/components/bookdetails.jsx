import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import ShelfChanger from "./ShelfChanger";
import BookRating from "./BookRating";

/**
 * Book details
 * @param {Object} props - The component props.
 * @param {string} props.bookId - The ID of the book whose details are being displayed.
 * @param {Function} props.onClose - Function to close the book details modal.
 * @param {Function} props.onShelfChange - Function to handle shelf changes for the book.
 * @returns {JSX.Element} The rendered book details component.
 */
const BookDetails = ({ bookId, onClose, onShelfChange }) => {
  const [bookDetails, setBookDetails] = useState(null);

  /**
   * Fetches the book details from the API when the component mounts or when the book prop changes.
   */
  useEffect(() => {
    const getBookDetails = async () => {
      const details = await BooksAPI.get(bookId);
      setBookDetails(details);
    }
    getBookDetails();
  }, [bookId]);

  /**
   * Handles the shelf change. It updates the shelf of the book and
   * calls the onShelfChange callback to update the main collection.
   * @param {any} book
   * @param {any} newShelfId
   */
  const handleShelfChange = (book, newShelfId) => {
    onShelfChange(book, newShelfId);
    setBookDetails((prevDetails) => ({ ...prevDetails, shelf: newShelfId }));
  }

  return (bookDetails &&
    <div className="book-details">
      <div className="book-cover-container">
        {bookDetails?.imageLinks?.thumbnail &&
          <div className="book-cover"
            style={{
              backgroundImage: `url(${bookDetails.imageLinks?.thumbnail})`,
            }}
            title="Close"
          ></div>
        }
      </div>
      <h2>{bookDetails.title}</h2>
      <p><b>Author(s):</b> {bookDetails.authors ? bookDetails.authors.join(", ") : "Unknown"}</p>
      <p><b>Published:</b> {bookDetails.publishedDate || "Unknown"}</p>
      <p><b>Page Count:</b> {bookDetails.pageCount || "Unknown"}</p>
      <ShelfChanger key={bookDetails.id} book={bookDetails} onShelfChange={handleShelfChange} />
      {bookDetails.averageRating > 0 &&
        <p><b>Average Rating: </b>{bookDetails.averageRating}/5 ({bookDetails.ratingsCount})</p>
      }
      {!bookDetails.averageRating > 0 &&
        <p><b>Average Rating: </b>Not rated yet.</p>
      }
      <BookRating key={'rating-' + bookDetails.id} book={bookDetails} />
      <p className="book-description"><b>Description:</b> {bookDetails.description || "No description available."}</p>

    </div>
  );
};

export default BookDetails;