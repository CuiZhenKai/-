// 导入qcloud模块,每一个新增的模块都首先先要导入qcloud模块,然后我们才可以进行数据库spl语句的操作
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {page,openid} = ctx.request.query
    const size = 3
    const mysqlSelect = mysql('books')
        .select('books.*', 'csessioninfo.user_info')
        .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
        .orderBy('books.id', 'desc')
    // console.log(books);
    // 将我们的数据返回给前台
    let books;
    if(openid){
        books = await mysqlSelect.where('books.openid',openid);
    }else{
        //分页
        // .limit(size)
        // .offset(Number(page) * size)
        books = await mysqlSelect.limit(size)
        .offset(Number(page) * size)
    }
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
