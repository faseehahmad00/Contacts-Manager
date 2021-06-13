import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function TopBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            ConnectX
          </Typography>
          {props.showprogress && <CircularProgress/>}
          <Button disabled={props.disabled} color="inherit" onClick={props.togglelogin}>Login</Button>
          <Button disabled={props.disabled} color="inherit" onClick={props.togglesignup}>Signup</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom:0
    },
    title: {
      flexGrow: 1,
      textAlign:'left'
    },
  }));