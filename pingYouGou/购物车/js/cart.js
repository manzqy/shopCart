$(function() {
  let cartData = jTools.getData("cartData");
  let prevNum = 0;
  function init(arr = []) {
    let str = "";
    let derail = true;
    if (!arr.join("")) {
      $(".empty-tip").show();
      $(".cart-header").hide();
      $(".total-of").hide();
    } else {
      $(".empty-tip").hide();
      $(".cart-header").show();
      $(".total-of").show();
      arr.forEach(e => {
        str += `<div class="item" data-id="${e.pID}">
                <div class="row">
                  <div class="cell col-1 row">
                    <div class="cell col-1">
                      <input type="checkbox" class="item-ck" true=""
                      ${e.isCheck ? "checked" : ""}>
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
                      <input autocomplete="off" type="text" class="number fl" value="${
                        e.number
                      }">
                      <a href="javascript:void(0);" class="add fl">+</a>
                    </div>
                  </div>
                  <div class="cell col-1 tc lh70">
                    <span>￥</span>
                    <em class="computed">${e.price * e.number}</em>
                  </div>
                  <div class="cell col-1">
                    <a href="javascript:void(0);" class="item-del" data-toggle="modal" data-target="#myModal">从购物车中移除</a>
                  </div>
                </div>
              </div>`;
      });
      $(".item-list").html(str);
      derail = arr.some(e => e.isCheck == false);
      $(".pick-all").prop("checked", !derail);
    }
  }
  init(cartData);
  // 全选按钮
  $(".pick-all").on("click", function() {
    let derail = $(this).prop("checked");
    $(".item-ck").prop("checked", derail);
    $(".pick-all").prop("checked", derail);
    cartData.forEach(e => (e.isCheck = derail));
    jTools.setData("cartData", cartData);
    total();
  });
  // 单选按钮
  $(".item-list").on("click", ".item-ck", function() {
    let derail = $(this).prop("checked");
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let key = $(".item-ck").length == $(".item-ck:checked").length;
    $(".pick-all").prop("checked", key);
    let obj = cartData.find(e => e.pID == id);
    obj.isCheck = derail;
    jTools.setData("cartData", cartData);
    total();
  });
  // total money
  function total() {
    let arr = cartData.filter(e => e.isCheck == true);
    let num = 0,
      allPrice = 0;
    arr.forEach(e => {
      num += e.number;
      allPrice += e.price * e.number;
    });
    $(".selected").text(num);
    $(".total-money").text(allPrice);
  }
  total();
  // 单击存储数据
  $(".item-list").on("focus", ".number", function() {
    prevNum = $(this).val();
  });
  $(".item-list").on("blur", ".number", function() {
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let num = $(this).val();
    var reg = /^\d+$/g;
    if (reg.test(num) && num >= 1) {
      $(this).val(num);
      let obj = cartData.find(e => e.pID == id);
      obj.number = parseInt(num);
      jTools.setData("cartData", cartData);
      $(this)
        .parents(".item")
        .find(".computed")
        .text(num * obj.price);
      total();
    } else {
      $(this).val(prevNum);
    }
  });
  // 点击增加数据
  $(".item-list").on("click", ".add", function() {
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let num = $(this)
      .prev()
      .val();
    $(this)
      .prev()
      .val(++num);
    let obj = cartData.find(e => e.pID == id);
    obj.number = parseInt(num);
    jTools.setData("cartData", cartData);
    $(this)
      .parents(".item")
      .find(".computed")
      .text(num * obj.price);
    total();
  });
  // 点击删除数据
  $(".item-list").on("click", ".reduce", function() {
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let num = $(this)
      .next()
      .val();
    if (num <= 1) {
      return;
    }
    $(this)
      .next()
      .val(--num);
    let obj = cartData.find(e => e.pID == id);
    obj.number = parseInt(num);
    jTools.setData("cartData", cartData);
    $(this)
      .parents(".item")
      .find(".computed")
      .text(num * obj.price);
    total();
  });
  //  删除数据
  $(".item-list").on("click", ".item-del", function() {
    layer.confirm("你确定要删除吗?", { icon: 0, title: "警告" }, index => {
      layer.close(index);
      let id = $(this)
        .parents(".item")
        .attr("data-id");
      $(this)
        .parents(".item")
        .remove();
      cartData = cartData.filter(e => {
        return e.pID != id;
      });
      console.log(cartData);
      jTools.setData("cartData", cartData);
      total();
      !cartData.join("") && init(cartData);
    });
  });
});
