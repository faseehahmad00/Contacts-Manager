import React, { useState } from "react";
import logo from "../assets/logo.png";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import axios from 'axios'
import { useHistory } from "react-router-dom";


const SidebarLogin = (props) => {
  const classes = useStyles();
  let history = useHistory();


  const { register, control, handleSubmit, formState: { errors } } = useForm();
  let [disabled, setdisabled] = useState(false);

  function submitlogin({ email, password }) {
    setdisabled(true);
    axios.post('/api/users/login', {
      email: email,
      password: password
    })
      .then(function (response) {
        setdisabled(false);
        localStorage.setItem("token", response.data)
        history.push({
          pathname: '/app',
          // state: { token: response.data }
        });
      })
      .catch(function (error) {
        console.log(error);
        setdisabled(false);
        alert("unable to login. check email and password")
      })
  }

  return (
    <div className={classes.container}>
      <div >
        <img className={classes.logoimg} src={logo} alt="" />
      </div>

      <form className={classes.form} onSubmit={handleSubmit(submitlogin)} >
        <h3 className={classes.formheading}>LOGIN</h3>
        <Controller
          name="email"
          control={control}
          defaultValue=''
          render={({ field }) => <TextField
            type='email'
            {...register("email", { minLength: 7 })}
            error={errors.email ? true : false}
            fullWidth label='email' {...field}
            className={classes.inputfiled}
          />
          }
        />

        <Controller
          name="password"
          control={control}
          defaultValue=''
          render={({ field }) => <TextField
            type='password'
            {...register("password", { minLength: 4 })}
            error={errors.password ? true : false}
            fullWidth label='password' {...field}
            className={classes.inputfiled}
          />
          }
        />

        <Button
          disabled={disabled}
          className={classes.button}
          type='submit'
          variant='contained'
          fullWidth
        >
          LOGIN
        </Button>
      </form>
      <div>
        <div className={classes.terms}>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </div>
        <Link className={classes.termsheading} onClick={props.toggleform}>
          New User click to signup ? Sign up
        </Link>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    minWidth: "400px",
    backdropFilter: "blur(50px)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: " 0 2rem",
    ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
      width: "100vw",
      position: "absolute",
      padding: 0,
    }
  },

  heading: {
    fontSize: "50px",
    fontWeight: "900",
    color: "#343434",
    ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
      display: "none",
    }
  },
  terms: {
    padding: "0 1rem",
    textAlign: "center",
    fontSize: " 10px",
    color: "#808080",
    fontWeight: "300",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formheading: {
    fontFamily: " 'Lobster', cursive ",
    fontSize: '2rem',
    color: "#000000",
    marginBottom: "2rem",
  },
  termsheading: {
    cursor: "pointer",
    color: "#808080",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "2rem",
  },
  inputfiled: {
    width: " 80%",
    maxWidth: "350px",
    minWidth: "250px",
    height: "40px",
    margin: "1rem"
  },
  button: {
    marginTop: '2rem',
    width: " 80%",
    maxWidth: "350px",
  },
  logoimg: {
    height: '6rem'
  }
});

export default SidebarLogin;
