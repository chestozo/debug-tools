var Preformatter = function() {
    this.hash = {}; // Objects hash
    this.result = {};
    this.link_prefix = '$$link ';
};

Preformatter.prototype.format = function(obj) {
    this.process(obj, this.result, [ '.' ]);
    return this.result;
};

/**
 * Replaces all cyclic links to their string links.
 * @param {Object} donor Object to get properties of.
 * @param {Object} reciever Object to place result properties.
 * @param {Array.<string>} path Current path to property.
 */
Preformatter.prototype.process = function(donor, receiver, path) {
    var val;
    var link;

    // Save current object in cache.
    this.cache(donor, path);

    for (var prop in donor) {
        val = donor[prop];
        if (typeof val === 'object') {
            // Objects are checked for cyclic links.
            link = this.getLinkObject(val);
            if (link) {
                // Place a link.
                receiver[prop] = link;
            } else {
                path.push(prop);
                this.process(val, (receiver[prop] = {}), path);
                path.pop();
            }
        } else {
            // Value types are added as is.
            receiver[prop] = val;
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
    this.hash[path.join('.')] = obj;
};

Preformatter.prototype.cloneArray = function(ar) {
    return JSON.parse(JSON.stringify(ar));
};