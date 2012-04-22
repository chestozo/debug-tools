var Preformatter = function() {
    this.hash = {}; // Objects hash
    this.result = {};
    this.link_prefix = '$$link ';
};

Preformatter.prototype.format = function(obj) {
    this.processObject(obj, this.result, [ '.' ]);
    return this.result;
};

/**
 * Replaces all cyclic links to their string links.
 * @param {Object} donor Object to get properties of.
 * @param {Object} reciever Object to place result properties.
 * @param {Array.<string>} path Current path to property.
 */
Preformatter.prototype.processObject = function(donor, receiver, path) {
    var val;
    var link;

    // Save current object in cache.
    this.cache(donor, path);

    for (var prop in donor) {
        if (!donor.hasOwnProperty(prop)) {
            continue;
        }

        val = donor[prop];

        if (typeof val === 'function') {
            continue;
        }

        if (typeof val === 'object') {
            // Objects are checked for cyclic links.
            link = this.getLinkObject(val);
            if (link) {
                // Place a link.
                receiver[prop] = link;
            } else {
                path.push(prop);
                if (Array.isArray(val)) {
                    this.processArray(val, (receiver[prop] = []), path);
                }
                else {
                    this.processObject(val, (receiver[prop] = {}), path);
                }

                path.pop();
            }
        } else {
            // Value types are added as is.
            receiver[prop] = val;
        }
    }
};

/**
 * Replaces all cyclic links to their string links.
 * @param {Array} donor Array to get items of.
 * @param {Array} reciever Array to place result items.
 * @param {Array.<string>} path Current path to property.
 */
Preformatter.prototype.processArray = function(donor, receiver, path) {
    var val;
    var link;
    var last;

    // Save current object in cache.
    this.cache(donor, path);

    for (var i = 0; i < donor.length; i++) {
        val = donor[i];

        if (typeof val === 'function') {
            continue;
        }

        if (typeof val === 'object') {
            // Objects are checked for cyclic links.
            link = this.getLinkObject(val);
            if (link) {
                // Place a link.
                receiver[i] = link;
            } else {
                last = path.pop();
                path.push(last + '[' + i + ']'); // User item index as a key
                if (Array.isArray(val)) {
                    this.processArray(val, (receiver[i] = []), path);
                }
                else {
                    this.processObject(val, (receiver[i] = {}), path);
                }
                path.pop();
                path.push(last);
            }
        } else {
            // Value types are added as is.
            receiver[i] = val;
        }
    }
};

Preformatter.prototype.getLinkObject = function(obj) {
    var ref;
    for (var key in this.hash) {
        ref = this.hash[key];
        if (obj === ref) {
            // Found already cached object.
            return this.link_prefix + key;
        }
    }

    return null;
};

Preformatter.prototype.cache = function(obj, path) {
    var key = path.join('.');
    if (key.length > 1) {
        key = key.substring(1);
    }
    this.hash[key] = obj;
};

Preformatter.prototype.cloneArray = function(ar) {
    return JSON.parse(JSON.stringify(ar));
};