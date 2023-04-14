const Specs = ({noPlayers, plumpFee, entryFee}) => {
    return (
        <div className='specbox'>
            <h3 className='specs'>Game specifications:</h3>
            Entry: {entryFee}€<br/>
            Plump: {plumpFee}€
        </div>
    )
}

export default Specs