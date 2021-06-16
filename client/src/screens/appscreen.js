import { useHistory } from "react-router-dom";


const Appscreen = (props) => {
    let history = useHistory();

    let token = '';
    try {
        token = localStorage.getItem("token")
    } catch (err) {
        token = null
    }
    return (
        <div>
            {token && <div>
                <h1>LOGGED IN SUCCESSFULLY</h1>
                <button onClick={()=>{localStorage.setItem("token",'')
                                    history.goBack()
                }}>
                    LOGOUT</button>
            </div>}
            {!token && <div>
                <h1>Unauthorized Access</h1>
            </div>}
        </div>

    );
}

export default Appscreen;