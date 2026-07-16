/**
 * ShelfChanger component for changing the shelf of a book.
 * @param {Object} props - The component props.
 * @param {Object} props.book - The book object for which the shelf is being changed.
 * @param {Function} props.onShelfChange - Callback function to handle shelf changes.
 * @returns {JSX.Element} The rendered ShelfChanger component.
 */
const ShelfChanger = ({ book, onShelfChange }) => {
  /**
   * Triggers the onShelfChange callback with the selected shelf value when the shelf is changed.
   * @param {any} event - The change event triggered by selecting a new shelf.
   */
  const handleShelfChange = (event) => {
    onShelfChange(book, event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select name={book.id} key={book.id} value={book.shelf} onChange={handleShelfChange}>
        <option value="null" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default ShelfChanger;