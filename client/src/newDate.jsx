const newDate = () => {
    let date = new Date().toLocaleDateString()
    date = date.split("/")

    if (date[0].length === 1) {
        date[0] = "0" + date[0]
    }

    if (date[1].length === 1) {
        date[1] = "0" + date[1]
    }

    date = date[2] + "-" + date[0] + "-" + date[1]
    return date
}

export default newDate;