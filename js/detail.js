// $(function(){
//     // 先截取 location.search 里面的id
//     let id = location.search.substring(4);
//     // 到数组里面把对应id的数据获取出来
//     // foreach可以获取到对应的数据
//     phoneData.forEach(function(e){
//         if(e.pID == id){
//             // 就可以把数据动态的渲染到结构里面
//             // 把价格修改
//             $('.dd>em').text(`¥${e.price}`);
//             // 改名字
//             $('.sku-name').text(e.name)
//             // 改图片
//             $('.preview-img>img').attr('src',e.imgSrc)
//         }
//     })
// })
// 
// 防止污染，写入口函数
$(function(){
// 先截取 location.search 里面的id
let id = location.search.substring(4)
console.log(location);

// 遍历数组，获取指定条件元素的方法
let target = phoneData.find(function(e){
    return e.pID == id
})
// console.log(target);
// 该价格
$('.dd>em').text(`¥${target.price}`);
// 改标题
$('.sku-name').text(target.name);
// 改图片
$('.preview-img>img').attr('src',target.imgSrc)



})