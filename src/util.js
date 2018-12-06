// 工具函数库

// 导入配置文件
import config from './config'

// http get工具函数 获取数据
// 异步处理request请求,摒弃使用回调函数模式  get请求
export function get (url, data) {
  return request(url, 'GET', data)
}
// post请求
export function post (url, data) {
  return request(url, 'POST', data)
}

// 总的请求函数
// function request(url,method,data){
//     return new Promise((resolve,reject)=>{
//         wx.request({
//             data,
//             method,
//             url:config.host+url,
//             success:function (res){
//                 console.log("1");
//                 if(res.data.code === 0){
//                     resolve(res.data.data);
//                 }else{
//                     reject(res.data);
//                 }
//             }
//         })
//     });
// }
function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          console.log(res)
          showModal('失败', `${res.data.data.msg}`)
          reject(res.data)
        }
      }
    })
  })
}

// 成功或者失败显示的Toast
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'loading',
    duration: 1000
  })
}

export function showModal (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}
