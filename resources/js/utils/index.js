export function itemColors () {
    return [
        'blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1',
        'teal', 'light-blue', 'light-green', 'lime', 'yellow darken-2', 'amber', 'deep-orange',
        'brown', 'blue-grey'
    ]
}

export function getDayOfWeek (day, length = 0) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return length ? days[day].substr(0, length) : days[day]
}

export function getMonthName (month) {
    return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ][month]
}

export function random (a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
}

export function extractErrorFromResponse (error) {
    let { response } = error
    let data = response.data
    return data.message + '<br><ul>' + (data.errors ?
        Object.values(data.errors).map(item => '<li>' + item[0] + '</li>').join('') + '</ul>': '')
}

export function getDateString(date) {
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}

export function getFullDateString(date) {
    return getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear()
}
