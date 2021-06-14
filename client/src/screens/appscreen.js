import { useLocation } from "react-router-dom";

const Appscreen = (props) => {
    const location = useLocation();
    let token = '';
    try {
        token = location.state.token
    } catch (err) {
        token = null
    }
    return (
        <div>
            {token && <div>
                <h1>LOGGED IN SUCCESSFULLY</h1>
            </div>}
            {!token && <div>
                <h1>Unauthorized Access</h1>
            </div>}
        </div>

    );
}

export default Appscreen;