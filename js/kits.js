// 先定义一个对象
let kits = {};
// 封装获取本地存储的数据，默认是返回数组的
kits.qu = function(key){
    // 先从本地数据里把对应键的数据去出来
    let json = localStorage.getItem(key);
    // 先定义一个数组，拿出来的数据要往里面存
    let arr;
    // 但需要判断拿到的数据是否为空，如果为空，就返回一个空数组，如果不为空，就是默认获取数据
    if(json === null){
        arr = [];
    }else{
    // 从本地拿出来的数据格式是json，要转换为复杂类型
        arr = JSON.parse(json)
    }
    return arr;
}

// 封装把数据存储到本地数据里面的方法
kits.cun = function(key,data){
    let json = JSON.stringify(data);
    localStorage.setItem(key,json);
}

// 封装一个计算总价格和总件数的函数，方便每次使用就调用
kits.count = function(data){
    // 第三个功能，计算总价和总件数
    // 每次需要计算总价和总件数，都是直接从本地数据里面，得到 isChecked 为true的数据，然后计算总价和总件数
    // 先定义一个总件数和总价格
    let totalCount = 0; // 总件数
    let totalMoney = 0; // 总价格
    data.forEach(e => {
        if(e.isChecked){
            totalCount += e.number;
            totalMoney += e.number * e.price;
        }
    });
    // 把总价和总件数更新到页面里面
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
}