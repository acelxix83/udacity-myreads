const BookRating = ({ book, onRatingUpdate }) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={'star-' + star} onClick={() => onRatingUpdate(book, star)}>
          <div className={`rating-star ${star <= book.userRating ? "full-rating" : "zero-rating"}`}></div>
        </div>
      ))}
    </div>
  );
}

export default BookRating;