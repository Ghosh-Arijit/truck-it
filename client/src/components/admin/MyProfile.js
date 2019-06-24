import React from 'react'

import Navbar from "../common/Navbar"

const MyProfile = (props) => {

    document.title = 'Profile | Admin '
    
    return (
        <React.Fragment>
            <Navbar />
            <div className="container">
            </div>
        </React.Fragment>
    )
}

export default MyProfile