import { useState } from 'react'

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
    <div>
      <StatisticsLine text="good" value={props.x} />
      <StatisticsLine text="neutral" value={props.y} />
      <StatisticsLine text="bad" value={props.z} />
      <StatisticsLine text="all" value={props.x + props.y + props.z} />
      <StatisticsLine text="average" value={(props.x * 1 + props.z * -1) / (props.x + props.y + props.z)} />
      <StatisticsLine text="positive" value={props.x * 100 / (props.x + props.y + props.z) + ' %'} />
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
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