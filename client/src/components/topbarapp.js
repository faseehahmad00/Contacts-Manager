import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import MenuButton from '../components/MenuButton';

export default function TopBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            CONTACTS
          </Typography>
          {props.showprogress && <CircularProgress />}
          <IconButton disabled={props.disabled} color="inherit" onClick={props.add}>
            <AddIcon />
          </IconButton>
          <MenuButton logout={props.logout}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '2rem',
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    maxHeight: '65px',
    zIndex: 1000,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left'
  },
}));