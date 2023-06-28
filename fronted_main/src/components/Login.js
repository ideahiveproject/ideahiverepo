import React, {useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Loginimage from './Loginimage'
import image from  './assets/yellowidea.png';

import { NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Navbar/Header';



const Login = () => {


    const [username, usernameupdate] = useState('');

const [password, passwordupdate] = useState('');

const usenavigate=useNavigate();

// useEffect(()=>{
// sessionStorage.clear();
// },[]);

const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {

     ///implentation
        console.log('proceed');
        fetch("http://localhost:8000/user/" + username).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp)
            if (Object.keys(resp).length === 0) {
                toast.error('Please Enter valid username');
            } else {
                if (resp.password === password) {
                    toast.success('Success');
                    sessionStorage.setItem('username',username);
                    sessionStorage.setItem('userrole',resp.role);
                    usenavigate('/ProfileInvestorWrapper')
                }else{
                    toast.error('Please Enter valid credentials');
                }
            }
        }).catch((err) => {
            toast.error('Login Failed due to :' + err.message);
        });
    }
}


const validate = () => {
    let result = true;
    if (username === '' || username === null) {
        result = false;
        toast.warning('Please Enter email');
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning('Please Enter Password');
    }
    return result;
}





 

    return (
        <>
        <Header/>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                  <div>
                    <Loginimage src={image} />
                    </div>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Log IN</h3>
                        <Form onSubmit={ProceedLogin}>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="text" name='username'  value={username} onChange={e => usernameupdate(e.target.value)} placeholder=" user name" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' value={password} onChange={e => passwordupdate(e.target.value)}  placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6'  style={{ background: "#f3f88a", color: "black" }} type="submit">
                                Login
                            </Button>
                        </Form>
                        <p className='mt-3'>Don't Have an Account <span><NavLink to="/Register">Sign Up</NavLink></span> </p>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login