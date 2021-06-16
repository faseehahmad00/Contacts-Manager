import { useHistory } from "react-router-dom";
import TopBar from "../components/topbarapp";
import { Container } from '@material-ui/core';
import ContactCard from "../components/contactCard";
import '../App.css'

const Appscreen = (props) => {
    let history = useHistory();

    let token = '';
    try {
        token = localStorage.getItem("token")
    } catch (err) {
        token = null
    }

    function logout() {
        localStorage.setItem("token", '')
        history.goBack()
    }

    function deleteContact(name) {
        console.log(`${name} is  deleted`)
    }

    function editContact(name) {
        console.log(`${name} is  editted`)
    }

    return (
        <div>
            {token && <div>
                <TopBar logout={logout} />
                <Container maxWidth='md'>
                <div className="contactboard">
                    <ContactCard name="FASEEH AHMAD" email="faseehahmad00@gmail.com"
                        phone="+923244672725" address="377 LAHORE" deleteContact={() => deleteContact('hello')}
                        editContact={() => editContact('hello')}
                    />

                    <ContactCard name="FASEEH AHMAD" email="faseehahmad00@gmail.com"
                        phone="+923244672725" address="377 LAHORE" deleteContact={() => deleteContact('hello')}
                        editContact={() => editContact('hello')}
                    />

                    <ContactCard name="FASEEH AHMAD" email="faseehahmad00@gmail.com"
                        phone="+923244672725" address="377 LAHORE" deleteContact={() => deleteContact('hello')}
                        editContact={() => editContact('hello')}
                    />

                    <ContactCard name="FASEEH AHMAD" email="faseehahmad00@gmail.com"
                        phone="+923244672725" address="377 LAHORE" deleteContact={() => deleteContact('hello')}
                        editContact={() => editContact('hello')}
                    />
                </div>
                </Container>
            </div>
            }

            {!token && <div>
                <h1>Unauthorized Access</h1>
            </div>}
        </div>

    );
}

export default Appscreen;