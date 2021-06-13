import { useLocation } from "react-router-dom";

const Appscreen = (props) => {
    const location = useLocation();
    console.log(props)
    return ( 
        <div>
            <h1>THIS IS MAIN APP SCREEN</h1>
            <p>user token is {location.state.token} </p>
        </div>
     );
}
 
export default Appscreen;