import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';

const Search = ({ books, onShelfChange }) => {
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const search = ((queryString) => {
    setQueryString(queryString);
    if (queryString.length > 0) {
      const searchForBooks = async () => {
        const results = await BooksAPI.search(queryString);
        const mappedResults = mapResultsToBooks(results);
        setSearchResults(mappedResults);
      };

      searchForBooks();
    }
  });

  const mapResultsToBooks = (results) => {
    return results.map((result, index) => {
      return {
        id: result.id,
        title: result.title,
        authors: result.authors,
        shelfId: books.find((book) => book.id === result.id)?.shelfId || null,
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
        <BookShelf title="Search Results" books={searchResults} onShelfChange={onShelfChange} isSearch={true} />
      </div>
    </div>
  );
};

export default Search;