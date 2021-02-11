import React from "react";
import "./books-stylesheet.css";
const Book = props => {
  const { bookResults } = props;
  const [books, setBooks] = React.useState(bookResults);

  React.useEffect(() => {
    setBooks(bookResults);
  }, [bookResults]);

  return (
    <div>
      <div className="container">
        {bookResults === ""
          ? console.log(bookResults)
          : books.map((book, index) => (
              <div key={index} className="cardResult" id="bookCard">
                <img src={book.imageUrl} alt="a" />
                <div className="textCard">{book.title}</div>
                <div className="textCard">{book.authorName}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Book;
