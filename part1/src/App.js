import React from 'react'
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name} and you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Anni"
  const age = "20 tuổi r đụ má"
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name = {name} age = {age}/>
    </div>
  )
}
export default App