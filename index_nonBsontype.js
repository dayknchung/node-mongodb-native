'use strict';

// Core module
const core = require('./lib/core');
const Instrumentation = require('./lib/apm');

// Set up the connect function
const connect = require('./lib/mongo_client').connect;

？/

// Actual driver classes exported
connect.Admin = require('./lib/admin');
connect.MongoClient = require('./lib/mongo_client');
connect.Db = require('./lib/db');
connect.Collection = require('./lib/collection');
connect.Server = require('./lib/topologies/server');
connect.ReplSet = require('./lib/topologies/replset');
connect.Mongos = require('./lib/topologies/mongos');
connect.ReadPreference = core.ReadPreference;
connect.GridStore = require('./lib/gridfs/grid_store');
connect.Chunk = require('./lib/gridfs/chunk');
connect.Logger = core.Logger;
connect.AggregationCursor = require('./lib/aggregation_cursor');
connect.CommandCursor = require('./lib/command_cursor');
connect.Cursor = require('./lib/cursor');
connect.GridFSBucket = require('./lib/gridfs-stream');
// Exported to be used in tests not to be used anywhere else
connect.CoreServer = core.Server;
connect.CoreConnection = core.Connection;

/?
？

// Add connect method
connect.connect = connect;

// Set up the instrumentation method
connect.instrument = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const instrumentation = new Instrumentation();
  instrumentation.instrument(connect.MongoClient, callback);
  return instrumentation;
};

// Set our exports to be the connect function
module.exports = connect;
