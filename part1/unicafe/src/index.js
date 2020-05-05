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

const Buttons = ({good,neutral,bad,setGood,setNeutral,setBad}) => (
    <div>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
    </div>
)

const Statistic = ({text,stat}) => (
  <p>
    {text} {stat}
  </p>
)

const Statistics = ({good,neutral,bad}) => {  
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${good / all * 100} %`

  if ( good > 0 || neutral > 0 || bad > 0) {
    return  (
      <div>
        <Statistic text="good" stat={good} />
        <Statistic text="neutral" stat={neutral} />
        <Statistic text="bad" stat={bad} />  
        <Statistic text="all" stat={all} />
        <Statistic text="average" stat={average} />
        <Statistic text="positive" stat={positive} />
      </div>
    )
  }

  return (
    <p>
      No feedback given
    </p>
  )  
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text="give feedback" />

      <Buttons good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />

      <Header text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)