const http = require('http')
const {mysql} = require('../qcloud')

// 新增图书
// 获取豆瓣信息
// http://feedback.api.juhe.cn/ISBN?sub=9787536692930&key=5c03fff69922260137c83bd609b6579a
// 入库
module.exports = async (ctx) => {
    // console.log(ctx.request.body);
    // 判断是否存在
    const {isbn, openid} = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: '-1',
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        let url = `http://feedback.api.juhe.cn/ISBN?sub=${isbn}&key=5c03fff69922260137c83bd609b6579a`
        const bookinfo = await getJSON(url)
        const rate = bookinfo.result.levelNum
        const {title, author, publisher, summary, price} = bookinfo.result
        const image = bookinfo.result.images_medium
        // console.log(bookinfo);
        // console.log(bookinfo.result.result);
        // console.log(rate);
        // console.log({
        //     rate,title,images_medium,author,publisher,summary,price
        // });
        // 插入数据库中
        try {
            await mysql('books').insert({
                isbn, openid, title, image, publisher, summary, price, rate, author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: '-1',
                data: {
                    msg: '新增失败' + e.sqlMessage
                }
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                // console.log(bookinfo);
                if (bookinfo.reason) {
                    resolve(bookinfo)
                } else {
                    reject(bookinfo)
                }
                // console.log(bookinfo);
                // urlData += data;
            })
        })
    })
}
