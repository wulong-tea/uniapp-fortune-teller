const rp = require("request-promise");
const collectionName = "horoscope";

const db = uniCloud.database();
// 云函数入口函数
const requestHoroscope = async (event) => {
    let name = event.name;
    let type = event.type;
    let id = event.id;
    let result = await getConsFromDb(id);
    console.log(result);
    if (result && !result.err) {
        console.log("====== cloud obj 数据库命中：", result);
        return result;
    }
    let responseData = await requestCons(name, type);
    if (!responseData || responseData.err) {
        return responseData;
    }
    console.log("====== cloud obj 聚合数据命中：", responseData);
    await insertOrUpdateToDb(id, responseData);
    return await getConsFromDb(id);
};

async function getConsFromDb(id) {
    return db
        .collection(collectionName)
        .doc(id)
        .get()
        .then((res) => {
            return res.data[0];
        })
        .catch((err) => {
            return {
                err: err,
            };
        });
}

//从聚合数据接口请求星座数据
async function requestCons(name, type) {
    let url =
        `http://web.juhe.cn:8080/constellation/getAll?consName=${name}&type=${type}&key=0bfbde9b2d646d5b43423876dc21d123`;
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

async function insertOrUpdateToDb(id, data) {
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



module.exports = {
    requestHoroscope
}

// remote data examples
/*
today:
{
	"date":20210327,
	"name":"双鱼座",
	"QFriend":"狮子座",
	"color":"银色",
	"datetime":"2021年03月27日",
	"health":"80",
	"love":"70",
	"work":"75",
	"money":"80",
	"number":8,
	"summary":"美好的周末，双鱼座可以和家人朋友一起外出游玩，当然也要注意做好防疫措施。或者在阳光明媚的午后来一场大扫除，晒晒被子，把卧室好好整理下。今天在饮食方面尽量清淡些，太油腻的食物可能会拉肚子。",
	"all":"80",
	"resultcode":"200",
	"error_code":0
}
tomorrow:
{
	"date":20210328,
	"name":"双鱼座",
	"QFriend":"水瓶座",
	"color":"淡蓝色",
	"datetime":"2021年03月28日",
	"health":"60",
	"love":"65",
	"work":"80",
	"money":"70",
	"number":2,
	"summary":"今天双鱼座在职场上会制定新的计划，眼前负责的工作也有了眉目，可以让你更快地达成目标。对于未来的工作，你想要达到怎样的高度，甘愿为了这份工作做出怎样的牺牲，都是自己需要思考的重点。",
	"all":"75",
	"resultcode":"200",
	"error_code":0
}
week:
{
	"name":"双鱼座",
	"weekth":13,
	"date":"2021年03月21日-2021年03月27日",
	"health":"本周双鱼会觉得自己的的身心十分愉悦，也会把关注点放在养生上，可以每天睡前泡脚来提高自己的睡眠质量，也会带动身边人更多地关注养生。",
	"job":"双鱼本周在事业上会更好地发挥自己的能力与优势，面对商业上的合作与谈判，都能够运用自己的能力成功完成任务。在学业上的表现也十分出众，由于最近一段时间思路极为清晰，所以在文字上的书写效率极高，也会得到老师的称赞。",
	"love":"双鱼本周在感情上能够更加成熟的去面对，恋爱中的双鱼在经过深思熟虑后，会与另一半商讨未来的规划。单身的双鱼也会因为自己的魅力提升，遇到心仪的对象，一见钟情。",
	"money":"双鱼本周财运极佳，无论是正财运还是偏财运都直线上升，不仅会得到奖金分红，副业上的发展也一路攀升，收入大大增加。",
	"work":"双鱼本周在事业上会更好地发挥自己的能力与优势，面对商业上的合作与谈判，都能够运用自己的能力成功完成任务。在学业上的表现也十分出众，由于最近一段时间思路极为清晰，所以在文字上的书写效率极高，也会得到老师的称赞。",
	"resultcode":"200",
	"error_code":0
}
month:
{
	"date":"2021年03月",
	"name":"双鱼座",
	"month":3,
	"health":"健康：部分人需要留意心脏部位，避免情绪激动。",
	"all":"总运势：本月总体运势不错，积极配合工作就会有不错的效果。",
	"love":"感情运：单身的朋友无聊时候会撩撩小鲜肉，搞搞小暧昧，但也仅限于此，并没有更多的打算；有伴的容易情绪化，对方不搭理你你嫌人家无趣，来找你吧你又嫌烦，总之就是没事儿找事儿。",
	"money":"财运：本月可能会突然花一笔钱给家里或家人添置一些东西，比方说女神节给妈妈跟老婆一人买一个她们中意的物品。",
	"work":"工作运：本月贵人运走高，会有人暗中给你帮助，可能会升职或跨部门提拔，包括你自己在内整个公司都很意外。                                                                                                                                                                                  ",
	"happyMagic":"",
	"resultcode":"200",
	"error_code":0
}
year:
{
	"name":"双鱼座",
	"date":"2021年",
	"year":2021,
	"mima":{
		"info":"需要多留些心",
		"text":[
			"今年，海王星仍然在双鱼座18度的位置左右徘徊。大部分双鱼座都是比较善良的人，为人处事也比较敏感。今年，由于木星的缘故，你们会比往年更加顺利、快乐一点，也没有那么容易悲观难过。但是，大家仍然需要在待人接物时多留几个心眼，遇到不开心的事情也一定要积极和家人、朋友倾诉，不要总是一个人扛着。总的来说，今年对你们而言是比较顺利的一年，鼓起勇气勇往直前。双鱼座今年可佩戴一个星盘保岁吉宏项链作为全年的幸运护身符饰物，银币铸造的船舵星符可提升双鱼们的能量指数，寓意今年信心十足、目标明确、勇往直前！"
		]
	},
	"career":[
		"出于海王星的影响，已经步入职场的双鱼们如果想要自己创业，或是开拓新的事业发展领域，那么今年无疑是比较不错的机会。还在读书的小伙伴们则能够在解决问题时另辟蹊径，得到老师与同学的赞赏。"
	],
	"love":[
		"今年你们的感情运势还算可以，单身的双鱼们身边常常围绕着桃花，但你们却有可能会因为工作繁忙、学业压力大等原因注意不到。已经有伴的小伙伴们则可以享受一段甜蜜的时光，不会发生什么较大的争吵，小日子也过得有滋有味。"
	],
	"health":[
		"本年健康运不错，大病不会发生，小病却也无法避免。只要能够多加注意自己的身体状况，有病及时去医院就医，那么就可以很快恢复健康，无需过于担心。"
	],
	"finance":[
		"今年你们的正财运良好，所涉足的各个领域都有比较稳定的收入，而且在投资理财时也很容易得到比较不错的收获。但是，你们却比较缺乏明确的消费观念，因此很容易一不小心就超支，给自己造成经济压力。不妨试着养成记账的习惯，这可以让你的财运有明显的回升。双鱼座今年可佩戴一串灵鳌增庆手链来提升金钱指数，鳌鱼有鲤化为龙与独占鳌头的象征，寓意双鱼们今年步步高升、奋发有为，期望今年财运亨通，学业事业皆顺遂。"
	],
	"luckeyStone":"青金石",
	"future":"",
	"resultcode":"200",
	"error_code":0
}
*/
