import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Navbar from "../common/Navbar"
import { updateUser } from "../../actions/user"

class MyProfile extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            customer: {
                new_password: "",
                confirm_password: ""
            },
            errors:{
                name: "",
                email: "",
                mobile: "",
                password: ""
            },
            passwordError: false,
            success: ""   
        }
    }

    componentDidMount(){
        const {user} = this.props
        document.title = user.name
        this.setState((prevState)=> ({
            customer: {...prevState.customer,...user}
        }))
    }

    handleChange = (e) => {
        e.persist()
        this.setState((prevState) => ({
            customer: {...prevState.customer, ...{[e.target.name]: e.target.value}}
        }))
    }

    handleSubmit= (e) => {
        e.preventDefault()
        const {name,new_password, confirm_password}= this.state.customer
        const { user }= this.props
        if(new_password === confirm_password){
            this.setState(() => ({
                passwordError: "",
            }))
            const formdata = {
                name,
                password: new_password
            }
            axios.put(`http://localhost:3005/update_profile`,formdata,{
                headers: { 'x-auth': user.token }
            })
            .then(res=> {
                if(res.data.success){
                    this.setState((prevState)=>({
                        success: "Successfull updated",
                        errors: {},
                        customer: {...prevState.customer,...{new_password:'',confirm_password:''}}
                    }))
                    delete formdata.password
                    this.props.dispatch(updateUser(formdata))
                }else{
                    this.setState(() => ({
                        success: "",
                        errors: res.data.errors,
                    }))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }else{
        this.setState(() => ({
            passwordError: "Passwords don't match"
        }))
    }
  }
  render(){
    const { customer,errors, passwordError,success } = this.state
    const formStyle = {boxShadow: '0 0 20px -10px #909090', padding: '50px', margin: '30px 0 20px '}
    return(
        <React.Fragment>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <React.Fragment>
                                                            
                        <form style={formStyle} onSubmit={this.handleSubmit}>
                                    { success && <p className="text-success">{ success }</p> }
                                    <h4 className="text-center">
                                        <span className="badge badge-pill badge-dark">Personal Details</span>
                                    </h4>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputName1">Fullname</label>
                                        <input type="text" className="form-control"  value={customer.name} onChange={this.handleChange} name="name" id="exampleInputName1"  />
                                        { errors.name && <p className="text-danger">{ errors.name.message }</p> }

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input type="email" className="form-control" value={customer.email} name="email"  id="exampleInputEmail1" disabled />
                                        { errors.email && <p className="text-danger">{ errors.email.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPhone">Mobile</label>
                                        <input type="number" className="form-control"   value={customer.mobile} name="mobile"  id="exampleInputPhone" disabled />
                                        { errors.mobile && <p className="text-danger">{ errors.mobile.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">New Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" value={customer.new_password} onChange={this.handleChange} name="new_password" placeholder="New Password" />
                                        { errors.password && <p className="text-danger">{ errors.password.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword2" value={customer.confirm_password} onChange={this.handleChange} name="confirm_password"  placeholder="Confirm Password" />
                                        { passwordError && <p className="error">{ passwordError }</p>}
                                    </div>
                                    <button type="submit" className="btn btn-success btn-lg btn-block">Update</button>
                                </form> 

                        </React.Fragment>

                    </div>

                </div>

            </div>
        </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MyProfile)