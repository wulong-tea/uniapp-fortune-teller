// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129


module.exports = {
    
     
	_before: function () { // 通用预处理器

	},

	async getConstellations(param) {
        const request = require("./request-constellations.js");
        console.log(request);
		// 参数校验，如无参数则不需要
		if (!param) {
			return {
				data: "all"
			}
		}
		// 业务逻辑
		
		// 返回结果
        const result = await request.requestConstellations(param);
		return {
			data: JSON.stringify(result)//请根据实际需要返回值
		}
	}
	
}
