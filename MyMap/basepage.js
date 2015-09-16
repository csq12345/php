/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();

});

var blockSize=100;//图块大小

var objShowboard, objCanvas, objBackground, objtxtmousedown, objtxtmouseup, objtxtmousemove;//常用对象
var exMouseMove, eyMouseMove;
var exMouseUp, eyMouseUp;
var exMouseDown, eyMouseDown;//鼠标按下是的位置
var mouseIsDown = false;//鼠标是否按下
var canvasoffsetx=0,canvasoffsety=0;
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


    AddBlock(5, 4);
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
            clonebb.css("width",blockSize);
            clonebb.css("height",blockSize);
            clonebb.find("#xy").text(x+" "+y);

            objCanvas.append(clonebb);

            SetBlockLocation(x, y, clonebb,0,0);
        }
    }
}

//设置图块位置//mx,my为图块在画板中的位置 要换算成点位置
function SetBlockLocation(mx, my, block,offsetx,offsety) {

    //需要加上当前偏移和历史偏移
    var mleft =( mx * blockSize) +offsetx+canvasoffsetx;
    var mtop = (my * blockSize)+offsety+canvasoffsety ;
    block.find("#offset").text(mleft+" "+mtop);

    var dx=Math.floor( mleft/400);
if(dx>0){
    mleft=mleft-400*dx-100;
}


    block.css("margin-left", mleft);
    block.css("margin-top", mtop);
    block.find("#xyset").text(mleft+" "+mtop);
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
    canvasoffsetx+=exMouseMove;//保存移动位置
    canvasoffsety+=eyMouseMove;
    objtxtmouseup.val(exMouseUp + " " + eyMouseUp);
}


//鼠标移动时
function BoardOnMouseMove(e) {
    if (mouseIsDown) {
        exMouseMove = e.offsetX - exMouseDown;
        eyMouseMove = e.offsetY - eyMouseDown;

        objtxtmousemove.val(exMouseMove + " " + eyMouseMove);

        MoveBlock(exMouseMove,eyMouseMove);
    }
}

//移动图块
function MoveBlock(movex, movey) {
    objCanvas.children().each(function () {
        var datax = $(this).attr("datax");
        var datay = $(this).attr("datay");
        SetBlockLocation(datax, datay, $(this), movex, movey);
    });

    //SetBlockLocation(0,0, $("#block00"),movex,movey);
}