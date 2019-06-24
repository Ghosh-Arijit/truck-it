import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Navbar from "../../common/Navbar"
import Form from "./Form"

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            errors: {}
        }
    }

    componentDidMount(){
        document.title = 'Add Vehicle'
    }

    handleSubmit = (formdata) => {
        const { user, history } = this.props

        axios.post(`http://localhost:3005/admin/vehicles`,formdata,{
                headers: { 'x-auth': user.token }
            })
            .then(res => {
                if(res.data.success){
                    history.push(`/admin/vehicles`)
                }else{
                    this.setState(() => ({
                        errors: res.data.errors
                    }))
                }
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        const { errors }= this.state

        return(
            <React.Fragment>
                <Navbar />
                <div className="container">
                    {/* <ul>
                        <li><Link  to="/admin/vehicles">Back</Link></li>
                    </ul> */}
                    <button type="button" className="btn btn-outline-info mt-4 float-right"><Link to="/admin/vehicles">Back</Link></button>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 mt-5">
                            <h3>Add Vehicle</h3>
                                <Form handleSubmit={this.handleSubmit}
                                    errors={errors}/>
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

export default connect(mapStateToProps)(Add)