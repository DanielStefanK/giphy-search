import React, { useState, useEffect } from "react";
import "./App.css";

import SearchBox from "./SearchBox";
import GifList from "./GifList";
import { Promise } from "q";
const endpoint = "https://api.giphy.com/v1/gifs/search";
const api_key = "s" || process.env.APIKEY;

const App: React.FC = () => {
  const [lastQuery, setLastQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total_count: 0, offset: 0 });

  const loadMore = () => {
    if (pagination.total_count > pagination.offset) {
      setLoading(true);
      loadData(lastQuery, pagination.offset + 25)
        .then(res => {
          setPagination(res.pagination);
          setData([...data, ...res.data]);
        })
        .catch(err => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const isBottom = (el: any) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const trackScrolling = () => {
    const wrappedElement = document.getElementById("scroll");
    if (isBottom(wrappedElement) && !isLoading) {
      loadMore();
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  });

  const onSubmit = (e: any) => {
    if (lastQuery !== e) {
      setLastQuery(e);
      setError(false);
      setLoading(true);
      loadData(e)
        .then(({ data, pagination }) => {
          setPagination(pagination);
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
      <div className="contentWrapper" id="scroll">
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

const loadData = (
  query: string,
  offset: number = 0
): Promise<{ data: never[]; pagination: any }> => {
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
