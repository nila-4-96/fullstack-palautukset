import { useButton } from './Increase'

const Buttons = () => {
  const incrementGood = useButton(state => state.incrementGood)
  const incrementNeutral = useButton(state => state.incrementNeutral)
  const incrementBad = useButton(state => state.incrementBad)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  )
}

export default Buttons