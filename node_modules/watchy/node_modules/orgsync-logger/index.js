var _ = require('underscore');
var chalk = require('chalk');
var fs = require('fs');
var os = require('os');
var path = require('path');

exports.config = {
  colors: true,
  metrics: true,
  name: os.hostname()
};

var streams = {};
var sync = false;
var closed = false;

var LEVELS = ['error', 'warn', 'success', 'info', 'debug'];

var COLORS = {
  debug: chalk.grey,
  error: chalk.red,
  success: chalk.green,
  warn: chalk.yellow
};

var getStream = function (target) {
  return streams[target] ||
    (streams[target] = fs.createWriteStream(target, {flags: 'a'}));
};

var write = function (type, str) {
  str += '\n';
  var dir = exports.config.dir;
  if (!dir) return process[type === 'error' ? 'stderr' : 'stdout'].write(str);
  var target = path.resolve(dir, type + '.log');
  if (sync || closed) return fs.appendFileSync(target, str);
  getStream(target).write(str);
};

var log = function (level, index, msg) {
  var config = exports.config;
  var max = config.level;
  if (max && LEVELS.indexOf(level) > LEVELS.indexOf(max)) return;
  var iso = (new Date()).toISOString();
  var name = ' [' + config.name + '] ';
  msg = iso + name + level.toUpperCase() + ' ' + msg;
  var color = !config.dir && config.colors !== false && COLORS[level];
  write(level, color ? color(msg) : msg);
};

_.each(LEVELS, function (level, index) {
  exports[level] = _.partial(log, level, index);
});

var metric = function (type, name, metric) {
  if (exports.config.metrics === false) return;
  write('metrics', JSON.stringify({
    '@timestamp': (new Date()).toISOString(),
    app_name: exports.config.name,
    tags: [type],
    service: name,
    metric: metric
  }));
};

exports.mark = _.partial(metric, 'mark', _, 1);

exports.gauge = _.partial(metric, 'gauge');

exports.duration = _.partial(metric, 'time');

exports.time = function (cb) {
  var start = Date.now();
  cb(function (name) { metric('time', name, Date.now() - start); });
};

exports.sync = function () { sync = true; };

exports.async = function () { sync = false; };

exports.close = function (cb) {
  if (closed) return cb && cb();
  closed = true;
  var completed = 0;
  var total = Object.keys(streams).length;
  var done = function () { if (++completed === total && cb) cb(); };
  for (var name in streams) streams[name].on('finish', done).end();
};
