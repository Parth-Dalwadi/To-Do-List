const newDate = () => {
    let date = new Date().toLocaleDateString()
    date = date.split("/")
    date = date[2] + "-" + date[0] + "-" + date[1]
    return date
}

export default newDate;