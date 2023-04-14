import { useState } from "react"

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

    // console.log(initScore)
    const [scores, setScores] = useState(initScore)
    const [selectedCard, setSelectedCard] = useState("")
    const [losers, setLosers] = useState([])
    const [failedPlayers, setFailedPlayers] = useState(0) 

    const addPoints = (event) => {
        event.preventDefault()
        if(losers.length===0) {
            window.alert('Select at least one player. ')
        } else {
            let newScores = {...scores}
            let roundfailed = 0
            losers.forEach(name => {
                newScores[name].score += cards[selectedCard]
                if (newScores[name].score === 30) {
                    newScores[name].score = 20
                }
                if (newScores[name].score > 30) {
                    newScores[name].fail = true
                    roundfailed += 1
                }
                const plumps = cards[selectedCard] - 10
                if (plumps>0) {
                    newScores[name].plump += plumps
                    newScores[name].sakkoRound += parseFloat(plumpFee)
                }
            })

            setFailedPlayers(failedPlayers+roundfailed)
            
            // console.log(roundfailed)
            if(names.length - failedPlayers - roundfailed <= 1) {
                // console.log('game should end')
                setEnd(true)
                names.forEach(name => {
                    newScores[name].sakkoTotal += newScores[name].sakkoRound 
                })
            }

            setScores(newScores)

            for (let i = 0; i < names.length; i++) {
                event.target[i].checked = false
            }

            setLosers([])
        }
    }

    const addPlump = (event) => {
        
        let newScores = {...scores}
        newScores[event.target.id].plump += 1
        newScores[event.target.id].sakkoRound += parseFloat(plumpFee)
        setScores(newScores)
    }

    const removePlump = (event) => {
        let newScores = {...scores}
        if (newScores[event.target.id].plump > 0) {
            newScores[event.target.id].plump -= 1
            newScores[event.target.id].sakkoRound -= parseFloat(plumpFee)
        }
            setScores(newScores)
    }

    const changeCard = (event) => {
        setSelectedCard(event.target.value)
    }

    const handleCheckbox = (event) => {
        if (event.target.checked) {
            // console.log(`adding loser ${event.target.id}`)
            setLosers(losers.concat(event.target.id))
        } else {
            // console.log(`removing loser ${event.target.id}`)
            let newLosers = losers
            for (let i = 0; i < newLosers.length ; i++) {
                if (newLosers[i]===event.target.id) {
                    newLosers.splice(i, 1)
                }
            }
            setLosers(newLosers)
        }
    }

    const nextRound = (event) => {
        let newScores = {...scores}
        names.forEach(name => {
            newScores[name].score = 0
            newScores[name].plump = 0
            newScores[name].sakkoRound = parseFloat(entryFee)
            newScores[name].fail = false
        })

        setScores(newScores)
        setFailedPlayers(0)
        setEnd(false)
    }


    let buttonText = "Add points & plumps"
    if(names.length - failedPlayers === 2) {
        buttonText = "Add plumps & end"
    }
    if (!end){
        return (
            <div>
                <div>
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
                    <select name="losingcard" id ="losingcard" required={true} onChange={changeCard}>
                        <option></option>
                        {Object.keys(cards).map(card => {
                            return(
                                <option value={card}>{card}</option>
                            )
                        })}
                    </select><br/>
                    <button type="submit">{buttonText}</button>
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
    let winner = ""
    let pot = 0 
    names.forEach(name => {
        pot += scores[name].sakkoRound
        if(!scores[name].fail) {
            winner = name
        }
    })

    let newScores = {...scores}
    newScores[winner].sakkoTotal -= parseFloat(pot)

    return (
        <div>
            <h2>{winner} is the winner!</h2>
            <h3>Round stats: </h3>
            <ul>
                {names.map(name => {
                    return (
                        <li>{name} has {scores[name].score} points and {scores[name].plump} plumps ({Math.round(scores[name].sakkoRound*100)/100} €)</li>
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