const Reset = ({setStart, setNoPlayers, setPlumpFee, setEntryFee, setNamesOk, setEnd}) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const reset = window.confirm('Reset current game?')
        if ( reset ) {
            setNoPlayers(3)
            setPlumpFee(0)
            setEntryFee(0)
            setStart(false)
            setNamesOk(false)
            setEnd(false)
        }
    }
    return (
        <div >
        <form className="reset" onSubmit={handleSubmit}>
            <button type="submit" >Reset</button>
        </form>
        </div>
    )
}

export default Reset