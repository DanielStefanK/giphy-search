import React, { useState } from "react";
import "./App.css";

import SearchBox from "./SearchBox";
import { Promise } from "q";

const App: React.FC = () => {
  const [lastQuery, setLastQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: any) => {
    if (lastQuery !== e) {
      setLastQuery(e);
      setError(false);
      setLoading(true);
      loadData(e)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log("err");
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
        ) : (
          "content"
        )}
      </div>
    </div>
  );
};

const loadData = (query: string): Promise<any> => {
  return Promise<any>((resolve, reject) => {
    if (query === "query") {
      resolve({ data: "test" });
    } else {
      reject();
    }
  });
};

export default App;
