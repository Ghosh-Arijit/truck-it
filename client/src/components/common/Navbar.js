import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props)=> {
    const { user } = props

    console.log(user)

    return(
        <div className="fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand nav-brand" to="/"><h2 className="text-white">TRUCKIT</h2></Link>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav ml-auto"> 
                        { user.role === "customer" ?

                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/customer">Bookings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/customer/my-profile">My Profile</Link>
                                </li>
                            </React.Fragment> : user.role === "vendor" ?
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/vendor">Bookings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/vendor/vehicles">Vehicles</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/vendor/my-profile">My Profile</Link>
                                </li>
                            </React.Fragment> : user.role === "admin" &&

                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/admin">Bookings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/admin/vehicles">Vehicles</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/admin/users">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white mt-1" to="/admin/my-profile">My Profile</Link>
                                </li>
                            </React.Fragment> 
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to={`/logout`}><button className="btn btn-outline-danger logout">Logout</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Navbar)