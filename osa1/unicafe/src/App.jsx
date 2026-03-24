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
      <p>good {props.x} <br/>
      neutral {props.y} <br/>
      bad {props.z} <br/>
      all {props.x + props.y + props.z} <br/>
      average {(props.x * 1 + props.z * -1) / (props.x + props.y + props.z)} <br/>
      positive {props.x * 100 / (props.x + props.y + props.z) + ' %'}</p>
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
    <button onClick={() => {
      setGood(good + 1)
      console.log('good')
    }}>
      good
    </button>
    <button onClick={() => {
      setNeutral(neutral + 1)
      console.log('neutral')
    }}>
      neutral
    </button>
    <button onClick={() => {
      setBad(bad + 1)
      console.log('bad')
    }}>
      bad
    </button>

    <h1>statistics</h1>
    <Statistics x={good} y={neutral} z={bad} />
    </div>
  )
}

export default App