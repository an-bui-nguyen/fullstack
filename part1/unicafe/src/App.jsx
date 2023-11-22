import { useState } from "react";

const Heading = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{width:"5rem"}}>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  if (stats[0] == 0 && stats[1] == 0 && stats[2] == 0) {
    return <p>No feedback given</p>
  }
  const sum = stats[0] + stats[1] + stats[2];
  const average = (stats[0] - stats[2]) / sum;
  const positive = Math.round((stats[0] / sum)*10000)/100 + "%";
  return (
    <div>
      <table>
        <StatisticLine text={"good"} value={stats[0]}/>
        <StatisticLine text={"neutral"} value={stats[1]}/>
        <StatisticLine text={"bad"} value={stats[2]}/>
        <StatisticLine text={"all"} value={sum}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positive}/>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <Heading text={"give feedback"}/>
      <Button text={"good"} handleClick={handleGood}/>
      <Button text={"neutral"} handleClick={handleNeutral}/>
      <Button text={"bad"} handleClick={handleBad}/>
      <Heading text={"statistics"}/>
      <Statistics stats={[good, neutral, bad]}/>
    </>
  )
}

export default App;