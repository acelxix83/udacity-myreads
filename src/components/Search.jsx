import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';

const Search = ({ books, onShelfChange, openModal, onRatingUpdate }) => {
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (queryString.length > 0) {
      const controller = new AbortController();

      const searchForBooks = async () => {
        try {
          const results = await BooksAPI.search(queryString, 20, controller.signal);
          if (results && Array.isArray(results)) {
            const mappedResults = mapResultsToBooks(results);
            setSearchResults(mappedResults);
          } else {
            setSearchResults([]);
          }
        } catch (error) {          
          if (error.name !== 'AbortError') {
            console.error('Error searching for books:', error);
          }
          // Silently ignore AbortError - this is expected when search terms change
        }
      };

      searchForBooks();

      return () => controller.abort({ name: 'AbortError', message: 'Search changed, aborting previous request.'});
    }
  }, [queryString]);

  const search = ((queryString) => {
    const sanitizedQueryString = queryString.replace(/[^A-Za-z0-9 ]/g, '');
    if (sanitizedQueryString.length > 0) {
      setQueryString(sanitizedQueryString);
    } else {
      setQueryString('');
      setSearchResults([]);
    }
  });

  const mapResultsToBooks = (results) => {
    return results.map((result, index) => {
      const existingBook = books.find((book) => book.id === result.id);
      return {
        id: result.id,
        title: result.title,
        authors: result.authors,
        shelfId: existingBook?.shelfId || null,
        userRating: existingBook?.userRating || null,
        imageLinks: {
          thumbnail: result.imageLinks?.thumbnail || null
        }
      };
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={queryString}
            onChange={(event) => search(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookShelf title="Search Results" books={searchResults} onShelfChange={onShelfChange} isSearch={true} openModal={openModal} onRatingUpdate={onRatingUpdate} />
      </div>
    </div>
  );
};

export default Search;