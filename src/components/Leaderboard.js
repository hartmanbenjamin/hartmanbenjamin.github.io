const Leaderboard = ({names}) => {
    return (
        <div>
            Leaderboard:
            <table className='leaderboard'>
                <tr>
                    {names.map(name => {
                        return (<th key={name}>{name}</th>)
                    })}
                </tr>
                <tr>
                    {names.map(name => {
                        return (<td>Score</td>)
                    })}
                </tr>
            </table>
        </div>
    )
}

export default Leaderboard