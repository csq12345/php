/**
 * Created by chensq on 2015/10/9.
 */
//TMS��ͼ���㹫ʽ

//��Ƭλ��ת���� x ΪͼƬλ�����ȫͼ��С�İٷ���
function BlockToLongitude(x, zoom) {
    var re = x / Math.pow(2.0, zoom) * 360.0 - 180;
    return re;
}
//��Ƭλ��תγ�� y ΪͼƬλ�����ȫͼ��С�İٷ���
function BlockToLatitude(y, zoom) {
    var n = Math.PI - (2.0 * Math.PI * y) / Math.pow(2.0, zoom);
    var re = Math.atan(Math.sinh(n)) / Math.PI * 180;
    return re;
}

//����ת��Ƭλ������
function LongitudeToBlock(x, zoom) {
    var blockpx = (double)((x + 180.0) / 360.0 * Math.Pow(2.0, zoom));
    return blockpx;
}
//γ��ת��Ƭλ������
function LatitudeToBlock(y, zoom) {

    var blockpy = (double)((1.0 - Math.Log(Math.Tan(y * Math.PI / 180.0) +
        1.0 / Math.Cos(y * Math.PI / 180.0)) / Math.PI) / 2.0 * Math.Pow(2.0, zoom));
    return blockpy;
}
