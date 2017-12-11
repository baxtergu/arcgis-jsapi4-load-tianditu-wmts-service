define([
    "esri/layers/support/TileInfo"
],function(
    TileInfo
){
    // WGS84（WKID:4326）坐标系DPI
  var dpi = 96;
  // 米 -> 度（地球球面） 转换系数
  var meterToRadiusRatio = 111194.872221777;
  // 英尺 -> 米 转换系数
  var inchToMeterRatio = 0.0254000508;

  //天地图底图缩放等级，从WMTS服务中获取
  var zoomLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  //天地图底图Scale Denominator，从WMTS服务中获取
  var scaleDenominators = [
    295829355.454566,
    147914677.727283,
    73957338.863641,
    36978669.431821,
    18489334.71591,
    9244667.357955,
    4622333.678978,
    2311166.839489,
    1155583.419744,
    577791.709872,
    288895.854936,
    144447.927468,
    72223.963734,
    36111.981867,
    18055.990934,
    9027.995467,
    4513.997733,
    2256.998867,
    1128.499433
  ];

  // 通过Scale Denominator计算分辨率
  function calcResolution(scaleDenominator) {
    return scaleDenominator * inchToMeterRatio / (dpi * meterToRadiusRatio);
  }

  // 用于存储不同缩放等级下的切片信息的LOD数组对象
  var lodsArray = [];

  zoomLevels.map(function(zoomLevel, idx) {
    var scaleDenominator = scaleDenominators[idx];
    lodsArray.push({
      level: zoomLevel,
      resolution: calcResolution(scaleDenominators[idx]),
      scale: scaleDenominators[idx]
    });
  });

  var tileInfo = new TileInfo({
    "rows": 256,
    "cols": 256,
    "compressionQuality": 0,
    "origin": {
        "x": -180,
        "y": 90
    },
    "spatialReference": {
        "wkid": 4326
    },
    "lods":lodsArray
  });

  return tileInfo;
})