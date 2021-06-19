import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import bgImg from "../assets/bg.png";
import SidebarLogin from "../components/SidebarLogin";
import SidebarSignup from '../components/SidebarSignup';
import Welcome from "../components/Welcome";


const LoginScreen = () => {
  const classes = useStyles();
  const [islogin, setislogin] = useState(true)
  function togglelogin() {
    setislogin(!islogin)
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {islogin && <SidebarLogin toggleform={togglelogin} />}
        {!islogin && <SidebarSignup toggleform={togglelogin} />}
        <Welcome />
      </div>
    </div>
  );
};


const useStyles = makeStyles({
  container: {
    background: "#eefcff",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  wrapper: {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    display: "flex",
  }
});

export default LoginScreen;
