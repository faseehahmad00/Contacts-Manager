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
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PasswordForm from './PasswordForm';

export default function ProfileCard() {
    let history = useHistory();
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                <IconButton onClick={() => history.goBack()}>
                    <ArrowBackIcon />
                </IconButton>
                <h2>PROFILE</h2>
                </div>
                <div className={classes.profileimg}>
                    <Avatar
                        style={{ height: "5em", width: "5em", alignSelf: "center" }}
                        alt="Remy Sharp" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANDQ0NDQ0NDg4NDQ0NDQ0NDQ8NEA0PFhEWGBcRExMYHSggGBolGxUXITEiJSkrLi4uGR8zODM4NygtLisBCgoKDQ0NDg0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EADUQAQACAAMGAggGAQUAAAAAAAABAgMEEQUhMUFRcRJhEyIygZGhscFCUmJygtEzFCOS4fD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAItaIjWZiIjjM7oBI0cbamHXdGt58o3fGWrfa9vw0rHfW39AuBSxtfE51pPutH3ZsPbEfipMedZ1BaDBgZumJ7No16Tun4M4AAAAAAAAAAAAAAAAAAAAAK/aed8EeCk+tMb5/LH9g9Z3aEYfq19a/TlXup8fHtiTre0z0jlHaGPUVAAAABv5TaVqaRfW1ev4o/toIB1OHeLRFqzExPCYenP7PzforaT7Fp9aOnm6CJRQAAAAAAAAAAAAAAAAAGPMYsYdLXnlHxno5vEvNpm075mdZWm28XdSnX1p+33VKoAAAAAACEgLvZGP4sPwzxppH8eSkbmycTw4sRytE1n6x9AXwCKAAAAAAAAAAAAAAAAoNq31xrfpisfLX7tRnz3+bE/dLAqISAAAAACEgDJl7aXpPS9Z+bGmvGO8A6kBFAAAAAAAAAAAAAAAAc9tKumNfzmJ+MQ1m/tqP92POkfWWgqAhIAAAhIAADJl664lI63r9WNtbLjXGp/KflIOgARQAAAAAAAAAAAAAB4xb+GtrflrNvhD2xZquuHiR1paPkDncbFm9ptadZn5eUPAKgAAAAAAAA9UvNZ1rMxMcJh5AdFkMSbYVLWnWZidZ675bDDk6eHCpHSsa92ZFAAAAAAAAAAAAAAAAc1m8H0eJavKJ1jzjkxOhzuUjFjpaOFvtPkp83k7YMVm0xPimY3a7lRrCEggSgBIgBIAhnyeD6TErXlrrbtHFl2dlIxbW8WsVrHGOv/tVxlcrXCiYrrv4zO+ZBngBFAAAAAAAAAAAAAAAAGHN4EYtJrPeJ6SzAOXvSazNbRpMTpMPKy23WItSdN8xOs9dFaqAAAACa1mZiIjWZnSI6obux4icXtS0x5TrALXJZf0VIrz42nrLYBFAAAAAAAAAAAAAAAAAAAAVG3OOH2v9lWtNuccPtf7KxUAAEJAQ39jf5Z/Zb6w0W9sb/LP7LfWAXgCKAAAAAAAAAAAAAAAAAiZ03zuBKJnSNZ3RHGWlmNp0rur68+XD4qvNZ2+LumdK/ljdHv6g9bQzEYuJrHs1jw18/NqoSqAgBIhIDNlMb0eJW/KJ39ubCA6jDvFoi1Z1ieEw9Oby2avhT6s7udZ3xPuWmX2rS268eCevGEVYCK2iY1iYmOsTrCQAAAAAAAAAAAeMXFrSNbWiI8we3jExIrGtpiI6zOiszO1uWHGn6rfaFbiYlrzraZmfMFpmNrRG7Drr+q26PgrsbMXxPbtM+XCPgxCoAAhIAgSAAAAAhIA94WNak60tNe3PvCxy+1uWJX+VfvCrAdNg41bxrS0T24x3hkctS01nWszExzidFhltq2jdiR4o/NG6f+0VcjFgZiuJGtLRPWOcd4ZQAAAAETOm+XnFxIpWbWnSIUWdztsWdPZpyr17g3c3tWI9XC3z+aeHu6qrFxJvOtpmZ83gVEggEggEiAEiAEiAEiAEiAEiEgCAEiAHqtpidYmYmOExulZ5TavLF/5xH1hVAOppeLRExMTE8Jje9OcymathTrG+J41nhK+y+PXErFq++OcT0lFZQAUe1sx4r+CPZpu725y0U3traZ6zMoVAAAQkAAAAAAAAAgAAAAAAAAAAAGzkMx6PEifw23W7dWsA6kUf+ut1EVpAKgAAAAAAAAAAAAAAAAAAAAAAAAACAAf/2Q==" />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        FASEEH AHMAD
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email: faseehahmad00@gmail.com
                        <br />
                        Password: ******
                    </Typography>
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
                    <PasswordForm/>
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