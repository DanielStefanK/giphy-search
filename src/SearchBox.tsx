import React, { FunctionComponent, useState } from "react";

const SearchBox: FunctionComponent<any> = ({
  initial = "",
  loading = false,
  onSubmit
}) => {
  const [query, setQuery] = useState(initial);
  return (
    <div className="searchBoxWapper">
      <input
        className="searchInput flex-item"
        type="text"
        placeholder="type your query here"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <button className="searchBtn flex-item" onClick={() => onSubmit(query)}>
        {loading ? (
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default SearchBox;
