import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useEffect} from "react";

const PasswordForm = (props) => {
    const classes = useStyles();
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        fetchUser();
    },[])

    function fetchUser(){
        console.log("fetching user");
    }

    return (
        <div>
        <form className={classes.form} onSubmit={handleSubmit(props.changepassword)}>
        <Controller
          name="old"
          control={control}
          defaultValue=''
          render={({ field }) => <TextField
            required
            type='password'
            {...register("old", { minLength: 4 })}
            error={errors.old ? true : false}
            fullWidth label='old' {...field}
            className={classes.inputfiled}
          />
          }
        />
        <Controller
          name="new"
          control={control}
          defaultValue=''
          render={({ field }) => <TextField
            required
            type='password'
            {...register("new", { minLength: 4 })}
            error={errors.new ? true : false}
            fullWidth label='new' {...field}
            className={classes.inputfiled}
          />
          }
        />

        <Controller
          name="confirm"
          control={control}
          defaultValue=''
          render={({ field }) => <TextField
            type='password'
            required
            {...register("confirm", { minLength: 4 })}
            error={errors.confirm ? true : false}
            fullWidth label='confirm' {...field}
            className={classes.inputfiled}
          />
          }
        />

        <Button
          className={classes.button}  
          type='submit'
          variant='contained'
          color="secondary"
        >
          CHANGE PASSWORD
        </Button>
      </form>
        </div>
      );
}
 
const useStyles = makeStyles({  
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent:"center"
    },
    inputfiled: {
      width: " 80%",
      maxWidth: "350px",
      minWidth: "250px",
      height: "40px",
      margin: "1rem"
    },
    button: {
      marginTop: '1rem',
    },
  });
  
export default PasswordForm;
