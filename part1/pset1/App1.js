import React, { useState } from 'react';

const Header = ({header}) => <h1>{header}</h1>

const Button = ({setvalue, value}) => <button onClick={setvalue}>{value}</button>

const Statistic = ({value, number}) => <p>{value} {number}</p>

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let Good = () => setGood(good + 1)
  let Bad = () => setBad(bad + 1)
  let Neutral = () => setNeutral(neutral + 1)
  let total = good + bad + neutral
  let average = (good - bad)/total
  let positive = (good/total * 100) + '%'

  return (
    <div>
      <Header header="give feedback" />
      <Button setvalue={Good} value="good"/>
      <Button setvalue={Bad} value="neutral"/>
      <Button setvalue={Neutral} value="bad"/>
      <Header header="statistics" />
      { total > 0 ? 
        <div>
          <Statistic value="good" number={good}/>
          <Statistic value="neutral" number={neutral}/>
          <Statistic value="bad" number={bad}/>
          <Statistic value="all" number={total}/>
          <Statistic value="average" number={average}/>
          <Statistic value="positive" number={positive}/>
        </div>
        :
        <div>
          No feedback given
        </div>
      }
      
    </div>
  )
}

export default App;
