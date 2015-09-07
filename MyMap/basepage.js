/**
 * Created by nn on 2015/9/6.
 */
$(function(){
    AddBlock(8,6);
});




//创建整个画板的图片块
function AddBlock(mx,my){
    var bb=$(".baseblock");
    for(var y=0;y<my;y++)
    {

        for(var x=0;x<mx;x++)
        {

           // $("#canvas").append("<div id='block"+x+y+"' class='block' style='margin-left: "+mleft+"px;margin-top:"+mtop+"px'></div>");
           var clonebb=bb.clone();
            clonebb.attr("id","block"+x+y);
            clonebb.attr("class","block");
            $("#canvas").append( clonebb);

            SetBlockLocation(x,y,clonebb);
        }
    }
}

//设置图块位置
//mx,my设置为第几行第几块 block 要设的图块
function SetBlockLocation(mx,my,block){
    var mleft=mx*128;
    var mtop=my*128;

    block.css("margin-left",mleft);
    block.css("margin-top",mtop);
}


//画板上按下鼠标
function CanvasOnMouseDown()
{

}

//画板上抬起鼠标
function CanvasOnMouseUp()
{

}

//画板上移动鼠标
function CanvasOnMouseMove()
{

}

//移动图片块
function MoveBlock()
{

}