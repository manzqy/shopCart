$(function() {
  // 加载本地数据
  let cartData = jTools.getData("cartData");
  // 初始化页面
  let prevNum = 1;
  var id = location.search.split("=");
  id = id[id.length - 1];
  let data = [];
  data = phoneData.find(e => e.pID == id);
  function load(arr = []) {
    $(".sku-name").text(arr.name);
    $(".dd>em").text("￥" + arr.price);
    $(".preview-img>img").attr("src", arr.imgSrc);
  }
  load(data);
  // 保存数据
  $(".choose-number").on("focus", function() {
    prevNum = $(this).val();
  });
  // 手动设置数量
  $(".choose-number").on("blur", function() {
    let num = $(this).val();
    var reg = /^\d+$/g;
    if (reg.test(num) && num >= 1) {
      $(this).val(num);
      $(".reduce").removeClass("disabled");
    } else {
      $(this).val(prevNum);
    }
  });

  // 点击增加数量
  $(".add").on("click", function() {
    let num = $(".choose-number").val();
    $(".choose-number").val(++num);
    $(".reduce").removeClass("disabled");
  });
  // 点击减少数量
  $(".reduce").on("click", function() {
    let num = $(".choose-number").val();
    if (num <= 1) {
      $(this).addClass("disabled");
      return;
    }
    $(".choose-number").val(--num);
  });
  // 添加购物车
  $(".addshopcar").on("click", function() {
    var exist = cartData.some(e => e.pID == id);
    let num = $(".choose-number").val();
    if (!exist) {
      data.number = parseInt(num);
      data.isCheck = true;
      cartData.push(data);
    } else {
      let obj = cartData.find(e => e.pID == id);
      obj.number += parseInt(num);
    }
    jTools.setData("cartData", cartData);
    location.href = './cart.html';
  });
});
