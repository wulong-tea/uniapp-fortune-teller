// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129


module.exports = {
    
	_before: function () { // 通用预处理器

	},

	async getConstellations(param) {
        const request = require("./request-constellations.js");
		return {
			data: await request.requestConstellations(param)
		}
	},
    
    async getChineseFortune() {
        const request = require("./request-chinese-fortune.js");
        return {
            data: await request.requestChineseFortune()
        };
    }
	
}
