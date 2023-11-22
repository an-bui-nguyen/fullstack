const createContent = (courseInfo, index) => {
  return <Part part={courseInfo.name} exercises={courseInfo.exercises} key={index}/>
}

const Content = (props) => {
  return (
    <div>{props.content.map(createContent)}</div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Footer = (props) => {
  return (
    <p>Number of exercises {props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}</p>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Footer content={course.parts}/>
    </div>
  )
}

export default App