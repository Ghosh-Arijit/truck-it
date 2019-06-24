import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Navbar from "../../common/Navbar"
import Form from "./Form"

class Edit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vehicle: {},
            errors: {}
        }
    }

    componentDidMount(){
        const { user, match } = this.props
        const id = match.params.id
        axios.get(`http://localhost:3005/admin/vehicles/${id}`, {
                headers: { 'x-auth': user.token }
            })
            .then(res => {
                this.setState(() => ({
                    vehicle: res.data
                }))
                document.title = res.data.name 
            })
    }

    handleSubmit = (formdata) => {
        const { user, history, match } = this.props     
        axios.put(`http://localhost:3005/admin/vehicles/${match.params.id}`,formdata,{
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
        const { errors, vehicle } = this.state
        console.log(vehicle)
        return(
            <React.Fragment>
                <Navbar />
                <div className="container">
                    <button type="button" className="btn btn-outline-info mt-4 float-right"><Link to="/admin/vehicles">Back</Link></button>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 mt-5">
                            <h3>Edit Vehicle</h3>
                            <Form handleSubmit={this.handleSubmit}
                                  errors={errors}
                                  vehicle={vehicle}
                            />
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

export default connect(mapStateToProps)(Edit)

