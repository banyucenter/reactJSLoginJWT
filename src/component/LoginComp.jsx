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
        isSubmitting: false,
        errorMessage: null,
        isVerified: false
    }

    const stateForm = {
        email: "",
        password: ""
    }
    

    const [data, setData] = useState(initialState)
    const [dataform, setDataForm] = useState(stateForm)

    // specifying your onload callback function
    var callback = () => {
        console.log('Done!!!!');

    };

    // specifying verify callback function
    var verifyCallback = (response) => {
        console.log(response);
        if (response) {
            setData({
                ...data,
                isVerified: true
            })
        }
    };

    const handleInputChange = event => {
        setDataForm({
            ...dataform,
            [event.target.name]: event.target.value,
        })

    }

    const handleFormSubmit = event => {
        event.preventDefault()

        if (data.isVerified) {
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            })

            const requestBody = {
                email: dataform.email,
                password: dataform.password
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
                    else if (res.data.success === true && res.data.isVerified === 0) {
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
                                <Input
                                    type="email"
                                    onChange={handleInputChange}
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="Email Anda"
                                    value={dataform.email}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    onChange={handleInputChange}
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Password anda"
                                    value={dataform.password}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Recaptcha
                                    onloadCallback={callback}
                                    sitekey="6LfQabkZAAAAAK-AjTDGDIB4VTm0RSEtG0XjmePe"
                                    render="explicit"
                                    verifyCallback={verifyCallback}
                                />
                            </FormGroup>

                            <FormGroup>
                                {data.errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {data.errorMessage}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Button disabled={data.isSubmitting}>
                                    {data.isSubmitting ? (
                                        "..Loading"
                                    ) :
                                        (
                                            "Login"
                                        )
                                    }
                                </Button>
                            </FormGroup>
                        </Form>
                        <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}



export default LoginComp

