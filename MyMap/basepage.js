/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();

});

var blockSize = 150;//图块大小
var xblockcount = 6, yblockcount = 5;//图块矩阵大小
var objShowboard, objCanvas, objBackground, objtxtmousedown, objtxtmouseup, objtxtmousemove, objtxtcanvasmove
    , objcanvasdown, objzoomlevel;//常用对象
var exMouseMove, eyMouseMove;
var exMouseUp, eyMouseUp;
var exMouseDown, eyMouseDown;//鼠标按下是的位置
var mouseIsDown = false;//鼠标是否按下
var canvasoffsetx = 0, canvasoffsety = 0;//画板当前移动位置
var initCanvasoffsetX = -1675, initCanvasoffsetY = -609;//初始画板移动位置
var nowzoom = 4;//当前缩放级别
var mt = 0;
var zoomarray = new Array(
    {z: 4, mx: 15, my: 15},
    {z: 5, mx: 31, my: 31},
    {z: 6, mx: 63, my: 63},
    {z: 7, mx: 127, my: 127},
    {z: 8, mx: 255, my: 255},
    {z: 9, mx: 511, my: 511},
    {z: 10, mx: 1023, my: 1023},
    {z: 11, mx: 2047, my: 2047},
    {z: 12, mx: 4095, my: 4095},
    {z: 13, mx: 8191, my: 8191},
    {z: 14, mx: 16383, my: 16383},
    {z: 15, mx: 32767, my: 32767},
    {z: 16, mx: 65535, my: 65535},
    {z: 17, mx: 131071, my: 131071},
    {z: 18, mx: 262143, my: 262143},
    {z: 19, mx: 524287, my: 524287},
    {z: 20, mx: 1048575, my: 1048575},
    {z: 21, mx: 2097151, my: 2097151}
);

//图片文件夹路径
var picpath = new Array(
    "D:/temp/googlepic/0",
     "D:/temp/googlepic/1",
    "D:/temp/googlepic/3",
    "E:/temp/googlepic/"
);
http://mt1.google.cn/vt?pb=!1m4!1m3!1i6!2i50!3i24!2m3!1e0!2sm!3i323238179!3m9!2szh-Hans-CN!3sCN!5e78!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0
//初始化
    function Initital() {
        objCanvas = $("#canvas");
        objBackground = $("#background");
        objShowboard = $("#ShowBoard");
        objShowboard.mousemove(BoardOnMouseMove);
        objShowboard.mousedown(BoardOnMouseDown);
        objShowboard.mouseup(BoardOnMouseUp);


        objtxtmousedown = $("#txtmousedown");
        objtxtmouseup = $("#txtmouseup");
        objtxtmousemove = $("#txtmousemove");
        objtxtcanvasmove = $("#txtcanvasmove");
        objcanvasdown = $("#txtcanvasdown");

        objzoomlevel = $("#txtzoomlevel");

        AddBlock(xblockcount, yblockcount);
    }

//创建图块
function AddBlock(mx, my) {
    var bb = $(".baseblock");
    for (var y = 0; y < my; y++) {
        for (var x = 0; x < mx; x++) {
            // $("#canvas").append("<div id='block"+x+y+"' class='block' style='margin-left: "+mleft+"px;margin-top:"+mtop+"px'></div>");
            var clonebb = bb.clone();//创建原图块副本
            clonebb.attr("id", "block" + x + y);
            clonebb.attr("datax", x);
            clonebb.attr("datay", y);
            clonebb.attr("class", "block");
            clonebb.css("width", blockSize);
            clonebb.css("height", blockSize);
            clonebb.find("#xy").text(x + " " + y);

            objCanvas.append(clonebb);

            SetBlockLocation(x, y, clonebb, 0, 0);

            SetBlockImg(clonebb, nowzoom);

        }
    }
}

function ReDraw() {
    objzoomlevel.val(nowzoom);
    AddBlock(xblockcount, yblockcount);
}

function ClearBlock() {
    objCanvas.text("");
}

//设置图块位置//mx,my为图块在画板中的位置 要换算成点位置 offsetx offsety要移动的距离
function SetBlockLocation(mx, my, block, offsetx, offsety) {

    //需要加上当前偏移和历史偏移
    var mleft = ( mx * blockSize) + offsetx + canvasoffsetx;
    var mtop = (my * blockSize) + offsety + canvasoffsety;


    block.find("#offset").text(mleft + " " + mtop);//相对偏移

//计算图块的位置倍数
    var oldxMultiple = block.attr("xmultiple");
    var oldyMultiple = block.attr("ymultiple");

    var borderxy = blockSize + blockSize / 2;//移动的边框大小，为块大小的一半 当超过这个时 才触发板块交替

    var xMultiple = Math.floor((mleft + borderxy) / (xblockcount * blockSize));
    var yMultiple = Math.floor((mtop + borderxy) / (yblockcount * blockSize));
    block.attr("xmultiple", xMultiple);
    block.attr("ymultiple", yMultiple);
    block.find("#xyM").text(xMultiple + " " + yMultiple);

    //将相对位移换算成绝对位移
    if (mleft > 0) {
        mleft = (mleft + borderxy) % (xblockcount * blockSize) - borderxy;
    } else if (mleft < -borderxy) {
        mleft = (mleft + borderxy) % (xblockcount * blockSize) + (xblockcount * blockSize - (borderxy));
    }
    if (mtop > 0) {
        mtop = (mtop + borderxy) % (yblockcount * blockSize) - borderxy;
    } else if (mtop < -borderxy) {
        mtop = (mtop + borderxy) % (yblockcount * blockSize) + (yblockcount * blockSize - (borderxy));
    }


    block.css("margin-left", mleft);
    block.css("margin-top", mtop);
    block.find("#xyset").text(mleft + " " + mtop);//实际偏移


    if (oldxMultiple != xMultiple
        || oldyMultiple != yMultiple) {
        //如果倍数与原来不同 说明图块需要轮转
        OnBolckChangeMultiple(block);
    }

}


