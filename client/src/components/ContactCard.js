import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react'

const ContactCard = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.contactCard}>
            <Card variant="elevation">
                <div className={classes.contactBody}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            {props.name}
                        </Typography>
                        <Typography color="textSecondary">
                            {props.email}
                        </Typography>
                        <Typography variant="body2" component="p" color="textSecondary">
                            {props.phone}
                            <br />
                            {props.address}
                        </Typography>
                    </CardContent>
                    <CloudinaryContext cloudName="dimm0px4q">
                        <Image publicId={props.url} 
                        style={{ height: "90px", width: "90px" ,borderRadius:"100px" }}
                        >
                            <Transformation gravity="face" height="400" width="400" crop="crop" />
                        </Image>
                    </CloudinaryContext>
                </div>
                <CardActions className={classes.contactAction}>
                    <ButtonGroup variant="outlined">
                        <Button size="small" onClick={props.deleteContact} color="secondary"><DeleteIcon /></Button>
                        <Button size="small" onClick={props.editContact} color="primary"><EditIcon /></Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    contactCard: {
        width: "25em",
        margin: "1rem",
    },
    contactBody: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 1rem"
    },
    contactAction: {
        margin: "0 1rem",
        display: "flex",
        justifyContent: "flex-end"
    }

}));

export default ContactCard;