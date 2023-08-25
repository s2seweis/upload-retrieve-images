import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';


const Home = () => {

    // # need get the user id state - here with redux store
    // const { settings1 } = useSelector(state => state.settingsReducer);

    const [data, setData] = useState([]);
    console.log("line:1", data)
    console.log("line:2", data)

    // const[totalusers, setTotalUsers] = useState([]);
    // console.log("line:3", totalusers);

    const [show, setShow] = useState(false);

    const getUserData = async () => {
        const res = await axios.get("/getdata", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            setData(res.data.getUser)
        }

    }

    const dltUser = async (id) => {
        const res = await axios.delete(`/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            getUserData()
            setShow(true)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    // useEffect(() => {
    //     setTotalUsers(data)
    // }, [data])

    return (
        <>
            {
                show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    User Delete
                </Alert> : ""
            }
            <div className='container mt-2'>
                <h3 className='text-center mt-2'>MERN(Mango,Express,React,Node) Image Upload Project</h3>
                <div className='text-end'>
                    <Button variant="primary"><NavLink to="/register" className="text-decoration-none text-light">Add User</NavLink></Button>
                </div>

                <div className='row d-flex justify-content-between align-iteams-center mt-5'>

                    {
                        data.length > 0 ? data.map((el, i) => {
                            return (
                                <>
                                    <Card style={{ width: '22rem', height: "auto", margin: "20px auto" }} className="mb-3">
                                        <div style={{ margin: "auto" }}>
                                            {/* <Card.Img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto" }} src={`/uploads/${el.imgpath}`} className='mt-2' /> */}
                                            <img style={{ width: "100px", margin: "20px auto" }} src={`/uploads/${el.imgpath}`} ></img>
                                            <img style={{ width: "100px", margin: "20px auto" }} src={el.image} ></img>
                                        </div>
                                        <h5 style={{ fontSize: "10px", textAlign: "center" }}>Right - Image:convertToBase64</h5>
                                        {/* <img style={{width:"100px", margin:"20px auto"}} src={el.image} ></img> */}
                                        <Card.Body className='text-center'>
                                            <Card.Title>User Name : {el.fname}</Card.Title>
                                            <Card.Text>
                                                Date Added :{moment(el.date).format("L")}
                                            </Card.Text>
                                            <h4>{el._id}</h4>
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <Button variant="danger" className='col-lg-6 text-center' onClick={() => dltUser(el._id)}>Delete</Button>
                                                {/* <Button variant="danger" classNamecol-lg-6 text-center' onClick={() => dltUser(el._id)}>Edit</Button> */}
                                                {/* <Button variant="danger" className="col-lg-6 text-center">Edit */}

                                                    <Link
                                                   to={`/edituser/${el._id}`}
                                                    // to={`/edituser/${el._id}`}
                                                    >Edit</Link>

                                                {/* </Button> */}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        }) : ""
                    }
                </div>
            </div>
        </>
    )
}

export default Home