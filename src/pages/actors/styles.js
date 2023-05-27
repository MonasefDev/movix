import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  image: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em #e86435',
  },
  btnLink: {
    padding: '10px 20px',
    borderRadius: '10px',
    color: 'white',
    backgroundImage: 'linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)',
    target: '_blank',
    '&:link': {
      textDecoration: 'none',
      fontSize: '24px',
      fontWeight: '300',
    },
  },
  container: {
    maxWidth: '1200px',
    margin: ' 0 auto',
  },
  btns: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));
