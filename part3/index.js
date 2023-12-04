import express from "express";
import morgan from "morgan";
import Person from "./mongo.js";
import cors from "cors"

const app = express();

// Middleware
app.use(express.static("dist"));
app.use(express.json());
app.use(cors())
;
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger);

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body);
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get("/info", (req, res) => {
    const time = new Date().toString();
    Person.find({}).then(result => {
        res.send(`<p>Phonebook has info for ${result.length} ${result.length === 1 ? "person" : "people"}</p> <p>${time}</p>`)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

app.delete("/api/persons/:id", (req, res, next) => {
    Person.deleteOne({
        _id: req.params.id
    }).then(() => {
        Person.find({}).then( (result) => {
            res.json(result);
        })
    }).catch(error => {
        next(error)
    })
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body;

    const newPerson = Person({
        name: body.name,
        number: body.number
    })

    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error));
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    
    const person = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => {
            next(error)
        })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Middleware

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    next(error)
  }
// this has to be the last loaded middleware.
app.use(errorHandler)
