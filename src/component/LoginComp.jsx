import React, { Fragment, useContext, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, CardImg } from 'reactstrap';



import axios from 'axios'
import { AuthContext } from '../App'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom';
const qs = require('querystring')
const api = 'http://localhost:3001'

var Recaptcha = require('react-recaptcha');

function LoginComp(props) {

    const { dispatch } = useContext(AuthContext)

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
        isVerified: false
    }

    const [data, setData] = useState(initialState)

    // specifying your onload callback function
    var callback = function () {
        console.log('Done!!!!');
    };

    // specifying verify callback function
    var verifyCallback = function (response) {
        console.log(response);
        if(response){
            setData({
                ...data,
                isVerified: true
            })
        }
    };

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault()

        if(data.isVerified){
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            })
    
            const requestBody = {
                email: data.email,
                password: data.password
            }
    
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
    
            axios.post(api + '/auth/api/v1/login', qs.stringify(requestBody), config)
                .then(res => {
                    if (res.data.success === true && res.data.isVerified === 1) {
                        dispatch({
                            type: "LOGIN",
                            payload: res.data
                        })
    
                        //redirect ke dashboard
                        props.history.push("/dashboard")
                    }
                    else if(res.data.success === true && res.data.isVerified === 0){
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: "Email anda belum terverifikasi, silahkan cek email!"
                        })
                    }
                    else {
                        setData({
                            ...data,
                            isSubmitting: false,
                            errorMessage: res.data.Message
                        })
                    }
    
                    throw res
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            alert('Anda diduga robot!')
        }
    }

    return (
        <Fragment>
            <Container>
                <br />
                <Row>
                    <Col>
                        <CardImg width="100%" src="https://media.bitdegree.org/storage/media/images/2018/08/what-is-a-web-developer.jpg" />
                    </Col>
                    <Col>
                        <h1>Login Form</h1>
                        <hr />
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email"
                                    value={data.email}
                                    onChange={handleInputChange}
                                    name="email" id="exampleEmail"
                                    placeholder="Email Anda" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password"
                                    value={data.password}
                                    onChange={handleInputChange}
                                    name="password" id="examplePassword" placeholder="Password anda" />
                            </FormGroup>

                            <Recaptcha
                                sitekey="6LfQabkZAAAAAK-AjTDGDIB4VTm0RSEtG0XjmePe"
                                render="explicit"
                                verifyCallback={verifyCallback}
                                onloadCallback={callback}
                            />

                            <br />

                            {data.errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {data.errorMessage}
                                </div>
                            )}

                            <Button disabled={data.isSubmitting}>
                                {data.isSubmitting ? (
                                    "..Loading"
                                ) :
                                    (
                                        "Login"
                                    )
                                }
                            </Button>
                        </Form>
                        <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}



export default LoginComp

