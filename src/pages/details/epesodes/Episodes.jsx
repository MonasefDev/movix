import React, { useState } from 'react';
import './style.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tabs } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import CarouselSeason from '../../../components/carouselSeason/CarouselSeason';

const Episodes = ({ data, setEpisode, setSeason, setWaiting }) => {
  const [value, setValue] = React.useState(0);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const numberSeason = data?.number_of_seasons || 0;
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: saison, loading } = useFetch(
    `/tv/${id}/season/${currentSeason}`
  );

  const seasonsArray = [];
  for (let i = 0; i < numberSeason; i++) {
    seasonsArray.push(i);
  }

  return (
    <Box className="seasons-content">
      {/*  <Box
        sx={{
          maxWidth: { xs: 320, sm: 1200 },
          bgcolor: 'background.paper',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable"
        >
          {<Tab value={0} label="season 1" /> &&
            seasonsArray.map((season, index) => {
              return (
                <Tab
                  fontSize="30px"
                  key={index}
                  value={index}
                  label={`season ${index + 1}`}
                  onClick={() => {
                    setEpisode(1);
                    setCurrentEpisode(1);
                    setCurrentSeason(index + 1);
                    setSeason(index + 1);
                    setWaiting(true);
                  }}
                />
              );
            })}
        </Tabs> 
      </Box>*/}
      <CarouselSeason
        seasonsArray={seasonsArray}
        setCurrentSeason={setCurrentSeason}
        setSeason={setSeason}
        currentSeason={currentSeason}
      />
      {!loading ? (
        <>
          <Box className="episode-tabs">
            {saison?.episodes.map((episode, index) => {
              const classNam = classNames(
                'episode-btn',
                index + 1 === currentEpisode && 'active-epi'
              );
              return (
                <Box
                  onClick={() => {
                    setSeason(currentSeason);
                    setEpisode(index + 1);
                    setCurrentEpisode(index + 1);
                    setWaiting(true);
                  }}
                  className={classNam}
                  key={episode.id}
                >{`Episode ${index + 1} : ${episode.name}`}</Box>
              );
            })}
          </Box>
        </>
      ) : (
        <div className="seasonsSkeleton">
          <Box minHeight="600px" className="episode-tabs skeleton"></Box>
        </div>
      )}
    </Box>
  );
};

export default Episodes;
