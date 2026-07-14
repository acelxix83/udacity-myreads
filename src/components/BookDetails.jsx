import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import ShelfChanger from "./ShelfChanger";

const BookDetails = ({ bookId, onClose, onShelfChange }) => {
  const [bookDetails, setBookDetails] = useState(null);
  useEffect(() => {
    const getBookDetails = async () => {
      const details = await BooksAPI.get(bookId);
      setBookDetails(details);
    }
    getBookDetails();
  }, [bookId]);

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
      <ShelfChanger key={bookDetails.id} book={bookDetails} onShelfChange={onShelfChange} />
      <p className="book-description"><b>Description:</b> {bookDetails.description || "No description available."}</p>

    </div>
  );
};

export default BookDetails;