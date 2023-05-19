const StartForm = ({setStart, start, setNoPlayers, noPlayers, setPlumpFee, plumpFee, setEntryFee, entryFee}) => {
    
    const changePlayers = (event) => {
        setNoPlayers(event.target.value)
    }

    const changePlump = (event) => {
        setPlumpFee(event.target.value)
    }
    
    const changeEntry = (event) => {
        setEntryFee(event.target.value)
    }

    const submitForm = (event) => {
        event.preventDefault()
        setStart(true)
    }

    return (
        <div>
            <form className="startform" onSubmit={submitForm}>
                <>Number of players:</><br/>
                <input name='players' type="number" min="3" step="1" onChange={changePlayers} value={noPlayers}/> <br/>
                <>Entry fee (€)</><br/>
                <input name="entry" type="number" min="0" step="0.1" onChange={changeEntry} value={entryFee}/><br/>
                <>Plump fee (€)</><br/>
                <input name="plump" type="number" min="0" step="0.1" onChange={changePlump} value={plumpFee}/><br/>
                <button className='butt' type="submit">Start</button>
            </form>
        </div>
    )
}

export default StartForm