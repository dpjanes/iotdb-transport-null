/*
 *  NullTransport.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-08-17
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var iotdb = require('iotdb');
var iotdb_transport = require('iotdb-transport');
var errors = iotdb_transport.errors;
var _ = iotdb._;

var path = require('path');

var util = require('util');
var url = require('url');

var logger = iotdb.logger({
    name: 'iotdb-transport-proto',
    module: 'NullTransport',
});

/* --- constructor --- */

/**
 *  Create a transport for Null.
 */
var NullTransport = function (initd, native) {
    var self = this;

    self.initd = _.defaults(
        initd,
        {
        },
        iotdb.keystore().get("/transports/NullTransport/initd"),
        {
            prefix: ""
        }
    );
    
    self.native = native;
};

NullTransport.prototype = new iotdb_transport.Transport;
NullTransport.prototype._class = "NullTransport";

/* --- methods --- */

/**
 *  See {iotdb_transport.Transport#Transport} for documentation.
 */
NullTransport.prototype.list = function(paramd, callback) {
    var self = this;

    self._validate_list(paramd, callback);

    callback({
        end: true,
    });
};

/**
 *  See {iotdb_transport.Transport#Transport} for documentation.
 */
NullTransport.prototype.added = function(paramd, callback) {
    var self = this;

    self._validate_added(paramd, callback);
};

/**
 *  See {iotdb_transport.Transport#Transport} for documentation.
 */
NullTransport.prototype.get = function(paramd, callback) {
    var self = this;

    self._validate_get(paramd, callback);

    var gd = _.shallowCopy(paramd);
    gd.value = null;

    callback(new errors.NotFound(), gd);
};

/**
 *  See {iotdb_transport.Transport#Transport} for documentation.
 */
NullTransport.prototype.put = function(paramd, callback) {
    var self = this;

    self._validate_update(paramd, callback);

    callback({
        id: paramd.id,
        band: paramd.band,
        error: new errors.NotImplemented(),
    });
};

/**
 *  See {iotdb_transport.Transport#Transport} for documentation.
 */
NullTransport.prototype.updated = function(paramd, callback) {
    var self = this;

    self._validate_updated(paramd, callback);
};

/**
 *  See {iotdb_transport.Transport#Transport} for documentation.
 */
NullTransport.prototype.remove = function(paramd, callback) {
    var self = this;

    self._validate_remove(paramd, callback);

    callback({
        id: paramd.id,
        band: paramd.band,
        error: new errors.NotImplemented(),
    });
};

/* --- internals --- */
/**
 *  API
 */
exports.NullTransport = NullTransport;
