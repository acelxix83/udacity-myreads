import { memo, useCallback } from 'react';

/**
 *  BookRating component displays the average rating of a book using star icons.
 *  @param {Object} props - The component props.
 *  @param {Object} props.book - The book object whose rating is being displayed.
 *  @returns {JSX.Element} The rendered book rating component.
 */
const BookRating = memo(({ book }) => {
  const getRatingClass = useCallback((star, averageRating) => {
    let ratingClass = 'rating-star ';

    if (averageRating > 0) {
      ratingClass += star <= averageRating ? 'full-rating' : star - averageRating === 0.5 ? 'half-rating' : 'zero-rating';
    } else {
      ratingClass += 'zero-rating';
    }

    return ratingClass;
  }, []);

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={'star-' + star}>
          <div className={getRatingClass(star, book.averageRating)}></div>
        </div>
      ))}
    </div>
  );
});

export default BookRating;