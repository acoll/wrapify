var through = require('through2');
var path = require('path');

module.exports = function (file, config) {

	var prefixes = [];
	var suffixes = [];

	// fix filename to be relative to module
	file = file.replace(path.parse(path.resolve('.')).dir + path.sep, '').replace(/\\/g, '/');

	config.wrappers.forEach(wrapper => {
		if(file.match(wrapper.pattern)) {
			if(wrapper.prefix)
				prefixes.push(wrapper.prefix.replace(/\$filename/g, file) + '\n');
			if(wrapper.suffix)
				suffixes.push('\n' + wrapper.suffix.replace(/\$filename/g, file));
		}
	});

	function transform (buf, enc, next) {
		if(prefixes.length) {
			this.push(prefixes.join('\n'));
			prefixes = [];
		}
		this.push(buf);
		next();
	}

	function flush (next) {
		if(suffixes.length) this.push(suffixes.join('\n'));
		next();
	}

	return through(transform, flush);

};
