const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {comment, phone, locations, bookid, openid} = ctx.request.body
    console.log(comment, phone, locations, bookid, openid)
    try {
        await mysql('comments')
            .insert({openid, bookid, comment, phone, locations})

        ctx.state.data = {
            msg: 'success'
        }
    } catch (error) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败' + error.sqlMessage
            }
        }
    }
}
