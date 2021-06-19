import { useHistory } from "react-router-dom";
import TopBar from "../components/topbarapp";
import { Container } from '@material-ui/core';
import ContactCard from "../components/contactCard";
import '../App.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const Appscreen = (props) => {
    let history = useHistory();
    let [contacts, setcontacts] = useState([]);
    let [page, setpage] = useState(1);
    const handleChange = (event, value) => {
        setpage(value);
    };
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
    function addcontact() {
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
                alert('unable to delete.Please try again')
            });
    }

    function editContact(id) {
        history.push({
            pathname: '/app/editContact',
            state: { userid: id }
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
                console.log("unable to fetch. check your network connection")
            });
    }, [token, contacts.length, contacts])

    return (
        <div>

            {token && <div>
                <TopBar logout={logout} add={addcontact} />
                <Container maxWidth='md' >
                    {contacts.length !== 0 &&
                        <div className="contactboard" >
                            {
                                contacts.map((d, k) => {
                                    return (
                                        <ContactCard className="contactCard" key={k} name={d.name} email={d.email}
                                            phone={d.phone} address={d.address} deleteContact={() => deleteContact(`${d._id}`)}
                                            editContact={() => editContact(`${d._id}`)}
                                        />)
                                })
                            }
                        </div>}
                    {
                        contacts.length === 0 && <p>no contacts to display</p>
                    }
                    <div className="fixed">
                    <div style={{ display: 'flex',position:'fixed', bottom:0 ,right:0,left:0 , flexDirection: 'row', justifyContent: "center", alignItems: 'center', margin: "1rem" }}>
                        <Typography variant="caption">page: {page}</Typography>
                        <Pagination color='secondary' count={3} page={page} onChange={handleChange} />
                    </div>
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