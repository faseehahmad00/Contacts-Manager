import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import Accordion from '@material-ui/core/Accordion';
import Button from '@material-ui/core/Button';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PasswordForm from './PasswordForm';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react'

export default function ProfileCard() {
    let history = useHistory();
    const classes = useStyles();
    let [user, setuser] = useState({})
    let [img,setimg] = useState('');

    async function uploadimage() {
        let url = user.url
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

    async function updateImage() {
        let data = {"url":await uploadimage()}
        axios.put('http://localhost:3000/api/users/changeimage',data,{
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                console.log("picture updated successfully")
                window.location.reload(false)                
            })
            .catch(function (error) {
                console.log(error);
                alert("unable to update image")
            })
    }

    function fetchuser(data) {
        axios.get('/api/users/currentuser', {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                setuser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function changepassword(data) {
        console.log(data);
        axios.put('/api/users/changepassword', data, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                alert("password changed successfully")
                window.location.reload(false)
            })
            .catch(function (error) {
                alert("unable to change password.");
            })
    }

    useEffect(() => {
        fetchuser()
    }, [])

    return (
        <Card className={classes.root}>
            <CardContent>
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <IconButton onClick={() => history.goBack()}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h2>PROFILE</h2>
                </div>
                <div className={classes.profileimg}>
                <CloudinaryContext cloudName="dimm0px4q">
                        <Image publicId={user.url} 
                        style={{ height: "100px", width: "100px" ,borderRadius:"100px" }}
                        >
                            <Transformation gravity="face" height="400" width="400" crop="crop" />
                        </Image>
                    </CloudinaryContext>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email: {user.email}
                        <br />
                        Password: ******
                    </Typography>
                    <hr  style={{ marginTop: "2rem",color:"black"}}/>
                    <p style={{fontSize:"small",color:"#777"}}>update image :</p>
                    <input  type="file"  accept="image/*" onChange={(n) => setimg(n.target.files[0])}/>
                    <Button onClick={updateImage}>update</Button>
                </CardContent>
            </CardContent>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Change Password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PasswordForm changepassword={changepassword} />
                </AccordionDetails>
            </Accordion>
        </Card>
    );
}

const useStyles = makeStyles({
    root: {
        width: "400px",
    },
    media: {
        height: "200px",
    },
    profileimg: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});