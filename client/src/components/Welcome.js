import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const Welcome = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>
        Welcome To <br />
        ConnectX
      </h1>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  },
  heading:{
  fontFamily: " 'Lobster', cursive ",
  fontSize: "60px",
  fontWeight: "100",
  color: "#000000",
  ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
    display: "none",
  },
  }
});
export default Welcome;
