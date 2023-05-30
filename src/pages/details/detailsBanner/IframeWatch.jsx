import { Box } from '@mui/material';
import './style.scss';
import React, { useCallback, useEffect, useState } from 'react';

const IframeWatch = ({
  id,
  season,
  episode,
  mediaType,
  heightWindow,
  waiting,
  setWaiting,
}) => {
  const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };
  const awitFn = async () => {
    await pause(1000);
    setWaiting(false);
  };
  awitFn();
  return (
    <>
      {!waiting ? (
        <iframe
          id="iframe-embed"
          scrolling="no"
          frameBorder="0"
          height={heightWindow}
          src={
            mediaType === 'movie'
              ? `https://www.2embed.to/embed/tmdb/movie?id=${id}`
              : `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`
          }
          allowFullScreen
        />
      ) : (
        <Box
          maxWidth="1200px"
          width="100%"
          height={heightWindow}
          className="skeleton"
        ></Box>
      )}
    </>
  );
};

export default IframeWatch;
