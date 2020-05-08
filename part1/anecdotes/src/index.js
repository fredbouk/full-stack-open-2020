import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
  <h1>
    {text}
  </h1>
)

const Anecdote = ({anecdote}) => (
  <p>
    {anecdote}
  </p>
)

const Votes = ({votes,selected}) => (
  <p>
    has {votes[selected]} votes
  </p>
)

const Button = ({text,handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Buttons = ({setSelected,setVotes,selected,votes}) => {

  const updateVotes = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] += 1
    setVotes(copyOfVotes)
  }
  
  return (
      <div>
        <Button text="vote" handleClick={() => updateVotes()} />
        <Button text="random anecdote" handleClick={() => setSelected(Math.floor(Math.random() * 6))} />
      </div>
  )
}

const Most = ({votes}) => {

  const mostVotes = Math.max(...votes)

  return (
    <>
      <Anecdote anecdote={anecdotes[votes.indexOf(mostVotes)]} />
      <Votes votes={votes} selected={votes.indexOf(mostVotes)} />
    </>
  )

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
                          //creates state as an array with six elements of 0
  const [votes,setVotes] = useState(new Array(6+1).join('0').split('').map(parseFloat))

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={props.anecdotes[selected]} />
      <Votes votes={votes} selected={selected} />
      <Buttons setSelected={setSelected} setVotes={setVotes} votes={votes} selected={selected}/>
      <Header text="Anecdote with most votes" />
      <Most votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)