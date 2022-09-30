import {
    horoscopes
} from "@/data/horoscopes.js";

export const getHoroscope = async (index, type) => {
    const horoscope = horoscopes[index];
    const cloudObj = uniCloud.importObject('cloud-obj-main');
    try {
        let res = uni.getStorageSync(getDBId(horoscope.id, type));
        if (!res || !res.data) {
            res = await cloudObj.getHoroscope({
                name: horoscope.id,
                type: type
            });
            if (!res || !res.data) {
                throw res;
            }
            uni.setStorageSync(getDBId(horoscope.id, type), res);
        }
        console.log(res);
        res.data.symbol = horoscope.symbol;
        return res.data;
    } catch (e) {
        console.log(e);
        uni.showModal({
            title: '数据请求失败' + JSON.stringify(e.err.reason),
            showCancel: false
        });
        throw e;
    }
}

const getDBId = (name, type) => {
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
    initGetWeek();
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

function initGetWeek() {
    /**
     * Returns the week number for this date.  dowOffset is the day of week the week
     * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
     * the week returned is the ISO 8601 week number.
     * @param int dowOffset
     * @return int
     */
    Date.prototype.getWeek = function(dowOffset) {
        /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

        dowOffset = typeof dowOffset == "int" ? dowOffset : 0; //default dowOffset to zero
        var newYear = new Date(this.getFullYear(), 0, 1);
        var day = newYear.getDay() - dowOffset; //the day of week the year begins on
        day = day >= 0 ? day : day + 7;
        var daynum =
            Math.floor(
                (this.getTime() -
                    newYear.getTime() -
                    (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
                86400000
            ) + 1;
        var weeknum;
        //if the year starts before the middle of a week
        if (day < 4) {
            weeknum = Math.floor((daynum + day - 1) / 7) + 1;
            if (weeknum > 52) {
                nYear = new Date(this.getFullYear() + 1, 0, 1);
                nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
                /*if the next year starts before the middle of
                  the week, it is week #1 of that year*/
                weeknum = nday < 4 ? 1 : 53;
            }
        } else {
            weeknum = Math.floor((daynum + day - 1) / 7);
        }
        return weeknum;
    };
}
