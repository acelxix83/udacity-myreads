const ShelfChanger = ({ book, onShelfChange }) => {
  const handleShelfChange = (event) => {
    const newShelfId = event.target.value === 'null' ? null : parseInt(event.target.value, 10);
    onShelfChange(book.id, newShelfId);
  }
  return (
    <div className="book-shelf-changer">
      <select key={book.id} value={book.shelfId ?? 'null'} onChange={handleShelfChange}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="1">Currently Reading</option>
        <option value="2">Want to Read</option>
        <option value="3">Read</option>
        <option value="null">None</option>
      </select>
    </div>
  )
}

export default ShelfChanger;