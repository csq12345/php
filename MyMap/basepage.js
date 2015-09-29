/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();

});

var blockSize = 100;//ͼ���С
var xblockcount = 5, yblockcoun = 4;//ͼ������С
var objShowboard, objCanvas, objBackground, objtxtmousedown, objtxtmouseup, objtxtmousemove;//���ö���
var exMouseMove, eyMouseMove;
var exMouseUp, eyMouseUp;
var exMouseDown, eyMouseDown;//��갴���ǵ�λ��
var mouseIsDown = false;//����Ƿ���
var canvasoffsetx = 0, canvasoffsety = 0;//���嵱ǰ�ƶ�λ��
//��ʼ��
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


    AddBlock(xblockcount, yblockcoun);
}

//����ͼ��
function AddBlock(mx, my) {
    var bb = $(".baseblock");
    for (var y = 0; y < my; y++) {
        for (var x = 0; x < mx; x++) {
            // $("#canvas").append("<div id='block"+x+y+"' class='block' style='margin-left: "+mleft+"px;margin-top:"+mtop+"px'></div>");
            var clonebb = bb.clone();//����ԭͼ�鸱��
            clonebb.attr("id", "block" + x + y);
            clonebb.attr("datax", x);
            clonebb.attr("datay", y);
            clonebb.attr("class", "block");
            clonebb.css("width", blockSize);
            clonebb.css("height", blockSize);
            clonebb.find("#xy").text(x + " " + y);

            objCanvas.append(clonebb);

            SetBlockLocation(x, y, clonebb, 0, 0);
        }
    }
}

//����ͼ��λ��//mx,myΪͼ���ڻ����е�λ�� Ҫ����ɵ�λ�� offsetx offsetyҪ�ƶ��ľ���
function SetBlockLocation(mx, my, block, offsetx, offsety) {

    //��Ҫ���ϵ�ǰƫ�ƺ���ʷƫ��
    var mleft = ( mx * blockSize) + offsetx + canvasoffsetx;
    var mtop = (my * blockSize) + offsety + canvasoffsety;
    block.find("#offset").text(mleft + " " + mtop);//���ƫ��

    //var dx=Math.floor( mleft/400);
    //if(dx>0){
    //    mleft=mleft-400*dx-100;
    //}

    //�����λ�ƻ���ɾ���λ��
    if (mleft > 0) {
        mleft = (mleft + 150) % (5 * blockSize) - 150;
    } else if (mleft < -150) {
        mleft = (mleft + 150) % (5 * blockSize) + 350;
    }
    if (mtop > 0) {
        mtop = (mtop + 150) % (4 * blockSize) - 150;
    } else if (mtop < -150) {
        mtop = (mtop + 150) % (4 * blockSize) + 250;
    }

    block.css("margin-left", mleft);
    block.css("margin-top", mtop);
    block.find("#xyset").text(mleft + " " + mtop);//ʵ��ƫ��
}


//��갴��ʱִ��
function BoardOnMouseDown(e) {
    mouseIsDown = true;
    exMouseDown = e.offsetX;//��ȡ��갴��λ��
    eyMouseDown = e.offsetY;

    objtxtmousedown.val(exMouseDown + " " + eyMouseDown);
}


//���̧��ʱ
function BoardOnMouseUp(e) {
    mouseIsDown = false;
    exMouseUp = e.offsetX;//��ȡ���̧��λ��
    eyMouseUp = e.offsetY;
    canvasoffsetx += exMouseMove;//�����ƶ�λ��
    canvasoffsety += eyMouseMove;
    objtxtmouseup.val(exMouseUp + " " + eyMouseUp);
}


//����ƶ�ʱ
function BoardOnMouseMove(e) {
    if (mouseIsDown) {
        exMouseMove = e.offsetX - exMouseDown;
        eyMouseMove = e.offsetY - eyMouseDown;

        objtxtmousemove.val(exMouseMove + " " + eyMouseMove);

        MoveBlock(exMouseMove, eyMouseMove);
    }
}

//�ƶ�ͼ�� movex movey ͼ����Ҫ�ƶ��ľ���
function MoveBlock(movex, movey) {
    //��������ͼ�� ����ƶ�
    objCanvas.children().each(function () {
        var datax = $(this).attr("datax");
        var datay = $(this).attr("datay");
        SetBlockLocation(datax, datay, $(this), movex, movey);
    });

    //SetBlockLocation(0,0, $("#block00"),movex,movey);
}