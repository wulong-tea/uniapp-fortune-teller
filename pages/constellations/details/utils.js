export const getDbId = (name, type) => {
    let keyDate = getKeyDate(type);
    return name + "." + type + "." + keyDate;
}


function getDay(plusDay = 0) {
    let date = new Date();
    date.setDate(date.getDate() + plusDay);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    month = month.length <= 1 ? "0" + month : month;
    let day = String(date.getDate());
    day = day.length <= 1 ? "0" + day : day;
    return year + month + day;
}

function getKeyDate(type) {
    switch (type) {
        case "today":
            return getDay();
        case "tomorrow":
            return getDay(1);
        case "week":
            return new Date().getWeek();
        case "month":
            return new Date().getMonth() + 1;
        case "year":
            return new Date().getUTCFullYear();
        default:
            return "unknown";
    }
}
