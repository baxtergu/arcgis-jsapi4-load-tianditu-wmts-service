define(function() {
  var urlTemplatesObject = {
    TDT: "http://{subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles"
  };
  return urlTemplatesObject;
});