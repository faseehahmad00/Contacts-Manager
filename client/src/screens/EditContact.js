import { Container } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const EditContact = (props) => {
    const location = useLocation();
    const [user, setuser] = useState({ name: "faseeh ahmad" })
    const [loading, setisloading] = useState(true)
    let token = localStorage.getItem('token');
    let history = useHistory();

    let [disabled, setdisabled] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    function submitcontact(data) {
        setdisabled(true);
        axios.put('/api/contacts/' + location.state.userid, data, {
            headers: {
                'auth-token': token
            }
        })
            .then(function (response) {
                console.log("contact saved successfully")
                setdisabled(false);
                history.goBack();
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                alert("UNABLE TO SAVE CONTACT")
            })
    }
    function fetchuser(data) {
        setisloading(true)
        setdisabled(true);
        axios.get('/api/contacts/' + location.state.userid, data, {
            headers: {
                'auth-token': token
            }
        })
            .then(function (response) {
                setuser(response.data)
                setdisabled(false);
                console.log(user)
                // history.goBack();
                setisloading(false)
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                setisloading(false);
            })
    }

    useEffect(() => {
        setTimeout(() => {
            fetchuser()
        }, 1000);
    }, [])

    return (
        <div>
            <div>
                {loading && <div style={{ display: "flex", height: '100vh', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>}
                {!loading &&
                    <Container maxWidth={'xs'} style={{ padding: '5rem' }}>
                        <h2>EDIT CONTACT</h2>
                        <form onSubmit={handleSubmit(submitcontact)}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={user.name}
                                render={({ field }) => <TextField
                                    required
                                    type='text'
                                    {...register("name", { minLength: 2 })}
                                    error={errors.name ? true : false}
                                    fullWidth label='name' {...field}
                                    style={{ marginTop: "2rem" }}
                                />
                                }
                            />
                            <Controller
                                name="email"
                                control={control}
                                defaultValue={user.email}
                                render={({ field }) => <TextField
                                    required
                                    type='email'
                                    {...register("email", { minLength: 7 })}
                                    error={errors.email ? true : false}
                                    fullWidth label='email' {...field}
                                    style={{ marginTop: "2rem" }}
                                />
                                }
                            />

                            <Controller
                                name="phone"
                                control={control}
                                defaultValue={user.phone}
                                render={({ field }) => <TextField
                                    required
                                    type='text'
                                    {...register("phone", { minLength: 5 })}
                                    error={errors.phone ? true : false}
                                    fullWidth label='phone' {...field}
                                    style={{ marginTop: "2rem" }}
                                />
                                }
                            />

                            <Controller
                                name="address"
                                control={control}
                                defaultValue={user.address}
                                render={({ field }) => <TextField
                                    required
                                    type='text'
                                    {...register("address", { minLength: 2 })}
                                    error={errors.address ? true : false}
                                    fullWidth label='address' {...field}
                                    style={{ marginTop: "2rem" }}
                                />
                                }
                            />

                            <Button
                                disabled={disabled}
                                style={{ marginTop: '2rem' }}
                                color='secondary'
                                type='submit'
                                variant='contained'
                                fullWidth
                            >
                                SAVE
                            </Button>
                        </form>
                    </Container>}
            </div>
        </div>
    );
}

export default EditContact;
