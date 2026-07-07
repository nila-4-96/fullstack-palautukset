import { useButton } from './Increase'

const Statistics = () => {
  const good = useButton(state => state.good)
  const neutral = useButton(state => state.neutral)
  const bad = useButton(state => state.bad)
  const all = good + neutral + bad
  const average = good * 1 + bad * -1 / all
  const positive = good * 100 / all + ' %'

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
