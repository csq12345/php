/**
 * Created by chensq on 2015/10/9.
 */
//TMS地图换算公式

//瓦片位置转经度 x 为图片位置相对全图大小的百分数
function BlockToLongitude(x, zoom) {
    var re = x / Math.pow(2.0, zoom) * 360.0 - 180;
    return re;
}
//瓦片位置转纬度 y 为图片位置相对全图大小的百分数
function BlockToLatitude(y, zoom) {
    var n = Math.PI - (2.0 * Math.PI * y) / Math.pow(2.0, zoom);
    var re = Math.atan(Math.sinh(n)) / Math.PI * 180;
    return re;
}

//经度转瓦片位置像素
function LongitudeToBlock(x, zoom) {
    x=x*1;

    var blockpx = ((x + 180.0) / 360.0 * Math.pow(2.0, zoom));
    return blockpx;
}
//纬度转瓦片位置像素
function LatitudeToBlock(y, zoom) {
    y=y*1;
    var blockpy = ((1.0 - Math.log(Math.tan(y * Math.PI / 180.0) +
        1.0 / Math.cos(y * Math.PI / 180.0)) / Math.PI) / 2.0 * Math.pow(2.0, zoom));
    return blockpy;
}
