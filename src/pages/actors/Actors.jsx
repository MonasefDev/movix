import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import useStyles from './styles';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Carousel from '../../components/carousel/Carousel';
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

function Actors() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useFetch(`/person/${id}?api_key=${TMDB_TOKEN}`);
  const { data: movies } = useFetch(
    `/discover/movie?with_cast=${id}&page=${page}&api_key=${TMDB_TOKEN}`
  );
  const classes = useStyles();
  const navigate = useNavigate();
  //const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  /*   if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  } */

  return (
    <div className={classes.container}>
      <Grid paddingTop="100px" container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780${data?.profile_path}`}
          />
        </Grid>
        <Grid
          color="white"
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" fontWeight="300" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="subtitle1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box className={classes.btns}>
            <a
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              className={classes.btnLink}
            >
              IMDB
            </a>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box color="white" margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        <Carousel
          title={'title'}
          data={movies?.results}
          loading={loading}
          endpoint={'movie'}
        />
      </Box>
    </div>
  );
}

export default Actors;
