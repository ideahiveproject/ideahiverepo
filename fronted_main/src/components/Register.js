import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import myImage from './assets/idea.png';

import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './Navbar/Header';

const Register = () => {
    const [id, idchange] = useState("");

    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");


    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, name, password, email };
        if (IsValidate()) {
        //console.log(regobj);
        fetch("http://localhost:8000/user", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regobj)
        }).then((res) => {
            toast.success('Registered successfully.')

            navigate('/Login');
        }).catch((err) => {
            toast.error('Failed :' + err.message);
        });
    }
}





  return (
    <>
<Header/>

            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
<div>
      <SIgn_img src={myImage} />
    </div>



                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'> Create an account</h3>
                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

<Form.Control type="text" name='username' value={id} onChange={e => idchange(e.target.value)}  placeholder=" username" />


</Form.Group>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="text" name='name'   value={name} onChange={e => namechange(e.target.value)} 
 placeholder=" Full Name" />

                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' value={email} onChange={e => emailchange(e.target.value)}  placeholder=" Email" />

                                
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={e => passwordchange(e.target.value)} placeholder="Password" />

                            </Form.Group>

               

                            
                            <Button variant="primary" className='col-lg-6' style={{ background: "#83dcf5", color: "black" }} type="submit">

                                Sign Up
                            </Button>
                        </Form>
                        <p className='mt-3'>Already Have an Account <span><NavLink to="/login">Longin </NavLink></span> </p>
                    </div>

                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Register


   

    