//鼠标按下时执行
function BoardOnMouseDown(e) {
    mouseIsDown = true;
    exMouseDown = e.offsetX;//获取鼠标按下位置
    eyMouseDown = e.offsetY;

    objtxtmousedown.val(exMouseDown + " " + eyMouseDown);
}


//鼠标抬起时
function BoardOnMouseUp(e) {
    mouseIsDown = false;
    exMouseUp = e.offsetX;//获取鼠标抬起位置
    eyMouseUp = e.offsetY;
    canvasoffsetx += exMouseMove;//保存移动位置
    canvasoffsety += eyMouseMove;

    objtxtcanvasmove.val(canvasoffsetx + "," + canvasoffsety)

    objtxtmouseup.val(exMouseUp + " " + eyMouseUp);

    objcanvasdown.val((exMouseUp - canvasoffsetx) + "," + (eyMouseUp - canvasoffsety));

    var zm = GetZoom(nowzoom);

    //var rpxx = (zm.mx + 1)  * blockSize;//每东西半球总像素点
    //var rpxy = (zm.my + 1)  * blockSize;//每南北半球总像素点
    var latitudeBlock = (-canvasoffsety + 300) / blockSize;
    var longitudeBlock = (-canvasoffsetx + 300) / blockSize;

    var lon = BlockToLongitude(longitudeBlock, nowzoom);
    var lat = BlockToLatitude(latitudeBlock, nowzoom);

    $("#txtE").val(lon);//经度
    $("#txtN").val(lat);//纬度
}




//鼠标移动时
function BoardOnMouseMove(e) {
    exMouseMove = 0;
    eyMouseMove = 0;
    if (mouseIsDown) {
        exMouseMove = e.offsetX - exMouseDown;
        eyMouseMove = e.offsetY - eyMouseDown;

        objtxtmousemove.val(exMouseMove + " " + eyMouseMove);

        MoveBlock(exMouseMove, eyMouseMove);
    }
}

//移动图块 movex movey 图块需要移动的距离
function MoveBlock(movex, movey) {
    //遍历所有图块 逐个移动
    objCanvas.children().each(function () {
        var datax = $(this).attr("datax");
        var datay = $(this).attr("datay");
        SetBlockLocation(datax, datay, $(this), movex, movey);
    });

    //SetBlockLocation(0,0, $("#block00"),movex,movey);
}


function GetZoom(zoomlevel) {
    return zoomarray[zoomlevel - 4];
}

//当图块倍数发生变化时
function OnBolckChangeMultiple(block) {
    SetBlockImg(block, nowzoom);
}

function SetBlockImg(block, zoomlevel) {
    var xMultiple = block.attr("xmultiple");
    var yMultiple = block.attr("ymultiple");
    var datax = block.attr("datax") - xblockcount * xMultiple;
    var datay = block.attr("datay") - yblockcount * yMultiple;
    if (datax == 16 && datay == 10) {
        datax = datax;
    }
    if (datax < 0 || datay < 0) {
        block.find(".img").attr("src", picpath[0] + "0.png");
        block.find("#xyimg").text(zoomlevel + "_" + datax + "_" + datay);
        return;
    }
    var zm = GetZoom(zoomlevel);

    if (datax > zm.mx || datay > zm.my) {
        block.find(".img").attr("src", picpath[0] +  "0.png");
        block.find("#xyimg").text(zoomlevel + "_" + datax + "_" + datay);
        return;
    }
    var mx = (zm.my + 1) * (datax + 1);//分部文件夹编号
    mx = Math.floor(mx / 1000);
    var path = picpath[mt] + "/" + zoomlevel + "/" + zoomlevel + "_" + mx + "/" + zoomlevel + "_" + datax + "_" + datay + ".png";
    block.find(".img").attr("src", path);
    block.find("#xyimg").text(zoomlevel + "_" + mx + "/" + zoomlevel + "_" + datax + "_" + datay);
}
//放大
function SetZoomAdd() {
    if (nowzoom < 21) {
        nowzoom++;

        canvasoffsetx = parseInt(canvasoffsetx * 2 - 300);
        canvasoffsety = parseInt(canvasoffsety * 2 - 300);


        ClearBlock();
        ReDraw();
    }
}
//缩小
function SetZoomMinus() {
    if (nowzoom > 4) {
        nowzoom--;

        canvasoffsetx = parseInt((canvasoffsetx + 300) / 2);
        canvasoffsety = parseInt((canvasoffsety + 300) / 2);


        ClearBlock();
        ReDraw();
    }
}

function tablocation() {
    var Evalue = $("#txtE").val();
    var Nvalue = $("#txtN").val();
    //$("#txtE").val((-canvasoffsetx+300-rpxx)/rpxx*180);
    //$("#txtN").val(-(-canvasoffsety+300-rpxy)/rpxy*180);

    $("#txtN").val(Math.acos(Evalue));

    //var zm=GetZoom(nowzoom);
    //
    //var rpxx = (zm.mx + 1) / 2 * blockSize;//每东西半球总像素点
    //var rpxy = (zm.my + 1) / 2 * blockSize;//每南北半球总像素点
    //if (Evalue > 0) {
    //    canvasoffsetx =300- Evalue / 180 * rpxx - rpxx ;
    //}
    //if (Nvalue > 0) {
    //    canvasoffsety = Nvalue / 90 * rpxy - rpxy + 300;
    //}
    //ClearBlock();
    //ReDraw();
}


function changemaptype(maptype) {
    mt = maptype;
    ReDraw();
}