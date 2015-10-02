/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();

});

var blockSize = 250;//图块大小
var xblockcount = 6, yblockcount = 5;//图块矩阵大小
var objShowboard, objCanvas, objBackground, objtxtmousedown, objtxtmouseup, objtxtmousemove;//常用对象
var exMouseMove, eyMouseMove;
var exMouseUp, eyMouseUp;
var exMouseDown, eyMouseDown;//鼠标按下是的位置
var mouseIsDown = false;//鼠标是否按下
var canvasoffsetx = 0, canvasoffsety = 0;//画板当前移动位置
var nowzoom = 4;//当前缩放级别

var zoom = new Array(
    {z: 4, mx: 15, my: 15},
    {z: 5, mx: 15, my: 15},
    {z: 6, mx: 15, my: 15},
    {z: 7, mx: 15, my: 15},
    {z: 8, mx: 15, my: 15},
    {z: 9, mx: 15, my: 15},
    {z: 10, mx: 15, my: 15},
    {z: 11, mx: 15, my: 15},
    {z: 12, mx: 15, my: 15},
    {z: 13, mx: 15, my: 15},
    {z: 14, mx: 15, my: 15},
    {z: 15, mx: 15, my: 15},
    {z: 16, mx: 15, my: 15},
    {z: 17, mx: 15, my: 15},
    {z: 18, mx: 15, my: 15},
    {z: 19, mx: 15, my: 15},
    {z: 20, mx: 15, my: 15},
    {z: 21, mx: 15, my: 15}
);

//图片文件夹路径
var picpath = new Array(
    "P:/TEMP/googlepic/"
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

    var borderxy = blockSize + blockSize / 2;//移动的边框大小，为块大小的一半 当超过这个时 才出发板块交替

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
    objtxtmouseup.val(exMouseUp + " " + eyMouseUp);
}


//鼠标移动时
function BoardOnMouseMove(e) {
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
    return zoom[zoomlevel - 4];
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

    if (datax < 0 || datay < 0) {
        block.find(".img").attr("src", picpath[0] + "0.png");
        return;
    }
    var zm = GetZoom(zoomlevel);
    var mx = (zm.my + 1) * (block.attr("datax") + 1);
    mx = Math.floor(mx / 1000);
    var path = picpath[0] + "/" + zoomlevel + "_" + mx + "/" + zoomlevel + "_" + datax + "_" + datay + ".png";
    block.find(".img").attr("src", path);
    block.find("#xyimg").text(zoomlevel + "_" + datax + "_" + datay);
}
//放大
function SetZoomAdd() {
    if (nowzoom < 10) {
        nowzoom++;
        ClearBlock();
        ReDraw();
    }
}
//缩小
function SetZoomMinus() {
    if (nowzoom > 4) {
        nowzoom--;
        ClearBlock();
        ReDraw();
    }
}