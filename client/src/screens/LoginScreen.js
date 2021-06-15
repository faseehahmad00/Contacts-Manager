import { Container } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
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
    let [disabled, setdisabled] = useState(false);
    let [formsaving, setformsaving] = useState(false)

    const { register, control, handleSubmit, formState: { errors } } = useForm();


    function togglelogin() {
        setislogin(true)
    }


    function togglesignup() {
        setislogin(false)
    }

    function submitlogin({email,password}) {
        console.log(email,password)
        setdisabled(true);
        setformsaving(true);
        axios.post('/api/users/login',{
             email :email,
            password:password
        })
            .then(function (response) {
                setdisabled(false);
                setformsaving(false);
                history.push({
                    pathname: '/app',
                    state: { token: response.data }
                });
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                setformsaving(false);
            })
    }

    function submitsignup(data) {
            console.log(data)
            setdisabled(true);
            setformsaving(true);
            axios.post('/api/users/signup',data)
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



    return (
        <div>
            <Topbarlogin togglesignup={togglesignup} togglelogin={togglelogin} disabled={disabled} showprogress={formsaving} />

            {islogin && <div>
                <Container maxWidth={'xs'} style={{ padding: '5rem' }}>
                    <h2>WELCOME TO LOGIN</h2>
                    <form onSubmit={handleSubmit(submitlogin)}>

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=''
                            render={({ field }) => <TextField
                                type='email'
                                {...register("email", { minLength: 7 })}
                                error={errors.email ? true : false}
                                fullWidth label='email' {...field}
                                style={{ marginTop: "2rem" }}
                            />
                            }
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=''
                            render={({ field }) => <TextField
                                type='password'
                                {...register("password", { minLength: 5 })}
                                error={errors.password ? true : false}
                                fullWidth label='password' {...field}
                                style={{ marginTop: "2rem" }}
                            />
                            }
                        />
                        <Link style={{ textAlign: 'left' }} onClick={togglesignup}>
                            <p>new user ? click to signup</p>
                        </Link>

                        <Button
                            disabled={disabled}
                            style={{ marginTop: '2rem' }}
                            color='secondary'
                            type='submit'
                            variant='contained'
                            fullWidth
                        >
                            LOGIN
                        </Button>
                    </form>
                </Container>
            </div>}


            {!islogin && <div>
                <Container maxWidth={'xs'} style={{ padding: '5rem' }}>
                    <h2>WELCOME TO SIGNUP</h2>
                    <form onSubmit={handleSubmit(submitsignup)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=''
                            render={({ field }) => <TextField
                                required
                                type='text'
                                {...register("name", { minLength: 3 })}
                                error={errors.name ? true : false}
                                fullWidth label='name' {...field}
                                style={{ marginTop: "2rem" }}
                            />
                            }
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=''
                            render={({ field }) => <TextField
                                type='email'
                                {...register("email", { minLength: 7 })}
                                error={errors.email ? true : false}
                                fullWidth label='email' {...field}
                                style={{ marginTop: "2rem" }}
                            />
                            }
                        />

                        <Controller
                            name="password"
                            control={control}
                            defaultValue=''
                            render={({ field }) => <TextField
                                type='password'
                                {...register("password", { minLength: 5 })}
                                error={errors.password ? true : false}
                                fullWidth label='password' {...field}
                                style={{ marginTop: "2rem" }}
                            />
                            }
                        />
                        <Link style={{ textAlign: 'left' }} onClick={togglelogin}>
                            <p>already a user ? click to login</p>
                        </Link>

                        <Button
                            disabled={disabled}
                            style={{ marginTop: '2rem' }}
                            color='secondary'
                            type='submit'
                            variant='contained'
                            fullWidth
                        >
                            Signup
                        </Button>
                    </form>
                </Container>
            </div>}
        </div>
    );
}

export default LoginScreen;