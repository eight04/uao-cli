#!/usr/bin/env node

var doc = `uao (Unicode at on command line tool)

Usage:
  uao (encode | decode) [--ext <extension>] <files>...
  
Options:
  encode             Encode from utf-8 to big5-uao.
  decode             Decode from big5-uao to utf-8.
  --ext <extension>  Instead of replacing the original file, create a new file with new extension.
  <files>            File path. Support glob pattern.`,

	docopt = require("docopt"),
	uao = require("uao-js"),
	glob = require("glob"),
	path = require("path"),
	fs = require("fs"),
	
	args = docopt.docopt(doc),
	i;
	
for (i = 0; i < args["<files>"].length; i++) {
	var file = args["<files>"][i];
	accessP(file).then(function(file){
		if (args["encode"]) {
			encode(file, args["--ext"]);
		} else {
			decode(file, args["--ext"]);
		}
	}, function(file) {
		glob(file, function(err, files){
			if (err) {
				throw err;
			}
			var i;
			for (i = 0; i < files.length; i++) {
				if (args["encode"]) {
					encode(files[i], args["--ext"]);
				} else {
					decode(files[i], args["--ext"]);
				}
			}
		});
	});
}

function accessP(file) {
	return new Promise(function(resolve, reject){
		fs.access(file, function(err) {
			if (err) {
				reject(file);
			} else {
				resolve(file);
			}
		});
	});
}

function encode(file, ext) {
	fs.readFile(file, "utf-8", function(err, data) {
		if (err) {
			throw err;
		}
		uao.encode(data).then(data => {
			if (ext) {
				file = path.parse(file);
				file.base = file.name + ext;
				file = path.format(file);
			}
			fs.writeFile(file, data, "binary");
		});
	});
}

function decode(file, ext) {
	fs.readFile(file, "binary", function(err, data){
		if (err) {
			throw err;
		}
		uao.decode(data).then(data => {
			if (ext) {
				file = path.parse(file);
				file.base = file.name + ext;
				file = path.format(file);
			}
			fs.writeFile(file, data, "utf-8");
		});
	});
}
