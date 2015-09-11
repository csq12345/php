/**
 * Created by nn on 2015/9/6.
 */
$(function () {

    Initital();
    AddBlock(8, 6);
});

var objShowboard, objCanvas,objBackground, objtxtmousedown, objtxtmouseup;//���ö���

//��ʼ��
function Initital() {
    objCanvas =$("#canvas");
    objBackground =$("#background");
    objShowboard =$("#ShowBoard");
    objShowboard.mousedown(BoardOnMouseDown);
    objShowboard.mouseup(BoardOnMouseUp);



    objtxtmousedown = $("#txtmousedown");
    objtxtmouseup = $("#txtmouseup");
}

//����ͼ��
function AddBlock(mx, my) {
    var bb = $(".baseblock");
    for (var y = 0; y < my; y++) {

        for (var x = 0; x < mx; x++) {

            // $("#canvas").append("<div id='block"+x+y+"' class='block' style='margin-left: "+mleft+"px;margin-top:"+mtop+"px'></div>");
            var clonebb = bb.clone();//����ԭͼ�鸱��
            clonebb.attr("id", "block" + x + y);
            clonebb.attr("class", "block");
            objCanvas.append(clonebb);

            SetBlockLocation(x, y, clonebb);
        }
    }
}

//����ͼ��λ��//mx,myΪͼ���ڻ����е�λ�� Ҫ����ɵ�λ��
function SetBlockLocation(mx, my, block) {
    var mleft = mx * 128;
    var mtop = my * 128;

    block.css("margin-left", mleft);
    block.css("margin-top", mtop);
}


var exMouseDown, eyMouseDown;//��갴���ǵ�λ��
var mouseIsDown = false;//����Ƿ���
//��갴��ʱִ��
function BoardOnMouseDown(e) {
    exMouseDown = e.offsetX;//��ȡ��갴��λ��
    eyMouseDown = e.offsetY;

    objtxtmousedown.val(exMouseDown + " " + eyMouseDown);
}


var exMouseUp, eyMouseUp;
//���̧��ʱ
function BoardOnMouseUp(e) {
    exMouseUp = e.offsetX;//��ȡ���̧��λ��
    eyMouseUp = e.offsetY;

    objtxtmouseup.val(exMouseUp + " " + eyMouseUp);
}

//����ƶ�ʱ
function BoardOnMouseMove() {

}

//�ƶ�ͼ��
function MoveBlock() {

}