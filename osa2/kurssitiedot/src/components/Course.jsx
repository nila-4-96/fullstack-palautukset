const Part = (props) => {
  /*console.log("Part", props)*/
  return (
    <li>{props.part} {props.exercises}</li>
  )
}

const Total = (props) => {
  /*console.log("Total", props)*/
  const totalAmount = props.parts.reduce((sum, order) => sum + order.exercises, 0)
  return (
    <div>
      <p>
        <b>total of {totalAmount} exercises</b>
      </p>
    </div>
  )
}

const Content = (props) => {
  /*console.log("Content", props)*/
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Header = (props) => {
  /*console.log("Header", props)*/
  return (  
    <div>
      <h2>
        {props.course}
      </h2>
    </div>
   )
}

const Course = (props) => {
  /*console.log("Course", props)*/
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course