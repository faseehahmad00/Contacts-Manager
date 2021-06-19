import { Container } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const AddContact = () => {
    let token  = localStorage.getItem('token');

    let history = useHistory();

    let [disabled, setdisabled] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    function submitcontact(data) {
        setdisabled(true);
        axios.post('http://localhost:4000/api/contacts',data,{
            headers: {
                'auth-token': token
            }
        } )
            .then(function (response) {
                console.log("contact saved successfully")
                setdisabled(false);
                history.goBack();
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
            })
    }

    return (
        <div>
            <div>
                <Container maxWidth={'xs'} style={{ padding: '5rem' }}>
                    <h2>ADD CONTACT</h2>
                    <form onSubmit={handleSubmit(submitcontact)}>
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
                            defaultValue=''
                            render={({ field }) => <TextField
                                required
                                type='text'
                                {...register("phone", { minLength: 3 })}
                                error={errors.phone ? true : false}
                                fullWidth label='phone' {...field}
                                style={{ marginTop: "2rem" }}
                            />
                            }
                        />

                        <Controller
                            name="address"
                            control={control}
                            defaultValue=''
                            render={({ field }) => <TextField
                                required
                                type='text'
                                {...register("address", { minLength: 3 })}
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
                </Container>
            </div>
        </div>
    );
}

export default AddContact;
