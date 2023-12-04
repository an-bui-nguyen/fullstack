import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.TEST_MONGODB_URL


mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//     content: 'Hay là để mai ta gặp nhau, lại để lời yêu ra đằng sau',
//     important: false
// })

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// })

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     });
//     mongoose.connection.close();
// })

(async function() {
    const note = Note({
        "content": "No that's not true",
        "important": true
    })
    const result = await note.save();
    console.log(result)
    mongoose.connection.close();
})();

