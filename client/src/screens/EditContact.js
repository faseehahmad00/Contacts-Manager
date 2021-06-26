import { Container } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

const EditContact = (props) => {
    let token = localStorage.getItem('token');
    const location = useLocation();
    const [user, setuser] = useState({})
    const [loading, setisloading] = useState(true)
    const [isSaving,setisSaving] = useState(false);
    let [img, setimg] = useState('')
    let history = useHistory();

    let [disabled, setdisabled] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    async function uploadimage() {
        let url = user.url
        if (img !== '') {
            let cloudName = "dimm0px4q"
            const formdata = new FormData()
            formdata.append("file", img)
            formdata.append("upload_preset", "jssrgnnd")
            await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formdata)
                .then((res) => {
                    url = res.data.secure_url
                })
                .catch((err) => console.log(err))
        }
        return url;
    }

    async function submitcontact(data) {
        setdisabled(true);
        setisSaving(true);
        data = { ...data, "url": await uploadimage() }
        axios.put('/api/contacts/' + location.state.userid, data, {
            headers: {
                'auth-token': token
            }
        })
            .then(function (response) {
                console.log("contact saved successfully")
                setdisabled(false);
                setisSaving(false);
                history.goBack();
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                setisSaving(false);
                alert("UNABLE TO SAVE CONTACT")
            })
    }
    function fetchuser(data) {
        setisloading(true)
        setdisabled(true);
        axios.get('/api/contacts/' + location.state.userid, {
            headers: {
                'auth-token': `${token}`
            }
        })
            .then(function (response) {
                setuser(response.data)
                setdisabled(false);
                console.log(user)
                setisloading(false)
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                setisloading(false);
            })
    }

    useEffect(() => {
            try {
                fetchuser()
            } catch (err) {
                history.goBack()
            }
    }, [])

    return (
        <div>
            <div>
                {loading && <div style={{ display: "flex", height: '100vh', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>}
                {!loading &&
                    <Container maxWidth={'xs'} style={{ padding: '5rem' }}>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <IconButton style={{paddingLeft:0,flex:0.1}} onClick={() => history.goBack()}>
                                <ArrowBackIcon/>
                            </IconButton>
                            <h2 style={{flex:0.9}}>EDIT CONTACT</h2>
                            { isSaving &&
                            <CircularProgress color="secondary"/>
                            }
                        </div>

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
                            <p style={{ marginTop: "2rem", fontSize: "small", color: "#777" }}>update image :</p>
                            <input type="file" accept="image/*" onChange={(n) => setimg(n.target.files[0])} />
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
