import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import '../App.css'

const contactCard = (props) => {
    return (
        <div className="card">
        <Card variant="elevation">
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
            <CardActions>
                <ButtonGroup variant="contained" aria-label="text primary button group">
                    <Button size="small" onClick={props.deleteContact} startIcon={<DeleteIcon />} color="secondary">Delete</Button>
                    <Button size="small" onClick={props.editContact} startIcon={<EditIcon />} color="primary">Edit</Button>
                </ButtonGroup>
            </CardActions>
        </Card>
        </div>
    );
}

export default contactCard;