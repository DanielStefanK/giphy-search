import React, { FunctionComponent, useState } from "react";

const SearchBox: FunctionComponent<any> = ({
  initial = "",
  loading = false,
  onSubmit
}) => {
  const [query, setQuery] = useState(initial);
  return (
    <form
      className="searchBoxWapper"
      onSubmit={e => {
        onSubmit(query);
        e.preventDefault();
      }}
    >
      <input
        className="searchInput flex-item"
        type="text"
        placeholder="type your query here"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <button type="submit" className="searchBtn flex-item">
        {loading ? (
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default SearchBox;
