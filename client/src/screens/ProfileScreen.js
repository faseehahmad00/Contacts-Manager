import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProfileCard from '../components/profilecard';

const ProfileScreen = () => {
    const classes = useStyles();
    let token = localStorage.getItem('token');
    
    return (
        <div>
            {token &&

                <Container className={classes.root} maxWidth="md">
                    <ProfileCard/>
                </Container>    


            }
            {!token && <p>unauthorized access</p>}
        </div>
    );
}

export default ProfileScreen;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight:"100vh"        
    },
}));