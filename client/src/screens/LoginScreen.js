import { Container } from '@material-ui/core';
import Topbarlogin from '../components/topbarlogin';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const LoginScreen = () => {
    let history = useHistory();

    let [islogin, setislogin] = useState(true);
    let [name, setname] = useState('');
    let [email, setmail] = useState('');
    let [password, setpassword] = useState('');
    let [nameerr, setnameerr] = useState(false);
    let [emailerr, setmailerr] = useState(false);
    let [passworderr, setpassworderr] = useState(false);
    let [disabled, setdisabled] = useState(false);
    let [formsaving, setformsaving] = useState(false)

    function togglelogin() {
        setnameerr(false)
        setmailerr(false)
        setpassworderr(false)
        setmail('')
        setpassword('')
        setislogin(true)
    }


    function togglesignup() {
        setnameerr(false)
        setmailerr(false)
        setpassworderr(false)
        setname('')
        setmail('')
        setpassword('')
        setislogin(false)
    }

    function submitlogin() {
        if (validatemail() && validatepassword())
        setdisabled(true);
        setformsaving(true);
        axios.post('/api/users/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                setdisabled(false);
                setformsaving(false);
                history.push({
                    pathname: '/app',
                    state: { token : response.data}
                });
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                setformsaving(false);
            })
    }

    function submitsignup() {
        if (validatename() && validatemail() && validatepassword()) {
            setdisabled(true);
            setformsaving(true);
            axios.post('/api/users/signup', {
                name: name,
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    togglelogin()
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(() => {
                    setdisabled(false);
                    setformsaving(false);
                });

        }
    }

    function validatename() {
        setnameerr(false)
        if (name.length < 3) setnameerr(true)
        else
            return true
    }

    function validatemail() {
        setmailerr(false)
        if (email.includes('@') && email.length > 5 && email.includes('.'))
            return true
        else
            setmailerr(true)
    }

    function validatepassword() {
        setpassworderr(false)
        if (password.length < 3 || password.length >= 20)
            setpassworderr(true)
        else
            return true
    }

    return (
        <div>
            <Topbarlogin togglesignup={togglesignup} togglelogin={togglelogin} disabled={disabled} showprogress={formsaving} />
            {islogin && <div>
                <Container maxWidth={'xs'} style={{ padding: '5rem' }}>
                    <h2>WELCOME TO LOGIN</h2>
                    <TextField id="email" error={emailerr} autoComplete='false' type="email" label="Email" fullWidth style={{ margin: '2rem 0 1rem 0' }}
                        onChange={(e) => {
                            setmail(e.target.value)
                            validatemail()
                        }} />
                    <TextField id="password" error={passworderr} autoComplete='off' type="password" label="Password" fullWidth style={{ margin: '2rem 0 0.5rem 0' }}
                        onChange={(e) => {
                            setpassword(e.target.value)
                            validatepassword()
                        }} />
                    <Link style={{ textAlign: 'left' }} onClick={togglesignup}>
                        <p>new user ? click to signup</p>
                    </Link>
                    <Button disabled={disabled} variant="contained" style={{ marginTop: '3rem' }} color="secondary" fullWidth onClick={submitlogin}>
                        Login
                    </Button>
                </Container>
            </div>}


            {!islogin && <div>
                <Container maxWidth={'xs'} style={{ padding: '4rem' }}>
                    <h2>WELCOME TO SIGNUP</h2>
                    <TextField error={nameerr} autoComplete='off' id="name" label="name" fullWidth style={{ margin: '2rem 0 1rem 0' }}
                        onChange={(e) => {
                            setname(e.target.value)
                            validatename()
                        }} />
                    <TextField error={emailerr} autoComplete='off' id="email" label="Email" fullWidth style={{ margin: '2rem 0 1rem 0' }}
                        onChange={(e) => {
                            setmail(e.target.value)
                            validatemail()
                        }} />
                    <TextField error={passworderr} autoComplete='off' id="password" type="password" label="Password" fullWidth style={{ margin: '2rem 0 0.5rem 0' }}
                        onChange={(e) => {
                            setpassword(e.target.value)
                            validatepassword()
                        }} />
                    <Link style={{ textAlign: 'left' }} onClick={togglelogin}>
                        <p>already a user ? click to login</p>
                    </Link>
                    <Button variant="contained" color="secondary" style={{ marginTop: '3rem' }} fullWidth onClick={submitsignup}>
                        Signup
                    </Button>
                </Container>
            </div>}
        </div>
    );
}

export default LoginScreen;