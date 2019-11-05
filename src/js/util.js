// import moment from 'moment'
// const begiMonth=moment().add(0,'month').format('YYYY-MM') + '-01';
// const today=moment().subtract(0,'days').format('YYYY-MM-DD')
// export{
//   begiMonth,today
// }
// //格式化日期
// export const fm = (date) => {
//     return moment(date).format('YYYY-MM-DD')
//
// }
//
// //判断一个元素是否在某元素里
// export const isParent = (obj,parentObj) =>{
//     while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
//         if (obj == parentObj){
//             return true;
//         }
//         obj = obj.parentNode;
//     }
//     return false;
// }
//
//
//
// /**
//  * 检查手机号码格式
//  */
// export const checkPhoneValid = (phoneNum) => {
//     var reg = /^1[0-9]{10}$/
//     return reg.test(phoneNum)
//   }
//
//   /**
//    * 账号规则
//    */
//   export const checkUserNameValid = (username) => {
//     var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
//     return reg.test(username)
//   }
//
//   /**
//    * 密码规则
//    */
//   export const checkPasswordValid = (pwd) => {
//     var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
//     return reg.test(pwd)
//   }
//
//   /**
//    * 存储localStorage
//    */
//   export const setLocalStorage = (key, value) => {
//     if (!key) return
//     if (typeof value !== 'string') {
//       value = JSON.stringify(value)
//     }
//     window.localStorage.setItem(key, value)
//   }
//
//   /**
//    * 获取localStorage
//    */
//   export const getLocalStorage = key => {
//     if (!key) return
//     return window.localStorage.getItem(key)
//   }
//
//   /**
//    * 删除localStorage
//    */
//   export const removeLocalStorage = key => {
//     if (!key) return
//     window.localStorage.removeItem(key)
//   }
//
//   /**
//    * 生成UUID
//    */
//   export const createUUID = () => {
//     let UUID = require('uuid-js')
//     let uuid4 = UUID.create()
//     return uuid4.toString()
//   }
//
//   /**
//    * 返回手机号码（中间4位数显示'****'）
//    */
//   export const phoneTextWithSecret = (phone) => {
//     return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
//   }
//
//   export const cOption = (res,name,id) =>{
//     var opt=[];
//     res.data.map(item=>{
//         var oo={ex:item[name],id:item[id]}
//         opt.push(oo)
//     })
//     return opt
// }
//
// export const clearUrl=(url)=>{
//   if(url.indexOf('.html')!=-1){
//       if(url.split(".html")[0].indexOf('/')!=-1){
//           var k=url.split(".html")[0].split('/')
//           return k[k.length-1]
//       }else{
//           return url.split(".html")[0]
//       }
//   }else{
//       return url
//   }
// }
//
//
// export const isIframe=(url)=>{
//   if(url.indexOf('.html')!=-1){
//       return {
//         path:'/home',
//         query:{url:url}
//       };
//   }else{
//     return{path:'/'+url} ;
//   }
// }
//
//
// export const toReques=(url,data,serverAX,h)=>{
//   return new Promise((resolve, reject) => {
//       serverAX(url,data,h)
//           .then((res) => {
//               resolve(res)
//           })
//           .catch((err) => {
//               console.log(url+'错误信息:'+err);
//               reject(err)
//           })
//   });
// }
//
//
//
//
