import { useState } from "react"

const NameForm = ({noPlayers, setNamesOk, setGlobNames}) => {
    let initialNames = []
    for (let i = 0; i < noPlayers ; i++) {
        initialNames.push('')
    }
    const [names, setNames] = useState(initialNames)
    
    const changeNames = (event) => {
        const newNames = names.map((name, i) => {
            if(i===parseInt(event.target.id)) {
                return event.target.value
            }
            return name
        })
        setNames(newNames)
    }

    const startGame = (event) => {
        event.preventDefault()
        console.log('starting game with')
        setGlobNames(names)
        setNamesOk(true)
    }
    
    let numArray = []
    for(let i = 0; i<noPlayers;i++){
        numArray.push(i)
    }

    return (
        <>
        Enter the name of the players: 
        <form onSubmit={startGame}>
        {numArray.map(id => {
            return (
                <div key={id}>Player {id+1}
                <input id={id} required={true} onChange={changeNames}></input>
                </div>
            )
        })}
        <button type="submit">Start game</button>
        </form>
        </>
    )
}

export default NameForm