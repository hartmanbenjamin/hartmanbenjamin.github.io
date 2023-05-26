const Footer = () => {
    const today = new Date()
    return (
        <div className="footer">
            <p>&copy; Benjamin Hartman {today.getFullYear()}</p>
        </div>
    )
}

export default Footer