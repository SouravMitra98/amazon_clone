const mongoose = require("mongoose");
const { productSchema } = require("./product");

const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim: true,
    },
    email:{
        required: true,
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                const rgx = /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
                return value.match(rgx);
                },
            message: 'Please enter a valid Email address',
            },
        },
    password: {
        required: true,
        // validator: {
        //     validate: (value) => {
        //         value.lenght >= 6;
        //     },
        //     message: 'Charectors should be 6 or more',
        // },
        type: String,
        },
    address: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'user',
    },
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
