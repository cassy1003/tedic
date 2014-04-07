var mongoose = require('mongoose'),
    $ = require('jquery-deferred'),
    collections = require('./collections');

var _DB = {};

exports.connectMongoDB = function(dbName) {
  return mongoose.connect("mongodb://localhost/" + dbName, function(err) {
    if (err) {
      return console.log(err);
    } else {
      return console.log('connection success!');
    }
  });
};

exports.connect = function(colName) {
  if (_DB[colName] != null) {
    return;
  }
  var col = collections.get(colName);
  var DatabaseSchema = new mongoose.Schema(col.params);
  var Database = mongoose.model(col.name, DatabaseSchema);
  return _DB[col.name] = Database;
};

exports.find = function(col, query, field, option) {
  if (query == null) {
    query = {};
  }
  if (field == null) {
    field = {};
  }
  if (option == null) {
    option = {};
  }
  return $.Deferred(function(d) {
    var db;
    if (_DB[col] != null) {
      db = _DB[col];
      return db.find(query, field, option, function(err, docs) {
        if (!err) {
          return d.resolve(docs);
        } else {
          console.log("error function of find");
          return d.reject();
        }
      });
    } else {
      return d.reject();
    }
  });
};

exports.save = function(col, params) {
  var db, k;
  return $.Deferred(function(d) {
    if (_DB[col] != null) {
      db = new _DB[col];
      for (k in params) {
        db[k] = params[k];
      }
      db.save(function(err) {
        if (err) {
          console.log(err);
          return d.reject();
        } else {
          return d.resolve();
        }
      });
    } else {
      return d.reject();
    }
  });
}

exports.remove = function(col, query) {
  if (_DB[col] != null) {
    var db = new _DB[col];
    return db.remove(query, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }
}

exports.update = function(col, params) {
  return $.Deferred(function(d) {
    if (_DB[col] != null) {
      var db = new _DB[col];
      var query = params.query || {};
      var update = params.update || {};
      var upsert = params.upsert || false;
      var multi = params.multi || true;
      return db.update(query,
        update,
        {upsert: upsert, multi: multi},
        function(err, numberAffected, raw) {
          if (err) {
            return d.reject();
          } else {
            return d.resolve();
          }
        }
      );
    } else {
      return d.reject();
    }
  });
}

exports.disconnect = function() {
  return mongoose.disconnect();
}
