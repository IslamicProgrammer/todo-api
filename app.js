const express = require("express")
const Joi = require("joi")
const nanoid = require("nanoid")

const app = express()
app.use(express.json())

const todos = [
  { id: 1, todo: "Read books", complite: false },
  { id: 2, todo: "Walking for 10.000 steps", complite: true },
]

app.get("/api/todos", (req, res) => {
  res.send(todos)
})

app.get("/api/todos/:id", (req, res) => {
  let todo = todos.filter(t => t.id === parseInt(req.params.id))[0]
  if (!todo) {
    return res.status(404).send(`Todo with id ${req.params.id} is not found`)
  }
  res.send(todos.filter(t => t.id === parseInt(req.params.id))[0])
})

app.post("/api/todos", (req, res) => {
  const { error } = validateTodo(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  todos.push({
    id: todos.length + 1,
    ...req.body,
  })
  res.send(todos[todos.length - 1])
})

app.put("/api/todos/:id", (req, res) => {
  let todo = todos.filter(t => t.id === parseInt(req.params.id))[0]
  if (!todo) {
    return res.status(404).send(`Todo with id ${req.params.id} is not found`)
  }
  res.send(todo)
  // console.log("req.body", req.body)
  todo.todo = req.body.todo
  res.send(todo)
})

function validateTodo(todo) {
  const todoSchema = Joi.object({
    todo: Joi.string().required().min(5),
    complite: Joi.bool().required(),
  })
  return todoSchema.validate(todo)
}

app.listen(5000, () => {
  console.log("App running on port 5000")
})
