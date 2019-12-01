// 习惯要写入口函数 防止污染
$(function(){
// // 第一个功能，先读取本地数据中的数据，然后动态的生成列表结构
// // 把本地存储里的数据拿出来
// let json = localStorage.getItem('shangpin');
// // 把json格式转为字符串
// let arr = JSON.parse(json)

// 先读取本地数据中的数据，然后动态生成列表
let arr = kits.qu('shangpin');

// console.log(arr);
// 遍历数组，生成指定的结构
// 先准备一个空字符串，待遍历数组后往里面添加数据
let html = '';
arr.forEach(function(e){
    html += `<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" ${e.isChecked?"checked":''}>
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl ">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.price * e.number}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`
//   console.log(e);
});
// 把数据动态生成在结构里
$('.item-list').append(html)

// 如果arr里面的数据不是全都勾选的，需要把全选的勾选去掉
// let onCkall = arr.find(function(e){
//   return e.isChecked === false;
// });
// 简写
let onCkall = arr.find(function(e){
  return !e.isChecked;
})
// console.log(onCkall);

// if(onCkall){
//   // 有没有勾选的产品
//   $('.pick-all').prop('checked',false);
// }
// 简写
$('.pick-all').prop('checked',!onCkall);


// 判断获取的本地数据的长度是否为0，如果不是，要把某些东西隐藏和显示
if(arr.length !== 0){
    // 把空空如也的这个盒子隐藏
    $('.empty-tip').hide();
    // 把全选的这个大盒子显示出来
    $('.cart-header').show();
    // 把结算的这个大盒子显示出来
    $('.total-of').show();
}
// 实现全选
$('.pick-all').on('click',function(){
// 先保存全选下的状态
let res = $(this).prop('checked');
// 让单选的状态和全选的一样即可
$('.item-ck').prop('checked',res);
// 这个也是和全选的状态一样即可
$('.pick-all').prop('checked',res);
// 先把本地数据里面的所有的数据都勾选
arr.forEach(function(e){
  e.isChecked = res;
})
// 重新存进本地数据
kits.cun('shangpin',arr);
// 点击全选的时候，也需要把数据重新更新
kits.count(arr); //--目前还不需要
})

// 实现单选--由于单选是动态生成的，所以使用事件委托
$('.item-list').on('click','.item-ck',function(){
    // 如果勾选的个数和总个数一致==全选
    let ckall = $('.item-ck').length === $('.item-ck:checked').length;
    // 设置全选的状态和这个一样即可
    $('.pick-all').prop('checked',ckall);
  // 点选的同时，要修改该多选框对应的本地数据里面的选中状态
  // 需要根据点选的商品的id，到本地数据中，修改 isChecked 属性
  let pID = $(this).parents('.item').attr('data-id');
  // console.log(pID);
  // 获取当前这个单选是否是选中
  // 获取当前这个单选的状态
  let isChecked = $(this).prop('checked');
  // console.log(isChecked);
  // 遍历本地数组
  arr.forEach(function(e){
    if(e.pID == pID){
      // 就需要把当前的这个产品的选中状态改成和勾选状态一致
      e.isChecked = isChecked;
    }
  });
  // 把数据更新回本地数据就行
  kits.cun('shangpin',arr);
  // 每次点选需要计算总价和总件数
  kits.count(arr);  //--目前还不需要
})

// 调用计算总价格和总件数的函数
kits.count(arr);

// 实现数量的加减  --动态生成的数据，使用事件委托来做
$('.item-list').on('click','.add',function(){
  // 让输入框里面的数量增加
  let prev = $(this).prev(); // 找到当前元素的上一个兄弟元素
  let current = prev.val();
  prev.val(++current);
  // 数量也要更新到本地数据
  let id = $(this).parents('.item').attr('data-id');
  let obj = arr.find(function(e){
    return e.pID == id
  })
  // console.log(obj);
  //
  obj.number = current;
  // 要把数据存储到本地里面才可以
  kits.cun('shangpin',arr);
  // 更新总件数和总价钱
  kits.count(arr);
  // 更新右边的总价
  // find还有一个方法用于查找某个元素的后代元素中，满足添加的部分
  $(this).parents('.item').find('.computed').text(obj.number * obj.price);
})

// 点击减号
$('.item-list').on('click','.reduce',function(){
  // 让输入框里面的数量减少
  let next = $(this).next();
  let current = next.val();
  // 需要判断一下，当前的值是否 小于等于1
  if(1 >= current){
    alert('商品的件数不能小于1')
    return;
  }
  next.val(--current);
  // 要把数据存储到本地里面才可以
  // 找到相对应id的元素，把数据存储进去
  let id = $(this).parents('.item').attr('data-id');
  let obj = arr.find(function(e){
    return e.pID == id;
  });
  obj.number = current;
  kits.cun('shangpin',arr);
  // 更新总件数和总价格
  kits.count(arr);
  // 更新右边的总价
  $(this).parents('.item').find('.computed').text(obj.number * obj.price);
})

// 当得到焦点的时候，把当前的值，先保存起来，如果失焦的时候输入的结果是不合理的。我们可以恢复原来的数字--事件委托来做
$('.item-list').on('focus','.number',function(){
  let old = $(this).val();
  // console.log(content);
  // 把旧的，正确的数量先存储起来
  $(this).attr('data-old',old);
})
// 当输入框失去焦点的时候，需要把当前的值也同步到本地数据里面
$('.item-list').on('blur','.number',function(){
  // 跟加减的操作一样的，只不过我们需要对用户的输入进行验证
  let current = $(this).val();
  // 每次让用户自己输入的内容，一定要做合法性判断
  if(current.trim().length === 0 || isNaN(current) || parseInt(current) <= 0){
    let old = $(this).attr('data-old');
    $(this).val(old); //--如果用户输入不正确，恢复以前的正确的数字
    alert('商品数量不正确，请输入一个阿拉伯数字');
    return;
  };
  // 如果验证通过，把总价之类的数据更新即可
  // 数量也要更新到本地数据
  let id = $(this).parents('.item').attr('data-id');
  let obj = arr.find(function(e){
    return e.pID == id;
  });



  // console.log(obj);
  


  obj.number = parseInt(current);
  // 要把数据存储到本地里面才可以
  kits.cun('shangpin',arr);
  // 更新总件数和价格
  kits.count(arr);
  // 更新右边的总价
  $(this).parents('.item').find('.computed').text(obj.number * obj.price);
})

// 实现键盘回车键按下--事件委托
// -- 上面已经把原来的值保存起来了
// $('.item-list').on('click','.number',function(){
//     // 在输入内容前，把当前的值，先保存起来，如果失焦的时候输入结果是不合理的，我们可以恢复原来的数字
//     let num = $(this).val();
//     // 把旧的，正确的数量先存储起来
//     $(this).attr('data-num',num);
//   })

// 实现键盘回车键按下--事件委托
$('.item-list').on('keydown','.number',function(e){
 // console.dir(e);
 // 需要判断按下的是否为回车键
    if(e.keyCode === 13){
      // console.log('是回车键');
      // 先获取当前输入的内容
  let current = $(this).val();
  // 每次让用户自己输入的内容，一定要做合法性判断
  if(current.trim().length == 0 || isNaN(current) || parseInt(current) <= 0){
    let old = $(this).attr('data-old');
    $(this).attr('data-old',old);
    alert('商品数量不正确，请输入一个阿拉伯数字')
    return;
  };
  // 如果验证通过，把总价之类的数据更新即可
  // 数量也要更新到本地数据
  let id = $(this).parents('.item').attr('data-id');
  // 找到id相同的元素
  let obj = arr.find(function(e){
    return e.pID == id;  });
  // 把新的值更新到本地里
  obj.number = parseInt(current);
  // 要把数据存储到本地里面才可以
  kits.cun('shangpin',arr);
  // 计算总价格和总件数
  kits.count(arr);
  // 更新右边的总价
  $(this).parents('.item').find('.computed').text(obj.number * obj.price)
  };
})
 
  



// 实现删除
$('.item-list').on('click','.item-del',function(){
  layer.confirm('你确定要删除吗?', {icon: 0, title:'警告'}, (index)=>{
    layer.close(index);
    // 在这里执行 删除的逻辑
    // 先得到要删除的数据的id
    let id = $(this).parents('.item').attr('data-id');
    // 把当前点击的这个删除对应的这一行删除
    $(this).parents('.item').remove();
    // 还要把本地存储里面的数据删除
    arr = arr.filter(e =>{
      return e.pID != id;
    })




    console.log(arr);
    



    kits.cun('shangpin',arr);
    // 重新更新总件数和总价
    kits.count(arr);
  });
})



})