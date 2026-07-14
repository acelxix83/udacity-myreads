/**
 * ShelfChanger component for changing the shelf of a book.
 * @param {Object} props - The component props.
 * @param {Object} props.book - The book object for which the shelf is being changed.
 * @param {Function} props.onShelfChange - Callback function to handle shelf changes.
 * @returns {JSX.Element} The rendered ShelfChanger component.
 */
const ShelfChanger = ({ book, onShelfChange }) => {
  /**
   * Handle the change of the shelf for the book.  Defaults to null if the selected value is 'null',
   *  otherwise parses the selected value as an integer.
   * @param {any} event - The change event triggered by selecting a new shelf.
   */
  const handleShelfChange = (event) => {
    const newShelfId = event.target.value === 'null' ? null : parseInt(event.target.value, 10);
    onShelfChange(book, newShelfId);
  };

  return (
    <div className="book-shelf-changer">
      <select name={book.id} key={book.id} value={book.shelfId ?? "null"} onChange={handleShelfChange}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="1">Currently Reading</option>
        <option value="2">Want to Read</option>
        <option value="3">Read</option>
        <option value="null">None</option>
      </select>
    </div>
  );
};

export default ShelfChanger;