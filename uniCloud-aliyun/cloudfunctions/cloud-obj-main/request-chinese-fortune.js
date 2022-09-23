// 云函数入口文件
const rp = require("request-promise");
const collectionName = "chinese-fortune";

const db = uniCloud.database();

// 云函数入口函数
const requestChineseFortune = async () => {
  let result = await getFortuneFromDb();
  console.log(result);
  if (!result.err && result.data.length > 0) {
    return result.data[0].data.result.data;
  }
  result = await requestChinesdDayFortune();
  if (result.err) {
    return result;
  }
  insertOrUpdateToDb(result);
  return result.result.data[0].data.result.data;
};

//从聚合数据接口请求万年历接口
async function requestChinesdDayFortune() {
  let date = getDate();
  let url = `http://v.juhe.cn/calendar/day?date=${date}&&key=4c1e1fa337f24adbdd4060f6e45f43c0`;
  url = encodeURI(url);
  return await rp(url)
    .then(function (res) {
      res = JSON.parse(res);
      if (res && res.error_code && res.error_code > 0) {
        throw res;
      }
      return res;
    })
    .catch(function (err) {
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
