// 云函数入口文件
const rp = require("request-promise");
const collectionName = "chinese-fortune";
const config = require("./config.js");

const db = uniCloud.database();

// 云函数入口函数
const requestChineseFortune = async () => {
    let res = await getFortuneFromDb();
    console.log(res);
    if (res && res.reason === "Success") {
        console.log("cloud obj request chinese fortune 数据库命中", res);
        return res.result.data;
    }
    res = await requestChinesdDayFortune();
    if (!res || res.reason !== "Success") {
        throw res;
    }
    console.log("cloud obj request chinese fortune 聚合数据命中", res);
    insertOrUpdateToDb(res);
    return res.result.data;
};

//从聚合数据接口请求万年历接口
async function requestChinesdDayFortune() {
    let date = getDate();
    let url = `http://v.juhe.cn/calendar/day?date=${date}&&key=${config.juhe.chineseFortuneKey}`;
    url = encodeURI(url);
    return await rp(url)
        .then(function(res) {
            res = JSON.parse(res);
            if (res && res.error_code && res.error_code > 0) {
                throw res;
            }
            return res;
        })
        .catch(function(err) {
            return {
                err: err,
            };
        });
}

async function getFortuneFromDb() {
    let id = getDate();
    return db
        .collection(collectionName)
        .doc(id)
        .get()
        .then((res) => {
            if (res.affectedDocs > 0) {
                return res.data[0].data;
            }
            return res;
        })
        .catch((err) => {
            return {
                err: err,
            };
        });
}

async function insertOrUpdateToDb(data) {
    let id = getDate();
    return await db
        .collection(collectionName)
        .doc(id)
        .set({
            data: data,
        })
        .then((res) => {
            console.log("insertOrUpdateToDb", res);
            if (res.affectedDocs > 0) {
                return res.data[0].data;
            }
            return res;
        });
}

function getDate() {
    let date = new Date();
    return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
}

module.exports = {
    requestChineseFortune
}
