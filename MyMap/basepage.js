/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();

});

var blockSize = 250;//ͼ���С
var xblockcount = 6, yblockcount = 5;//ͼ������С
var objShowboard, objCanvas, objBackground, objtxtmousedown, objtxtmouseup, objtxtmousemove;//���ö���
var exMouseMove, eyMouseMove;
var exMouseUp, eyMouseUp;
var exMouseDown, eyMouseDown;//��갴���ǵ�λ��
var mouseIsDown = false;//����Ƿ���
var canvasoffsetx = 0, canvasoffsety = 0;//���嵱ǰ�ƶ�λ��
var nowzoom = 4;//��ǰ���ż���

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

//ͼƬ�ļ���·��
var picpath = new Array(
    "P:/TEMP/googlepic/"
);
http://mt1.google.cn/vt?pb=!1m4!1m3!1i6!2i50!3i24!2m3!1e0!2sm!3i323238179!3m9!2szh-Hans-CN!3sCN!5e78!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0
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


        AddBlock(xblockcount, yblockcount);
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

//����ͼ��λ��//mx,myΪͼ���ڻ����е�λ�� Ҫ����ɵ�λ�� offsetx offsetyҪ�ƶ��ľ���
function SetBlockLocation(mx, my, block, offsetx, offsety) {

    //��Ҫ���ϵ�ǰƫ�ƺ���ʷƫ��
    var mleft = ( mx * blockSize) + offsetx + canvasoffsetx;
    var mtop = (my * blockSize) + offsety + canvasoffsety;
    block.find("#offset").text(mleft + " " + mtop);//���ƫ��

//����ͼ���λ�ñ���
    var oldxMultiple = block.attr("xmultiple");
    var oldyMultiple = block.attr("ymultiple");

    var borderxy = blockSize + blockSize / 2;//�ƶ��ı߿��С��Ϊ���С��һ�� ���������ʱ �ų�����齻��

    var xMultiple = Math.floor((mleft + borderxy) / (xblockcount * blockSize));
    var yMultiple = Math.floor((mtop + borderxy) / (yblockcount * blockSize));
    block.attr("xmultiple", xMultiple);
    block.attr("ymultiple", yMultiple);
    block.find("#xyM").text(xMultiple + " " + yMultiple);

    //�����λ�ƻ���ɾ���λ��
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
    block.find("#xyset").text(mleft + " " + mtop);//ʵ��ƫ��


    if (oldxMultiple != xMultiple
        || oldyMultiple != yMultiple) {
        //���������ԭ����ͬ ˵��ͼ����Ҫ��ת
        OnBolckChangeMultiple(block);
    }

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


function GetZoom(zoomlevel) {
    return zoom[zoomlevel - 4];
}

//��ͼ�鱶�������仯ʱ
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
//�Ŵ�
function SetZoomAdd() {
    if (nowzoom < 10) {
        nowzoom++;
        ClearBlock();
        ReDraw();
    }
}
//��С
function SetZoomMinus() {
    if (nowzoom > 4) {
        nowzoom--;
        ClearBlock();
        ReDraw();
    }
}