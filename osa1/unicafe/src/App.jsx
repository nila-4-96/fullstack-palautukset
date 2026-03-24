import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const StatisticsLine = (props) => {
  console.log(props)
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}


const Statistics = (props) => {
  console.log(props)
  if (props.x + props.y + props.z === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <StatisticsLine text="good" value={props.x} />
        </tr>
        <tr>
          <StatisticsLine text="neutral" value={props.y} />
        </tr>
        <tr>
          <StatisticsLine text="bad" value={props.z} />
        </tr>
        <tr>
          <StatisticsLine text="all" value={props.x + props.y + props.z} />
        </tr>
        <tr>
          <StatisticsLine text="average" value={(props.x * 1 + props.z * -1) / (props.x + props.y + props.z)} />
        </tr>
        <tr>
          <StatisticsLine text="positive" value={props.x * 100 / (props.x + props.y + props.z) + ' %'} />
        </tr>
      </tbody>
    </table>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good + 1)} text="good" />
    <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
    <Button onClick={() => setBad(bad + 1)} text="bad" />

    <h1>statistics</h1>
    <Statistics x={good} y={neutral} z={bad} />
    </div>
  )
}

export default App