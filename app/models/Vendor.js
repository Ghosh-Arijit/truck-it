const mongoose= require("mongoose")
const uniqueValidator= require("mongoose-unique-validator")

const Schema = mongoose.Schema

//Creation of Vendor Schema
const vendorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                min: 0,
                max: 5,
                default: 0
            },
            feedback: {
                type: String
            }
        }
    ],
    address: {
        full: String,
        pincode: String
    },
    payment: {
        bank_account:{
            number: {
                type: Number
            },
            IFSC_code: {
                type: String
            }
        }
    },
    document: {
        aadhar: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    vehicles: [{
        vehicle: {
            type: Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: [true, 'Vehicle is required']
        },
        number_plate: {
            type: String,
            required: [true, 'Number plate is required']
        },
        // capacity:  {
        //     type: String,
        //     required: [true, 'Capacity is required']
        // },
        pricing: {
            inter_city: {
                ratePerKm: {
                    type: Number,
                    required: [true, 'Intercity rate is required']
                },
                // ratePerMin: {
                //     type: Number,
                //     required: [true, 'Intercity rate is required']
                // }
            },
            intra_city: {
                ratePerKm: {
                    type: Number,
                    required: [true, 'Intracity rate is required']
                },
                // ratePerMin: {
                //     type: Number,
                //     required: [true, 'Intracity rate is required']
                // }
            }
        },
        helper_rate: {
            type: Number,
            required: [true, 'Helper rate is required']
        }
    }]
})

vendorSchema.plugin(uniqueValidator, { message: '{PATH} already present'})

//Creation of Vendor Model
const Vendor= mongoose.model('Vendor', vendorSchema)

module.exports= {
    Vendor
}

