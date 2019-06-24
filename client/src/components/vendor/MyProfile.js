import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Navbar from "../common/Navbar"
import FancyBox from 'react-fancybox'
import { updateUser } from "../../actions/user"

class MyProfile extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            vendor: {
                new_password: "",
                confirm_password: ""
            },
            //personalDetails: false,
            personalErrors: {
                name: "",
                email: "",
                mobile: "",
                password: ""
            },
            personalSuccess: "",
            passwordError: "",

            business: {},
            //businessDetails: false,
            businessErrors: {},
            businessSuccess: ""
            
        }
    }
    componentDidMount(){
        const {user}= this.props
        document.title= user.name
        this.setState((prevState)=>({
            vendor: {...prevState,...user},
            //personalDetails:true
        }))

        axios.get('http://localhost:3005/vendor',{headers: {'x-auth': user.token}
        })
        .then(res=> {
            if(res.data.success){
                const vendor = res.data.success
                this.setState(()=>({
                    business: {
                        address: (vendor.address && vendor.address.full) ? vendor.address.full : "",
                        pincode: (vendor.address && vendor.address.pincode) ? vendor.address.pincode : "",
                        bank_account_number: (vendor.payment && vendor.payment.bank_account && vendor.payment.bank_account.number) ? vendor.payment.bank_account.number : "",
                            bank_account_ifsc: (vendor.payment && vendor.payment.bank_account && vendor.payment.bank_account.IFSC_code) ? vendor.payment.bank_account.IFSC_code : "",
                            //pan: (vendor.document && vendor.document.pan) ? vendor.document.pan : "",
                            aadhar: (vendor.document && vendor.document.aadhar) ? vendor.document.aadhar : "",
                            //_pan: (vendor.document && vendor.document.pan) ? vendor.document.pan : "",
                            _aadhar: (vendor.document && vendor.document.aadhar) ? vendor.document.aadhar : ""
                    },
                    //businessDetails: true
                }))
            }
        })
    }
    handlePersonalChange = (e) => {
        e.persist()
        this.setState((prevState) => ({
            vendor: {...prevState.vendor, ...{[e.target.name]: e.target.value}}
        }))
    }

    handleBusinessChange = (e) => {
        e.persist()
        this.setState((prevState) => ({
            business: {...prevState.business, ...{[e.target.name]: e.target.value}}
        }))
    }

    handlePersonalSubmit =(e) => {
        e.preventDefault()
        const { name,new_password, confirm_password} = this.state.vendor
        const { user } = this.props
        if(new_password === confirm_password){
            this.setState(() => ({
                passwordError: "",
                //personalSubmitting: true
            }))
            const formData = {
                name,
                //email,
                password: new_password,
                //mobile
            }
            axios.put(`http://localhost:3005/update_profile`,formData, {headers: { 'x-auth': user.token }
            })
                .then(res=> {
                    // this.setState(()=> ({
                    //     personalSubmitting: false
                    // }))
                    if(res.data.success){
                        this.setState((prevState)=>({
                            personalSuccess: "Successfully Updated",
                            personalErrors: {},
                            personalSubmitting: false,
                            vendor: {...prevState.vendor,...{new_password: '',confirm_password:''}}
                        }))
                        delete formData.password
                        this.props.dispatch(updateUser(formData))
                    }else{
                        this.setState(() => ({
                            personalSuccess: "",
                            personalErrors: res.data.errors,
                           // personalSubmitting: false
                        }))
                    }
                }).catch(err=>{
                    console.log(err)
                })
        }else{
            this.setState(()=>({
                passwordError: "Passwords don't match"
            }))
        }
    }

    handleBusinessSubmit =(e)=> {
        e.preventDefault()
        const {address,pincode,bank_account_number,bank_account_ifsc,aadhar}= this.state.business
        const { user }= this.props
        // this.setState(()=>({
        //     businessSubmitting: true
        // }))

        const formData= new FormData()
        formData.append('address', address)
        formData.append('pincode', pincode)
        formData.append('bank_account_number', bank_account_number)
        formData.append('bank_account_ifsc', bank_account_ifsc)
        formData.append('aadhar', aadhar)

        axios.put('http://localhost:3005/vendor',formData,{headers: {'x-auth': user.token}
            })
            .then(res => {
                // this.setState(()=>({
                //     businessSubmitting:false
                // }))
                if(res.data.success){
                    this.setState((prevState)=>({
                        business: {...prevState.business, ...{_aadhar: res.data.success.document.aadhar}},
                        businessSuccess: "Successfully Updated",
                        businessErrors: {},
                       // businessSubmitting: false
                    }))
                }else{
                    this.setState(() => ({
                        businessSuccess: "",
                        businessErrors: res.data.errors,
                       // businessSubmitting: false
                    }))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleFileChange = (e) => {
        e.persist()
        this.setState((prevState) => ({
            business: {...prevState.business, ...{[e.target.name]: e.target.files[0]}}
        }))
    }
    


    render(){
        const { vendor, business,personalErrors, businessErrors, passwordError, personalSuccess, businessSuccess } = this.state
        const formStyle = {boxShadow: '0 0 20px -10px #909090', padding: '50px', margin: '50px 0 0'}
        return(
            <React.Fragment>
            <Navbar />
                <div className="container">
                    <div className="row">
                    {/* personal details */}
                        <div className="col">
                            <React.Fragment>
                
                                <form style={formStyle} onSubmit={this.handlePersonalSubmit}>
                                    { personalSuccess && <p className="text-success">{ personalSuccess }</p> }
                                    <h4 className="text-center">
                                        <span className="badge badge-pill badge-dark">Personal Details</span>
                                    </h4>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputName1">Fullname</label>
                                        <input type="text" className="form-control"  value={vendor.name} onChange={this.handlePersonalChange} name="name" id="exampleInputName1"  />
                                        { personalErrors.name && <p className="text-danger">{ personalErrors.name.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input type="email" className="form-control" value={vendor.email} name="email"  id="exampleInputEmail1" disabled />
                                        { personalErrors.email && <p className="text-danger">{ personalErrors.email.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPhone">Mobile</label>
                                        <input type="number" className="form-control"   value={vendor.mobile} name="mobile"  id="exampleInputPhone" disabled />
                                        { personalErrors.mobile && <p className="text-danger">{ personalErrors.mobile.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">New Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" value={vendor.new_password} onChange={this.handlePersonalChange} name="new_password" placeholder="New Password" />
                                        { personalErrors.password && <p className="text-danger">{ personalErrors.password.message }</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword2" value={vendor.confirm_password} onChange={this.handlePersonalChange} name="confirm_password"  placeholder="Confirm Password" />
                                        { passwordError && <p className="error">{ passwordError }</p>}
                                    </div>
                                    <button type="submit" className="btn btn-success btn-lg btn-block">Update</button>
                                </form> 
                            </React.Fragment> 
                        </div>
                        <div className="col">
                            <React.Fragment>
                                <form style={formStyle} onSubmit={this.handleBusinessSubmit}>
                                    {businessSuccess && <p className="text-success">{ businessSuccess }</p> }
                                    <h4 className="text-center">
                                        <span className="badge badge-pill badge-dark">Business Details</span>
                                    </h4>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputAddress">Address</label>
                                        <textarea  type="text" className="form-control" value={business.address} onChange={this.handleBusinessChange} name="address" id="exampleInputAddress" rows="4" />
                                        {businessErrors['address.full'] && <p className="text-danger">{businessErrors['address.full'].message}</p> } 
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPincode1">Pincode</label>
                                        <input type="number" className="form-control" value={business.pincode} onChange={this.handleBusinessChange} name="pincode"  id="exampleInputPincode1" placeholder="Pincode" />
                                        {businessErrors['address.pincode'] && <p className="text-danger">{businessErrors['address.pincode'].message}</p> } 
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputAccount">Bank Account</label>
                                        <input type="text" className="form-control" id="exampleInputAccount" value={business.bank_account_number} onChange={this.handleBusinessChange} name="bank_account_number"  placeholder="Bank account number" />
                                        { businessErrors['payment.bank_account.number'] && <p className="text-danger">{businessErrors['payment.bank_account.number'].message}</p> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputIFSC1">Bank IFSC</label>
                                        <input type="text" className="form-control" id="exampleInputIFSC1" value={business.bank_account_ifsc} onChange={this.handleBusinessChange} name="bank_account_ifsc"  placeholder="Bank IFSC" />
                                        {businessErrors['payment.bank_account.ifsc'] && <p className="text-danger">{businessErrors['payment.bank_account.ifsc'].message}</p> }
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-7">
                                            <label htmlFor="exampleFormControlFile1">Aadhar Card</label>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={this.handleFileChange} name="aadhar"  />
                                        </div>
                                        <div className="col-md-5">
                                            { business._aadhar && 
                                                <FancyBox thumbnail={`http://localhost:3005/uploads/${business._aadhar}`} 
                                                image={`http://localhost:3005/uploads/${business._aadhar}`}  />
                                            }
                                    </div>
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