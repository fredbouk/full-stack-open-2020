import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
    <h1>
      {text}
    </h1>
)

const Button = ({text,handleClick}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Clicks = ({text,clicks}) => (
  <p>
    {text} {clicks}
  </p>
)

const Statistics = ({text,stat}) =>  (
  <p>
    {text} {stat}
  </p>
)


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => good + neutral + bad

  const divider = all()

  const average = () => (good - bad) / divider

  const positive = () => `${good / divider * 100} %`

  return (
    <>
      <Header text="give feedback" />

      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Header text="statistics" />

      <Clicks text="good" clicks={good} />
      <Clicks text="neutral" clicks={neutral} />
      <Clicks text="bad" clicks={bad} />
      
      <Statistics text="all" stat={all()} />
      <Statistics text="average" stat={average()} />
      <Statistics text="positive" stat={positive()}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)