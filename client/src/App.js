import React from 'react';
import './App.css';
import { connect } from 'react-redux'

import Spinner from './components/common/Spinner'

//Routes
import VendorRoute from "./components/route/VendorRoute"
import CustomerRoute from "./components/route/CustomerRoute"
import AdminRoute from "./components/route/AdminRoute"

//Admin
import AdminViewAllBookings from "./components/admin/bookings/ViewAll"
import AdminViewAllVehicles from "./components/admin/vehicles/ViewAll"
import AdminAddVehicle from "./components/admin/vehicles/Add"
import AdminEditVehicle from "./components/admin/vehicles/Edit"
import AdminProfile from "./components/admin/MyProfile"
import Users from "./components/admin/Users"

//User
import Register from './components/user/Register'
import SignIn from './components/user/SignIn'
import LogOut from "./components/user/LogOut"

//Customer
import CustomerBooking from "./components/customer/bookings/Add"
import CustomerProfile from "./components/customer/MyProfile"

//Vendor
import VendorProfile from "./components/vendor/MyProfile"
import VendorBooking from "./components/vendor/Booking"
import VendorViewAllVehicles from "./components/vendor/vechiles/ViewAll"
import VendorAddVehicle from "./components/vendor/vechiles/Add"
import VendorEditVehicle from "./components/vendor/vechiles/Edit"



import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App= (props)=> {
  return(
    <BrowserRouter> 
    { props.user.status  ?
      <Switch>
        <Route path="/" component={Register} exact={true} />
        <Route path="/signIn" component={SignIn} exact={true} />
        <Route path="/LogOut" component={LogOut} exact={true} />

        <CustomerRoute path="/customer" component={CustomerBooking} exact={true} />
        <CustomerRoute path="/customer/my-profile" component={CustomerProfile} exact={true} /> 

        <VendorRoute path="/vendor" component={VendorBooking} exact={true} />
        <VendorRoute path="/vendor/my-profile" component={VendorProfile} exact={true} /> 

        <VendorRoute path="/vendor/vehicles" component={VendorViewAllVehicles} exact={true} />
        <VendorRoute path="/vendor/vehicles/add" component={VendorAddVehicle} exact={true} />
        <VendorRoute path="/vendor/vehicles/edit/:id" component={VendorEditVehicle} exact={true} />

        <AdminRoute path="/admin" component={AdminViewAllBookings} exact={true} />
        <AdminRoute path="/admin/users" component={Users} exact={true} />
        <AdminRoute path="/admin/my-profile" component={AdminProfile} exact={true} />
        <AdminRoute path="/admin/vehicles" component={AdminViewAllVehicles} exact={true} />
        <AdminRoute path="/admin/vehicles/add" component={AdminAddVehicle} exact={true} />
        <AdminRoute path="/admin/vehicles/edit/:id" component={AdminEditVehicle} exact={true} />
      </Switch>
    : <div className="text-center mt-5 mb-5"><Spinner /></div>
  }
  </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(App)
