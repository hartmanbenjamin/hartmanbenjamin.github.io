import { useState } from 'react';
import './App.css';
import StartForm from './components/StartForm';
import Reset from './components/Reset';
import NameForm from './components/NameForm';
import Specs from './components/Specs';
import PlayerBox from './components/PlayerBox';
import Footer from './components/Footer';

function App() {
  const [start, setStart] = useState(false)
  const [noPlayers, setNoPlayers] = useState(3)
  const [plumpFee, setPlumpFee] = useState(0)
  const [entryFee, setEntryFee] = useState(0)
  const [namesOk, setNamesOk] = useState(false)
  const [names, setNames] = useState([])
  const [end, setEnd] = useState(false)

  
  // Select number of players and fees
  if (!start) { 
    return (
      <div>
        <h1>Pimpelipompeli🎈</h1>
        <StartForm setStart={setStart} start={start} setNoPlayers={setNoPlayers} noPlayers={noPlayers} setPlumpFee={setPlumpFee} plumpFee={plumpFee} setEntryFee={setEntryFee} entryFee={entryFee} />
        <Footer />
      </div>
    )
  }

  // Add names of players
  if (!namesOk) {
    // console.log(`starting game with ${noPlayers} players, entry ${entryFee} and plump ${plumpFee}`)
    return (
      <div>
        <Reset setStart={setStart} setNoPlayers={setNoPlayers} setPlumpFee={setPlumpFee} setEntryFee={setEntryFee} setNamesOk={setNamesOk} setEnd={setEnd}/>
        <h1>Pimpelipompeli🎈</h1>
        <Specs noPlayers={noPlayers} plumpFee={plumpFee} entryFee={entryFee}/>
        
        <NameForm noPlayers={noPlayers} setNamesOk={setNamesOk} setGlobNames={setNames} />
        <Footer />
      </div>
    )
  }

  // Started game
  return (
    <div>
      <div className='content-container'>
        <h1>Pimpelipompeli🎈</h1>
        <Reset setStart={setStart} setNoPlayers={setNoPlayers} setPlumpFee={setPlumpFee} setEntryFee={setEntryFee} setNamesOk={setNamesOk} setEnd={setEnd}/>
        {/* <Leaderboard names={names}/> */}
        <PlayerBox names={names} end={end} setEnd={setEnd} plumpFee={plumpFee} entryFee={entryFee}/>
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  )


}

export default App;
