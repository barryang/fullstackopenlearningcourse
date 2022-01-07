import React, { useState } from 'react'

const Button = ({onClick, value}) => {
  return (
    <button onClick={onClick}>
      {value}
    </button>
  )
}

const Anec = ({list}) => {
  return (
    list.map((value) => {
      return <div>{value}</div>
    })
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Premature optimization is the root of all evil',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enought to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood test when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0,0,0,0,0,0]);

  const changeAnecdote = () => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    let x;
    do{
      x = getRandomInt(anecdotes.length);
    } while (x === selected);
    console.log(x);
    setSelected(x);
  }

  const addVote = () => {
    let x = [...votes];
    x[selected] += 1;
    setVotes(x);
  }

  let x = 0;
  let samevalue = [];
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > x) {
      x = votes[i];
      samevalue = [anecdotes[i]];
    } else if (votes[i] === x) {
      samevalue.push(anecdotes[i]);
    }
  }

  return (
    <div>
        <div>
          <h1>Anecdote of the day</h1>
          {anecdotes[selected]}
          <div>
            has {votes[selected]} votes
          </div>
          <div>
            <Button onClick={addVote} value='vote' />
            <Button onClick={changeAnecdote} value='next anecdote' />
          </div>
        </div>
        <div>
          <h1>Anecdote with most votes</h1>
          <Anec list={samevalue} />
          <div>has {x} vote(s).</div>
        </div>
    </div>
 
  );
}

export default App;
