import axios from "axios"

const Footer = () => {
    const today = new Date()   
    
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}}).then(r => {
            window.alert(r.data.joke)
    })    
    }

    return (
        <div className="footer">
            <form onSubmit={handleSubmit}>
            <button className="hidden-button" type="submit">&copy; Benjamin Hartman {today.getFullYear()}</button>
            </form>
            
        </div>
    )
}

export default Footer