
var collections = {
};

exports.get = function(colName){
  return {
    name: colName,
    params: collections[colName]
  };
};
