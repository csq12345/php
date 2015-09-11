/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();
    AddBlock(8, 6);
});

var objShowboard, objCanvas,objBackground, objtxtmousedown, objtxtmouseup;//常用对象

//初始化
function Initital() {
    objCanvas =$("#canvas");
    objBackground =$("#background");
    objShowboard =$("#ShowBoard");
    objShowboard.mousedown(BoardOnMouseDown);
    objShowboard.mouseup(BoardOnMouseUp);



    objtxtmousedown = $("#txtmousedown");
    objtxtmouseup = $("#txtmouseup");
}

//创建图块
function AddBlock(mx, my) {
    var bb = $(".baseblock");
    for (var y = 0; y < my; y++) {

        for (var x = 0; x < mx; x++) {

            // $("#canvas").append("<div id='block"+x+y+"' class='block' style='margin-left: "+mleft+"px;margin-top:"+mtop+"px'></div>");
            var clonebb = bb.clone();//创建原图块副本
            clonebb.attr("id", "block" + x + y);
            clonebb.attr("class", "block");
            objCanvas.append(clonebb);

            SetBlockLocation(x, y, clonebb);
        }
    }
}

//设置图块位置//mx,my为图块在画板中的位置 要换算成点位置
function SetBlockLocation(mx, my, block) {
    var mleft = mx * 128;
    var mtop = my * 128;

    block.css("margin-left", mleft);
    block.css("margin-top", mtop);
}


var exMouseDown, eyMouseDown;//鼠标按下是的位置
var mouseIsDown = false;//鼠标是否按下
//鼠标按下时执行
function BoardOnMouseDown(e) {
    exMouseDown = e.offsetX;//获取鼠标按下位置
    eyMouseDown = e.offsetY;

    objtxtmousedown.val(exMouseDown + " " + eyMouseDown);
}


var exMouseUp, eyMouseUp;
//鼠标抬起时
function BoardOnMouseUp(e) {
    exMouseUp = e.offsetX;//获取鼠标抬起位置
    eyMouseUp = e.offsetY;

    objtxtmouseup.val(exMouseUp + " " + eyMouseUp);
}

//鼠标移动时
function BoardOnMouseMove() {

}

//移动图块
function MoveBlock() {

}