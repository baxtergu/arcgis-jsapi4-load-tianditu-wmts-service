require([
  "esri/Map",
  "esri/config",
  "esri/views/MapView",
  "esri/geometry/Extent",
  "esri/geometry/SpatialReference",
  "esri/layers/WebTileLayer",
  "js/TdtTileInfo.js",
  "js/TdtTileInfoNoEncrypt.js",
  "js/TdtUrlTemplates.js",
  "esri/widgets/LayerList",
  "dojo/domReady!"
], function(
  Map,
  esriConfig,
  MapView,
  Extent,
  SpatialReference,
  WebTileLayer,
  TdtTileInfo,
  TdtTileInfoNoEncrypt,
  TdtUrlTemplates,
  LayerList
) {
  /* 简要使用说明：
   *   本例中的TdtTileInfoNoEncrypt中包含了网络上搜集的脱密切片加载参数，但是有一定的偏差，如若
   * 项目对地图需求的精度不高的话可以直接使用，加载后图层上的经纬度与其在真实世界（GPS测量得到的
   * 经纬度）的经纬度会有一定的偏差。
   *   如果项目对精度要求较高，则可以使用TdtTileInfo中使用WMTS中暴露出来的参数计算出来的图层切片
   * 加载参数“TileInfo”,通过这种方式加载的图层偏移量较大。当加载点数据时，需要配合使用实际项目
   * 外部提供的天地图脱密接口将需要添加的经纬度转换来将坐标转换为加密后的坐标以与底图进行匹配，
   * 如若有需求将WGS84或其他坐标系的面类数据与底图进行叠放时，需要天地图的地图提供者提供转换服务。
   */
  var tileInfo = TdtTileInfoNoEncrypt;
  var spatialReference = new SpatialReference({ wkid: 4326 });
  var fullextent = new Extent({
    xmax: 148.028515625,
    xmin: 63.74140625000001,
    ymax: 55.25888671875,
    ymin: 15.795996093749999,
    spatialReference: spatialReference
  });

  var map = new Map({});
  var view = new MapView({
    map: map,
    container: "map",
    center: [118.78, 32.04],
    zoom: 10
  });

  view.then(function() {
    var layerList = new LayerList({
      view: view
    });
    view.ui.add(layerList, "bottom-left");
  });

  //检测经纬度是否有严重偏移
  view.on("click", function(event) {
    console.log(event);
  });

  /* 
   * 天地图的官方提供的地图服务在服务端支持跨域访问，所以只需要将天地图服务
   * 用到的Domains添加至corsEnabledServers, 如遇某些天地图的地图服务是由
   * 项目提供且地图服务不支持跨域访问的，需要使用官方提供的proxy解决方案或者
   * 按照 http://{proxyDomain}/{proxyPage.jsp|html|asp}?{realUrlwithProtocal} 
   * 规则使用的代理，详情：https://github.com/Esri/resource-proxy
   */
  esriConfig.request.corsEnabledServers.push("t0.tianditu.com");
  esriConfig.request.corsEnabledServers.push("t1.tianditu.com");
  esriConfig.request.corsEnabledServers.push("t2.tianditu.com");
  esriConfig.request.corsEnabledServers.push("t3.tianditu.com");
  esriConfig.request.corsEnabledServers.push("t4.tianditu.com");

  var TDT_Layer = new WebTileLayer({
    id: "TiandituBase",
    title: "Tianditu BaseLayer",
    tileInfo: tileInfo,
    spatialReference: spatialReference,
    urlTemplate: TdtUrlTemplates.TDT,
    subDomains: ["t0", "t1", "t2", "t3", "t4"]
  });

  map.addMany([TDT_Layer]);
});

//
