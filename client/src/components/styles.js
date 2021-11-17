import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: 'white',
  },
  buttons: {
    marginTop: '40px',
  },
  cardGrid: {
    padding: '20px 0',
    backgroundColor: 'white',
    boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
  },
  card: {
    backgroundColor: 'black',
    color: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // padding: '10px',
    // border: '8px solid #9b752a',
  },
  cardMedia: {
    marginTop: '30',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default useStyles;
