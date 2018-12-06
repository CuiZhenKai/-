const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'csessioninfo.user_info')
        .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
        .where('id', id)
        .first()
    // console.log(detail);
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, {
        summary: detail.summary.split('\n'),
        user_info: {
            nickName: info.nickName,
            avatarUrl: info.avatarUrl
        }
    })
    await mysql('books')
        .where('id', id)
        .increment('count', 1)
}
