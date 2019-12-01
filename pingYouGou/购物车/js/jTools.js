var jTools = {};
/**
 * @description 得到本地存储的数据
 * @param { key } 数据的名称
 * @return 若为空返回数组
 */
jTools.getData = function(key) {
    var json = localStorage.getItem(key);
    return JSON.parse(json) || [];
}
/**
 * @description 设置本地数据
 * @param { key } 存储数据的名称
 * @param { data } 存储的对象
 * @return {undefined}
 */
jTools.setData = function(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}