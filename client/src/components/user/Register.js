import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup'

const Register = (props)=> {
    const { errors, touched, isSubmitting, status}= props
    document.title= 'Register'
    return(
        <div className = "fluid bg-reg ">
            <div className="row ">
                <div className="col-md-4 col-sm-4 col-xs-12 ">
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12 ">
                    <Form className= "form-container-reg">
                        <h5 className="text-center">
                            <span className="badge badge-pill badge-dark">Create a New Account</span>
                        </h5>
                            <div className="form-group pt-2">
                                <Field  type="text" name="name" className="form-control"  placeholder="Full Name" />
                                {touched.name && errors.name && <p className="text-danger">{errors.name}</p>}
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Field  type="email" className="form-control" name="email" placeholder="Email" />
                                    {touched.email && errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                                <div className="form-group col-md-6">
                                    <Field  type="number" className="form-control" name="mobile" placeholder="Mobile" />
                                    {touched.mobile && errors.mobile && <p className="text-danger">{errors.mobile}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Field  type="password" className="form-control" name="password" placeholder="password" />
                                    {touched.password && errors.password && <p className="text-danger">{errors.password}</p>}
                                </div>
                                <div className="form-group col-md-6">
                                    <Field  type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" />
                                    {touched.confirm_password && errors.confirm_password && <p className="text-danger">{errors.confirm_password}</p>}
                                </div>
                            </div>
                    
                            <div className="custom-control custom-radio custom-control-inline">
                                <Field type="radio" name="role" id="customRadio1"  value="customer" className="custom-control-input" />
                                <label className="custom-control-label text-white" htmlFor="customRadio1">Customer</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline ">
                                <Field type="radio" name="role" id="customRadio2" value="vendor" className="custom-control-input"/>
                                <label className="custom-control-label text-white" htmlFor="customRadio2">Vendor</label>
                            </div>
                            { touched.role && errors.role && <p className="text-danger">{errors.role}</p> }
                            <button className="btn btn-success btn-lg btn-block mt-4" type="submit" disabled={isSubmitting}>Register</button>
                        </Form>
                        {status && <p className="text-success">{status.success}</p>}
                        <div>
                            <p className="text-white text-center">Already have an account ? <Link to="signIn">SignIn</Link></p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12 ">
                    </div>
                </div>
            </div>
    )
}

const formikRegister = withFormik({
    mapPropsToValues(){
        return{
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirm_password: "",
            role: ""
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
                  .min(4, "Full Name is too short")
                  .required("Full Name is required"),
        email: Yup.string()
                   .email("Email is not valid")
                   .required("Email is required"),
        mobile: Yup.number()
                    .typeError("Mobile number is invalid")
                    .min(1000000000, "Mobile number is invalid")
                    .max(9999999999, "Mobile number is invalid")
                    .required("Mobile number is required"),
        password: Yup.string()
                      .min(6,"Password is too short")
                      .required("Password is required"),
        confirm_password: Yup.string()
                              .oneOf([Yup.ref('password'),null],"Password dosen't match")
                              .required("Confirmed password is required"),
        role: Yup.string()
                  .required("Role is required")
    }),

    handleSubmit(values, {setErrors, resetForm, setSubmitting,setStatus, props}){
        setStatus({success: ''})

        const vendorRegister= (user)=> {
            console.log(user)
            axios.post('http://localhost:3005/vendor/register', {user})
                .then(res=>{
                    resetForm()
                    window.alert("Successfully Registered")
                    props.history.push('signIn')
                })
        }
        axios.post('http://localhost:3005/register', values)
            .then(res=> {
                console.log(res.data)
                setSubmitting(false)
                if(res.data.errors) {
                    const errors =res.data.errors
                    setErrors({
                        name: errors.name ? errors.name.message: '',
                        email: errors.email ? errors.email.message: '',
                        mobile: errors.mobile ? errors.mobile.message: '',
                        password: errors.password ? errors.password.messsage:'',
                        role: errors.role ? errors.role.message: ''
                    })
                }else {
                        if(res.data.role ==="vendor"){
                            vendorRegister(res.data._id)
                        }else{
                            resetForm()
                            window.alert("Successfully Registered")
                            props.history.push('signIn')
                            
                        }

                }
            })
    }
})(Register)

export default formikRegister