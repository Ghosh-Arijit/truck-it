import React from 'react'
import {Container, Row, Col, Form, Button, Badge} from 'react-bootstrap'
import { setUser } from '../../actions/user'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            mobile_email: '',
            password: '',
            error: "",
            isSubmitting: false
        }

    }

    handleSubmit= (e)=> {
        e.preventDefault()
        //const self = this
        const {mobile_email, password}= this.state
        if(mobile_email === '' || password ===''){
            this.setState(()=>({
                error: "invalid credentials"
            }))
        }else{
            this.setState(()=>({isSubmitting: true}))
            axios.post('http://localhost:3005/login', {mobile_email, password})
                .then(res=>{
                    if(res.data.errors){
                        this.setState(()=>({
                            error: res.data.errors,
                            isSubmitting: false,
                            password: ""
                        }))
                    }else{
                        this.setState(()=> ({
                            isSubmitting: false,
                            mobile_email: "",
                            password: "",
                            error: ""
                        }))
                        this.props.dispatch(setUser(res.data))
                        localStorage.setItem('token',JSON.stringify(res.data.token))
                        window.alert('Success')
                        this.props.history.push(`/${res.data.role}`)
                   }
                })
        }
    }
    componentDidMount(){
        document.title = "SignIn"
    }

    handleChange= (e)=> {
        e.persist()
        this.setState(()=> ({
            [e.target.name]: e.target.value
        }))
        
    }

    render() {
        return(
                <Container fluid="true" className="bg">
                    {/* <Image src="image/trucks.jpg" alt="" className="bg" /> */}
                        <Row>
                            <Col md={4} sm={4} xs={12}>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                            <Form onSubmit= {this.handleSubmit} className= "form-container">
                                <h2 className="text-center">
                                    <Badge pill variant="dark">Login</Badge>
                                </h2>
                                <Form.Group controlId="formBasicText">
                                    <Form.Label className="text-white">Email / Mobile</Form.Label>
                                    <Form.Control type="text" name="mobile_email" value={this.state.mobile_email} onChange={this.handleChange} placeholder="Enter Email / Mobile" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label className="text-white">Password</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check type="checkbox" label="Remember Me" className="text-white" />
                                </Form.Group>
                                <Button variant="success" size="lg" block type="submit">
                                    Submit
                                </Button>
                                { this.state.error && <p className="text-danger text-center mt-3">{this.state.error}</p> }
                            </Form>
                            <div>
                            <p className="text-white text-center">Don't have an account ? <Link to="register">Create new</Link></p>
                            </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                
                            </Col>

                        </Row>

                </Container>

        )
    }
}

const mapStateToProps= (state)=> {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(SignIn)