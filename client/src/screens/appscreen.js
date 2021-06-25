import { useHistory } from "react-router-dom";
import TopBar from "../components/topbarapp";
import { Container } from '@material-ui/core';
import ContactCard from "../components/ContactCard";
import '../App.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Appscreen = (props) => {
    const classes = useStyles();
    let history = useHistory();
    let [contacts, setcontacts] = useState([]);
    let [page, setpage] = useState(1);
    let [isLoading,setLoading] = useState(false);
    let perPage = 8;
    let [pageCount,setPageCount] = useState(5);

    //pagination handler
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
    
    function fetchcontacts(){
            axios.get(`/api/contacts/usercontacts?page=${page}&perPage=${perPage}`, {
                headers: {
                    'auth-token': token
                }
            })
                .then(function (response) {
                    setcontacts(response.data)
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("unable to fetch. check your network connection")
                    setLoading(false)
                });
    }

    useEffect(() => {
        fetchcontacts()
    })

    return (
        <div>
            {token && <div>
                <TopBar logout={logout} add={addcontact}/>
                <Container maxWidth='md' >
                    {
                        isLoading &&
                        <div className={classes.errorDiv}>
                            <CircularProgress/>
                        </div>
                    }
                    {
                        contacts.length === 0 &&
                        <div className={classes.errorDiv}>
                            <p>no contacts to display</p>
                        </div>
                    }
                    {contacts.length !== 0 &&
                        <div className={classes.contactboard} >
                            {
                                contacts.map((d, k) => {
                                    return (
                                        <ContactCard key={k} name={d.name} email={d.email} url={d.url}
                                            phone={d.phone} address={d.address} deleteContact={() => deleteContact(`${d._id}`)}
                                            editContact={() => editContact(`${d._id}`)}
                                        />)
                                })
                            }
                        </div>}
                    <div className={classes.pagination}>
                        <Pagination color='secondary' count={pageCount} page={page} onChange={handleChange} />
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


const useStyles = makeStyles((theme) => ({
    contactboard: {
        display: "flex",
        flexFlow:"row wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        margin: "60px 0px",
    },
    pagination: {
        backgroundColor: "rgb(48,63,159,0.3)",
        display: "flex",
        position: "fixed",
        bottom: 0, right: 0, left: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(35px)",
    },
    errorDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    },
}));

export default Appscreen;