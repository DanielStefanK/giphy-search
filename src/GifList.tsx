import React, { FunctionComponent } from "react";

import Video from "./Video";

const GifList: FunctionComponent<any> = ({ data }) => {
  return (
    <div className="content">
      {data.map((gif: any) => (
        <Video gif={gif} key={gif.id} />
      ))}
    </div>
  );
};

export default GifList;
