import React, { FunctionComponent } from "react";

const Video: FunctionComponent<any> = ({ gif }) => {
  return (
    <div className="gifCard">
      <video
        autoPlay
        width="100%"
        loop
        muted
        playsInline
        src={gif.images.downsized_small.mp4}
        key={gif.id}
      />
    </div>
  );
};

export default Video;
