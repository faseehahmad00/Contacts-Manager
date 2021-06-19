import { useHistory } from "react-router-dom";
import TopBar from "../components/topbarapp";
import { Container } from '@material-ui/core';
import ContactCard from "../components/contactCard";
import '../App.css'
import { useEffect, useState } from "react";
import axios from 'axios'

const Appscreen = (props) => {
    let history = useHistory();
    let [contacts, setcontacts] = useState([]);
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
    function addcontact(){
        history.push('/app/addContact')
    }
    function deleteContact(id) {
        axios.delete(`/api/contacts/${id}`, {
            headers: {
                'auth-token': token
            }
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function editContact(id) {
        history.push({
            pathname: '/app/editContact',
            state: { userid :  id}
          })
    }

    useEffect(() => {
        axios.get('/api/contacts/usercontacts', {
            headers: {
                'auth-token': token
            }
        })
            .then(function (response) {
                setcontacts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [token,contacts.length])

    return (
        <div>

            {token && <div>
                <TopBar logout={logout} add={addcontact} />
                <Container maxWidth='md'>
                    {contacts.length !== 0 && <div className="contactboard">
                        {
                            contacts.map((d, k) => {
                                return (
                                    <ContactCard key={k} name={d.name} email={d.email}
                                        phone={d.phone} address={d.address} deleteContact={() => deleteContact(`${d._id}`)}
                                        editContact={() => editContact(`${d._id}`)}
                                    />)
                            })

                        }
                    </div>}
                    {
                            contacts.length === 0 && <p>no contacts to display</p>
                        }

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