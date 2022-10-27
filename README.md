# uniapp 星座运势应用

## 聚合数据 api 设置
- 申请星座运势接口：https://www.juhe.cn/docs/api/id/58
- 申请万年历接口：https://www.juhe.cn/docs/api/id/177
- 在 uniCloud/cloudfunctions/cloud-obj-main/ 目录下创建 config.js 文件，内容如下：
```
const juhe = {
    chineseFortuneKey: "<万年历接口 key>",
    horoscopeKey: "<星座接口 key>"
}


module.exports = {
    juhe
}
```

## unicloud
- 申请 [unicloud](https://unicloud.dcloud.net.cn/home), 推荐免费的阿里云作为服务空间。
- 在云数据库中创建 chinese-fortune 和 horoscope 两张表。

## 下载 hbuilderx 打开项目
- [HBuilderX](https://www.dcloud.io/hbuilderx.html)
- 右键单击 uniCloud 目录，选择“关联云服务空间或项目”，在弹出窗口选择已经创建好的 unicloud 服务空间。
- 右键单击 uniCloud/cloudfunctions/cloud-obj-main/ 目录，选择“上传部署”，将云对象部署到你的云空间。