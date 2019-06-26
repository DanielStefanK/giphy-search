import React, { useState } from "react";
import "./App.css";

import SearchBox from "./SearchBox";
import GifList from "./GifList";
import { Promise } from "q";
const endpoint = "https://api.giphy.com/v1/gifs/search";
const api_key = "s";

const App: React.FC = () => {
  const [lastQuery, setLastQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);

  const onSubmit = (e: any) => {
    if (lastQuery !== e) {
      setLastQuery(e);
      setError(false);
      setLoading(true);
      loadData(e)
        .then(({ data, pagination }) => {
          setData(data);
        })
        .catch(err => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <div className="searchHeader">
        <SearchBox onSubmit={onSubmit} loading={isLoading} />
      </div>
      <div className="contentWrapper">
        {error ? (
          <div className="errorBox content">Could not fetch GIFs</div>
        ) : data ? (
          <GifList data={data} />
        ) : (
          <div className="content">Enter a query and press Submit</div>
        )}
      </div>
      <div>
        {isLoading && (
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        )}
      </div>
    </div>
  );
};

const loadData = (query: string, offset: number = 0): Promise<any> => {
  return Promise<any>((resolve, reject) => {
    return fetch(
      `${endpoint}?api_key=${api_key}&q=${encodeURIComponent(
        query
      )}&offset=${offset}`
    )
      .then(response => {
        resolve(response.json());
      })
      .catch(() => reject());
  });
};

export default App;
