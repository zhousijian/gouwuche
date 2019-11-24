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
// console.log(location);

// 遍历数组，获取指定条件元素的方法
let target = phoneData.find(function(e){
    return e.pID == id
})
// console.log(target);
// 就可以把数据动态的渲染到结构里面
// 该价格
$('.dd>em').text(`¥${target.price}`);
// 改标题
$('.sku-name').text(target.name);
// 改图片
$('.preview-img>img').attr('src',target.imgSrc)





// 点击加入购物车
$('.addshopcar').on('click',function(){
    // 先获取输入框里面的件数
    let number = $('.choose-number').val();
    // 判断用户输入的数据的合理性
    // 如果输入的是空的，不是数字，数量小于0 都是不合理的情况
    if(number.trim().length === 0 || isNaN(number) || parseInt(number) <= 0 ){
        alert('商品数量不正确，请正确输入');
        return;
    }

    // // 先从本地数据中读出一个指定的键 - 键是自己定义的
    // let json = localStorage.getItem('shangpin');
    // // 把件数和商品的信息存储到本地数据里面
    // // 因为商品的数据会有很多，所以需要往本地数据里面存储的是一个数组
    // // 但需要判断拿到的数据是否为空，如果为空，就返回一个空数组，如果不为空，就是默认获取数据
    // let arr;
    // if(json === null){
    //     arr = [];
    // }else{
    //     arr = JSON.parse(json);
    // }

    // 可以使用引入获取数据
    let arr = kits.qu('shangpin')

    // 有了数组了，可以向里面存储东西了
// 往数组里面存储的数据应该是一个一个的对象，每个商品都是一个对象
// 在把数据添加到购物车里面之前，要先判断，该商品是否已经存在于购物车中，如果存在了，应该是把数量叠加，而不是添加一个新的商品
//判断是否已经存在该商品 - 根据id判断是都已经存在
let res = arr.find(function(e){
    return e.pID == id
});
// 为了保证数量是数字，需要把数量先转换为数字
number = parseInt(number);
// 如果数组中有满足条件的元素，res就是一个对象，否则是undefined
if(res){
    res.number += number;
}else{
    // 需要自己构建数据对象
    let obj = {
        pID : target.pID,
        imgSrc : target.imgSrc,
        name : target.name,
        price : target.price,
        // 件数要从输入框里面获取
        number : number,
        // 保持勾选的状态的属性
        isChecked : true
    };
    // 把数据放到数组里面，然后存到本地数据里面
    arr.push(obj);
}

// // 把数组转换为json格式
// json = JSON.stringify(arr);
// // 把数据存储到本地数据里
// localStorage.setItem('shangpin',json);
// // 最后需要跳转到购物车页面

// 可以使用封装好的函数
kits.cun('shangpin',arr);

// js里面的路劲要相对于引用他的html页面来说的
location.href = './cart.html';
});

})

