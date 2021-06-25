import { Container } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddContact = () => {
    let token = localStorage.getItem('token');
    let history = useHistory();
    let [disabled, setdisabled] = useState(false);
    let [img, setimg] = useState('');
    let [isLoading,setLoading] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    async function uploadimage() {
        let url = "https://res.cloudinary.com/dimm0px4q/image/upload/v1624545353/ConnectX/610-6104451_image-placeholder-png-user-profile-placeholder-image-png_mex8pb.jpg"
        if(img !== '')
        {
        let cloudName = "dimm0px4q"
        const formdata = new FormData()
        formdata.append("file", img)
        formdata.append("upload_preset", "jssrgnnd")
        await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formdata)
            .then((res) =>{
                url = res.data.secure_url 
            })
            .catch((err) => console.log(err) )   
        } 
        return url; 
    }

    async function submitcontact(data) {
        setLoading(true)
        setdisabled(true);
        data = {...data,"url": await uploadimage()}
        axios.post('/api/contacts', data, {
            headers: {
                'auth-token': token
            }
        })
            .then(function (response) {
                console.log("contact saved successfully")
                setdisabled(false);
                setLoading(false);
                history.goBack();
            })
            .catch(function (error) {
                console.log(error);
                setdisabled(false);
                setLoading(false);
                alert("UNABLE TO ADD CONTACT")
            })
    }

    return (
        <div>
            <div>
                <Container maxWidth={'xs'} style={{ padding: '3rem' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <IconButton style={{paddingLeft:0,flex:0.1}} onClick={() => history.goBack()}>
                                <ArrowBackIcon/>
                            </IconButton>
                            <h2 style={{flex:0.9}}>ADD CONTACT</h2>
                            { isLoading &&
                            <CircularProgress color="secondary"/>
                            }
                            </div>
                    <form onSubmit={handleSubmit(submitcontact)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=''
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
                            defaultValue=''
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
                        <p style={{ marginTop: "2rem",fontSize:"small",color:"#777"}}>upload image :</p>
                        <input  type="file" accept="image/*"  onChange={(n) => setimg(n.target.files[0])}/>
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
