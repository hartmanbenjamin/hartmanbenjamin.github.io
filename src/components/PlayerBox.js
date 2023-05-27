import { useState } from "react"

// Cards object
// keys: Card value (2-10, J-Joker)
// values: 2-15
let cards = {}
for (let i = 2; i < 11 ; i++) {
    cards[i] = i
}
cards['J'] = 11
cards['Q'] = 12
cards['K'] = 13
cards['A'] = 14
cards['Joker'] = 15

const PlayerBox = ({names, end, setEnd, plumpFee, entryFee}) => {
    // init scores object
    // keys: player names
    // values: {
    //     score: player score
    //     plump: player plumps
    //     sakkoRound: sakko for current round
    //     sakkoTotal: sakko for whole game
    //     fail: still in the game (true/false)
    // }

    let initScore = {}
    names.forEach(name => {
      initScore[name] = {
        score: 0, 
        plump: 0, 
        sakkoRound: parseFloat(entryFee),
        sakkoTotal: 0,
        fail: false
      }  
    })

    // set init state
    const [scores, setScores] = useState(initScore)
    const [selectedCard, setSelectedCard] = useState("")
    const [losers, setLosers] = useState([])
    const [failedPlayers, setFailedPlayers] = useState(0) 

    // Adds points and does checks
    const addPoints = (event) => {
        event.preventDefault()
        
        // Check that a player is selected
        if(losers.length===0) {
            window.alert('Select at least one player. ')
        } else {
            // copy score object
            let newScores = {...scores}
            // init helper variables
            let roundfailed = 0
            let finalRound = false

            // if only two players played last round, 
            // game will end after this
            if(names.length - failedPlayers === 2) {
                finalRound = true
            }
            losers.forEach(name => {
                // Add round score to current score in state
                newScores[name].score += cards[selectedCard]
                // Drop down to 20 if score is 30
                if (newScores[name].score === 30) {
                    newScores[name].score = 20
                }
                // Fail player if score > 30 
                if (newScores[name].score > 30 || finalRound) {
                    newScores[name].fail = true
                    roundfailed += 1
                }
                // Add plumps&sakko if any
                const plumps = cards[selectedCard] - 10
                if (plumps>0) {
                    newScores[name].plump += plumps
                    newScores[name].sakkoRound += parseFloat(plumpFee)*plumps
                }
            })
            
            // Add the total number of failed players
            setFailedPlayers(failedPlayers+roundfailed)
            
            // If only one player left, that player wins
            if(names.length - failedPlayers - roundfailed <= 1) {
                setEnd(true)
                names.forEach(name => {
                    // Add sakko for each player to total
                    newScores[name].sakkoTotal += newScores[name].sakkoRound 
                })
            }

            // set scores
            setScores(newScores)

            // Uncheck player selection boxes
            for (let i = 0; i < names.length - failedPlayers; i++) {
                event.target[i].checked = false
            }
            // Unset losers state
            setLosers([])
            // Unset selected card
            setSelectedCard("")
        }
    }

    // Add plump to a player
    // Player name is stored in event.target.id
    const addPlump = (event) => {
        // Copy current score object
        let newScores = {...scores}
        // Add one plump and one plump fee
        newScores[event.target.id].plump += 1
        newScores[event.target.id].sakkoRound += parseFloat(plumpFee)
        // Set new score state
        setScores(newScores)
    }

    // Remove a plump from a player
    // Player name is stored in event.target.id
    const removePlump = (event) => {
        // Copy current score object
        let newScores = {...scores}
        // Check if there are plumps ( no negative plumps)
        if (newScores[event.target.id].plump > 0) {
            // Remove one plump and one plump fee
            newScores[event.target.id].plump -= 1
            newScores[event.target.id].sakkoRound -= parseFloat(plumpFee)
        }
        // Set new score state
        setScores(newScores)
    }

    // Handle the selection of a new card in the dropdown
    const changeCard = (event) => {
        setSelectedCard(event.target.value)
    }

    // Handle checking a new loser (checkbox)
    // Player name is stored in event.target.id
    const handleCheckbox = (event) => {
        // If box is checked, add to loser
        if (event.target.checked) {
            setLosers(losers.concat(event.target.id))
        } else { // otherwise, remove from losers
            // copy current losers
            let newLosers = losers
            // remove loser from array
            // probably better ways of doing this but idgaf
            for (let i = 0; i < newLosers.length ; i++) {
                if (newLosers[i]===event.target.id) {
                    newLosers.splice(i, 1)
                }
            }
            // set loser state
            setLosers(newLosers)
        }
    }

    // Handle changing to the next round of the same game
    const nextRound = (event) => {
        // Copy the score object
        let newScores = {...scores}
        // For each name, reset the round attributes
        // Overall game attributes remain the same
        names.forEach(name => {
            newScores[name].score = 0
            newScores[name].plump = 0
            newScores[name].sakkoRound = parseFloat(entryFee)
            newScores[name].fail = false
        })
        // Set the new score state
        setScores(newScores)
        // Reset amount of failed players
        setFailedPlayers(0)
        // Begin the new round
        setEnd(false)
    }

    // Change button text depending on game state
    let buttonText = "Add points & plumps"
    
    if(names.length - failedPlayers === 2) {
        buttonText = "Add plumps & end game"
    }

    // Game active
    if (!end){
        return (
            <div>
                <div className="somebox">
                Select losers: 
                <form onSubmit={addPoints}>
                    {names.map(name => {
                        if (scores[name].fail) {
                            return (<></>)
                        }
                        return (
                            <label>
                                <input type="checkbox" name="loser" id={name} onChange={handleCheckbox}/>
                                <label for={name}>{name}</label><br/>
                            </label>
                        )
                    })}
                    <select name="losingcard" id ="losingcard" required={true} onChange={changeCard} value={selectedCard}>
                        <option></option>
                        {Object.keys(cards).map(card => {
                            return(
                                <option value={card}>{card}</option>
                            )
                        })}
                    </select><br/>
                    <button type="submit" style={{"margin-top": 20}}>{buttonText}</button>
                </form>
                </div> 
                {names.map(name => {
                    let className = "playerbox"
                    let displayStyle = "none"
                    if (scores[name].fail) {
                        className += "failed"
                        displayStyle = true
                    } else {
                        className = "playerbox"
                        displayStyle = "none"
                    }
                    return(
                    <div className={className}>
                        <h2>{name} <span style={{display: displayStyle}}>(OUT)</span></h2>
                        <p>Score: {scores[name].score}</p>
                        <p>Plumps: {scores[name].plump}</p>
                        <p>Sakko (round): {Math.round((scores[name].sakkoRound)*100)/100}€</p>
                        <p>Sakko (total): {Math.round((scores[name].sakkoTotal)*100)/100}€</p>
                        <button id={name} onClick={addPlump}>Add plump</button>
                        <button id={name} onClick={removePlump}>Remove plump</button>
                    </div>
                    )
                })}
            </div>
        )
    } 
    // if game has ended (end===true)
    // init round winner and pot
    let winner = ""
    let pot = 0 
    // calculcate total pot
    names.forEach(name => {
        pot += scores[name].sakkoRound
        // Assign winner (only one with scores[name].fail===true)
        if(!scores[name].fail) {
            winner = name
        }
    })

    // copy current scores
    let newScores = {...scores}
    // Add pot to player
    // (or reduce sakko, semantics are my passion)
    newScores[winner].sakkoTotal -= parseFloat(pot)

    return (
        <div>
            <h2>{winner} is the winner!</h2>
            <h3>Round stats: </h3>
            <ul>
                {names.map(name => {
                    return (
                        <li key={name}>{name} has {scores[name].score} points and {scores[name].plump} plumps ({Math.round(scores[name].sakkoRound*100)/100} €)</li>
                    )
                })}
            </ul>

            <p>Total pot of {Math.round(pot*100)/100}€ goes to {winner}!</p>
            <h3>Sakkoboard</h3>
            <table className='leaderboard'>
                <tr>
                    {/* <th>Name</th> */}
                    {names.map(name => {
                        return (<th key={name}>{name}</th>)
                    })}
                </tr>
                <tr>
                    {/* <td>Sakko (total)</td> */}
                    {names.map(name => {
                        return (<td>{Math.round(-scores[name].sakkoTotal*100)/100} €</td>)
                    })}
                </tr>
            </table>
            
            <button onClick={nextRound} >Next round</button>
        </div>
    )
}

export default PlayerBox