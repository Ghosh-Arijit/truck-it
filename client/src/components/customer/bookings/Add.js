import React from 'react'
import axios from 'axios'
import Navbar from '../../common/Navbar'
import Select from 'react-select'
import DatePicker from "react-datepicker"

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            pickUp: "",
            dropOff: "",
            pickUpDate: new Date(),
            truck: "",
            diatance: "",
            duration: "",
            amount: "",
            places: {
                status: ""
            },
            volume: null,
            errors: {},
            volumes: [
                { label: "Few Items", value: 5 },
                {label: "1 BHK", value: 5},
                { label: "2 BHK", value: 10 },
                { label: "3 BHK", value: 15 },
                { label: "Custom", value: 20}
            ],
            trucks: []
        }
    }

    componentDidMount(){
        document.title = 'Schedule Booking'
        axios.get(`http://localhost:3005/vehicles`)
            .then(res=> {
                this.setState(()=>({
                    trucks: res.data.map(data =>({label: data.name, value: data._id}))
                }))
            })
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value,
            focusedInput: e.target.name,
            errors: ""
        }))

        if(['pickUp','dropOff'].includes(e.target.name)){
            axios.get(`http://localhost:3005/location/place/${e.target.value}`)
                .then(res => {
                    this.setState(() => ({
                        places: res.data
                    }))
                })
        }
    }

    handleDate = (date) => {
        this.setState(() => ({
            pickup_date: date
        }))
    }

    handleTruckChange = (option) => {
        this.setState(() => ({
            truck: option
        }))
    }

    handleVolumeChange = (option) => {
        this.setState(() => ({
            volume: option
        }))
    }

    updateAddress = (value) => {
        this.setState((prevState) => ({
            [prevState.focusedInput]: value,
            places: {
                status: ""
            }
        }))
    }

    render(){
        const { volumes, trucks, pickUpDate,pickUp,places, dropOff} = this.state
        const formStyle = {boxShadow: '0 0 20px -10px #909090', padding: '50px', margin: '10px 0 20px '}
        return(
            <React.Fragment>
                <Navbar />
                <div className="container">
                    {/* <button type="button" className="btn btn-outline-info  float-right"><Link to="/customer">Back</Link></button> */}
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <h4 className="text-center mt-5">Schedule Booking</h4>
                            <form style={formStyle}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label htmlFor="exampleInput1">PickUp Location</label>
                                        <input type="text" className="form-control mb-4" id="exampleInput1" 
                                        name="pickUp" placeholder="PickUp Location" onChange={this.handleChange}
                                        value={pickUp} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="exampleInput2">DropOff Location</label>
                                        <input type="text" className="form-control mb-4" id="exampleInput2" 
                                        name="dropOff" placeholder="Drop Location" onChange={this.handleChange}
                                        value={dropOff} />
                                    </div>                                 
                                </div>
                                { places.status === "OK" &&                                 
                                <ul className="list-group">
                                    { places.predictions.map((place, index) => {
                                            return (
                                                <li className="list-group-item" key={index} onClick={() => {
                                                    this.updateAddress(place.description)
                                                }}>{place.description}</li>
                                            )
                                        })
                                    }
                                </ul>
                            }
                                <div>
                                    <label htmlFor="exampleInput3">Shifting Date</label>
                                    <DatePicker selected={pickUpDate}
                                                onChange={this.handleDate}
                                                dateFormat="d/M/Y"
                                    />  
                                </div>
                                <div>
                                    <label htmlFor="exampleInput5">Choose Volume</label>
                                        <Select options={volumes} 
                                        onChange={this.handleVolumeChange} 
                                    />   
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="exampleInput5">Choose truck</label>
                                        <Select options={trucks} 
                                        onChange={this.handleTruckChange} 
                                    /> 
                                </div>
                                <button className="btn btn-success btn-lg btn-block mt-4" type="submit">Get A Quote</button>

                            </form>

                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default Add