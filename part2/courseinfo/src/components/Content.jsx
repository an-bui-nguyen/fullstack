import Part from "./Part"

const createContent = (courseInfo) => {
    return <Part part={courseInfo.name} exercises={courseInfo.exercises} key={courseInfo.id}/>
  }
  
const Content = (props) => {
    return (
      <div>{props.content.map(createContent)}</div>
    )
}

export default Content;