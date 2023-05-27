import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './style.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import Img from '../../../components/lazyLoadImage/Img.jsx';
import PosterFallback from '../../../assets/no-poster.png';
import { PlayIcon } from '../Playbtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Episodes from '../epesodes/Episodes';
import { Box } from '@mui/material';
import IframeWatch from './IframeWatch';

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [heightWindow, setheightWindow] = useState(
    window.innerWidth / 2 > 700 ? 700 : window.innerWidth / 2
  );
  const [episode, setEpisode] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [season, setSeason] = useState(1);
  const detectResize = () => {
    const widthWindow = window.innerWidth;
    let heightifr;
    if (widthWindow < 1200) heightifr = widthWindow / 2;
    else heightifr = 700;
    setheightWindow(heightifr);
  };
  useEffect(() => {
    window.addEventListener('resize', detectResize);
    return () => window.removeEventListener('resize', detectResize);
  }, [heightWindow]);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === 'Director');
  const writer = crew?.filter(
    (f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer'
  );
  //const titleSeason = mediaType ==='tv' && ' || ' + season + '||' + episode
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };
  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="head-title">
                {`Watch : ${data.name || data.title} (${dayjs(
                  data?.release_date
                ).format('YYYY')})`}
                {mediaType === 'tv' && (
                  <div className="divider">
                    <span style={{ color: '#da2f68', margin: '0 10px' }}>
                      |
                    </span>
                    <span className="head-span">{'Saison : ' + season}</span>
                    <span style={{ color: '#da2f68', margin: '0 10px' }}>
                      |
                    </span>
                    <span className="head-span">{'Episode : ' + episode}</span>
                  </div>
                )}
              </div>
              <Box
                height={heightWindow}
                marginBottom="40px"
                className="heroBanner"
              >
                {!loading && (
                  <div className="backdrop-img">
                    <Img src={`${url.backdrop + data?.backdrop_path}`} />
                  </div>
                )}

                <div sandbox="allow-scripts" className="opacity-layer2">
                  <IframeWatch
                    id={id}
                    season={season}
                    episode={episode}
                    mediaType={mediaType}
                    heightWindow={heightWindow}
                    waiting={waiting}
                    setWaiting={setWaiting}
                  />
                </div>
              </Box>

              {mediaType === 'tv' && data && (
                <Episodes
                  data={data}
                  setEpisode={setEpisode}
                  setSeason={setSeason}
                  currentEpisode={season}
                  setWaiting={setWaiting}
                />
              )}
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format('YYYY')})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format('MMM D, YYYY')}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="skeletonLoad">
          <Box
            maxWidth="500px"
            padding="20px"
            margin="20px auto"
            borderRadius="10px"
            className="head-title skeleton"
          ></Box>
          <Box height={heightWindow} className="heroBanner skeleton"></Box>
          <div className="detailsBannerSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
