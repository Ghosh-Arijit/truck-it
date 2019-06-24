import React from 'react'

class Form extends React.Component{
    constructor(props){
        //console.log("hi", props)
        console.log('form',props)
        super(props)
        this.state = {
            name: props.vehicle ? props.vehicle.name : "",
            image: props.vehicle ? props.vehicle.image : "",
            _length: props.vehicle && props.vehicle.dimension ? props.vehicle.dimension._length : "",
            _breadth:props.vehicle && props.vehicle.dimension ? props.vehicle.dimension._breadth : "",
            _height: props.vehicle && props.vehicle.dimension ? props.vehicle.dimension._height : "",
            capacity: props.vehicle ? props.vehicle.capacity : "",
            //old_image: props.vehicle ? props.vehicle.image : "",
           // price: props.vehicle ? props.vehicle.price : ""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        if (this.props !== nextProps) {
            this.setState({...nextProps.vehicle, _length: nextProps.vehicle.dimension._length,_breadth: nextProps.vehicle.dimension._breadth,_height: nextProps.vehicle.dimension._height });
           }
    }

    handleSubmit =(e) => {
        e.preventDefault()
        const { name, image, _length, _breadth, _height, capacity} = this.state
        const formdata= new FormData()
        formdata.append('name', name)
        formdata.append('image', image)
        formdata.append('_length', _length)
        formdata.append('_breadth', _breadth)
        formdata.append('_height', _height)
        formdata.append('capacity', capacity)

        this.props.handleSubmit(formdata)
    }

    handleChange = (e) =>{
        e.persist()
        this.setState(()=>({
            [e.target.name]: e.target.value
        }))
    }

    handleFileChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.files[0]
        }))
    }

    render(){
        const { name, image, _length, _breadth, _height, capacity} = this.state
        const { errors } = this.props
        const formStyle = {boxShadow: '0 0 20px -10px #909090', padding: '50px', margin: '30px 0 20px '}
        console.log('render', this.state)
        return(
            <form style={formStyle} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" value={name} onChange={this.handleChange} 
                    name="name" placeholder="Name" />
                    { errors.name && <p className="text-danger">{ errors.name.message }</p> }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={this.handleFileChange}
                    name="image" />
                    { errors.image && <p className="text-danger">{ errors.image.message }</p> }
                    { image && <img src={`http://localhost:3005/uploads/${image}`} className="img-fluid" alt="" /> }
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Length</label>
                            <input type="text" className="form-control" id="exampleInputName" value={_length} onChange={this.handleChange} 
                            name="_length" placeholder="in ft" />
                            { errors['dimension._length'] && <p className="text-danger">{ errors['dimension._length'].message }</p> }
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Breadth</label>
                            <input type="text" className="form-control" id="exampleInputName" value={_breadth} onChange={this.handleChange} 
                            name="_breadth" placeholder="in ft" />
                            { errors['dimension._breadth'] && <p className="text-danger">{ errors['dimension._breadth'].message }</p> }
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Height</label>
                            <input type="text" className="form-control" id="exampleInputName" value={_height} onChange={this.handleChange} 
                            name="_height" placeholder="in ft" />
                            { errors['dimension._height'] && <p className="text-danger">{ errors['dimension._height'].message }</p> }
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Capacity</label>
                    <input type="text" className="form-control" id="exampleInputName" value={capacity} onChange={this.handleChange} 
                    name="capacity" placeholder="in kg" />
                    { errors.capacity && <p className="text-danger">{ errors.capacity.message }</p> }
                </div>
                <button className="btn btn-success btn-lg btn-block mt-4" type="submit">Submit</button>

            </form>
        )
    }
}

export default Form