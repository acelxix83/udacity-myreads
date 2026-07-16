import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as BooksAPI from '../booksapi';
import Bookshelf from './bookshelf';

/**
 * Search component for searching books, displaying search results, and adding them to shelves.
 * @param {Object} props - The component props.
 * @param {Object[]} props.books - Array of book objects currently in the user's collection.
 * @param {Function} onShelfChange - Function to handle shelf changes for books.
 * @param {Function} props.onShelfChange - Function to handle shelf changes for books.
 * @param {Function} props.openModal - Function to open a modal for book details.
 * @returns {JSX.Element} The rendered Search component.
*/
const Search = ({ books, onShelfChange, openModal }) => {
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  /** 
   * Handles the search functionality by calling the BooksAPI.search method with the current query string.
   * If the query string is empty, it clears the search results. The search results are mapped to book objects and stored in the state.
   * If the search criteria changes while a search is in progress, the previous search request is aborted to prevent race conditions.
   * AbortController is used to manage the cancellation of the previous search request.  
   * AbortError is silently ignored as it is expected when the search terms change.
   */
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (queryString.length > 0) {
        const controller = new AbortController();

        const searchForBooks = async () => {
          try {
            const results = await BooksAPI.search(queryString, 20, controller.signal);
            mapResultsToBooks(results);
          } catch (error) {
            if (error.name !== 'AbortError') {
              console.error('Error searching for books:', error);
            }
            // Silently ignore AbortError - this is expected when search terms change
          }
        };

        searchForBooks();

        return () => controller.abort({ name: 'AbortError', message: 'Search changed, aborting previous request.' });
      }
    }, 300); // Debounce time of 300ms

    return () => clearTimeout(debounceTimeout);
  }, [queryString]);

  /** 
   * Sanitizes the input query string and updates the state for search results.
   * Input is limited to alphanumeric characters and spaces. If the sanitized query
   * string is empty, it clears the search results.
   * @param {string} queryString - The input query string to search for books.
   */
  const search = ((queryString) => {
    const sanitizedQueryString = queryString.replace(/[^A-Za-z0-9 ]/g, '');
    if (sanitizedQueryString.length > 0) {
      setQueryString(sanitizedQueryString);
    } else {
      setQueryString('');
      setSearchResults([]);
    }
  });

  /**
   * Sets the search results state with the mapped book objects. 
   * If the results are empty or contain an error, it clears the search results.
   * @param {any} results - The array of book results returned from the search API.
   * @returns {Object[]} An array of books.
   */
  const mapResultsToBooks = (results) => {
    setSearchResults((prevResults) => {
      if (!results || results.error) {
        return [];
      }
      return results.map((result, index) => {
        const existingBook = books.find((book) => book.id === result.id);
        return { ...result, shelf: existingBook ? existingBook.shelf : 'none' };
      });
    });
  };

  /**
   * Syncs the search results with the books collection when the books prop changes.
   * This ensures that shelf changes made in the BookDetails modal are reflected in the search results.
   */
  useEffect(() => {
    mapResultsToBooks(searchResults);
  }, [books]);

  /**
   * Handles the shelf change. It updates the shelf of the book in the search
   * results and calls the onShelfChange callback to update the main collection. 
   * @param {any} book
   * @param {any} newShelfId
   */
  const handleShelfChange = (book, newShelfId) => {
    onShelfChange(book, newShelfId);
    setSearchResults((prevResults) => {
      return prevResults.map((result) => {
        return { ...result, shelf: (result.id === book.id) ? newShelfId : result.shelf };
      });
    });
  }

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
        <Bookshelf title="Search Results" books={searchResults} onShelfChange={handleShelfChange} isSearch={true} openModal={openModal} />
      </div>
    </div>
  );
};

export default Search;