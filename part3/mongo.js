import "dotenv/config";
import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d+/.test(v);
            },
            message: props => `${props.value} is not a valid phone number.`
        },
        required: [true, 'Phone number required']
    }

});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model("Person", personSchema);


// if (process.argv.length < 4) {
//     Person.find({})
//     .then((result) => {
//         console.log("phonebook:");
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`);
//         })
//         mongoose.connection.close()
//     })
//     .catch(console.error())
// } else {
//     const person = Person({
//         name: process.argv[2],
//         number: process.argv[3]
//     })

//     person.save()
//         .then(response => {
//             console.log(`added ${response.name} ${response.number} to phonebook`);
//             mongoose.connection.close();
//         })
//         .catch(console.error);
// }



// Person.insertMany(persons)
//     .then(() => {
//         console.log("Data inserted");
//         mongoose.connection.close();
//     })
//     .catch(console.error());