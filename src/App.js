import React from "react";
import "./app-stylesheet.css";
import Book from "./book-list";
function App() {
  const [searchInput, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [error, setError] = React.useState(false);

  const getData = input => {
    return fetch(
      `https://goodreads-server-express--dotdash.repl.co/search/${input}/`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          setSearchValue("");
          setError(true);
        }
      })
      .then(data => setSearchResults(data.list), setError(false))
      .catch(error => {
        return error;
      });
  };
  React.useEffect(() => {
    if (searchInput && searchInput.length) {
      getData(searchInput);
    }
    // eslint-disable-next-line
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    getData(searchInput);
  };

  const handleInput = e => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <div className="topContainer">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for your desired book"
            name="search"
            onInput={e => handleInput(e)}
            value={searchInput}
            className="searchInputText"
            required
          />
          <button className="searchButton" type="submit">
            Search
          </button>
        </form>
      </div>
      <p
        className="errorText"
        style={{
          visibility: error ? "visible" : "hidden",
        }}
      >
        No results for your search, please try a different term.
      </p>
      <div>
        <Book bookResults={searchResults} />
      </div>
    </div>
  );
}

export default App;
