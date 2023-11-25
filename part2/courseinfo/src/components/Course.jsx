import Footer from "./Footer"
import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content content={course.parts}/>
        <Footer content={course.parts}/>
      </div>
    )
  }
  
export default Course;