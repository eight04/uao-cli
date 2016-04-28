UAO-cli
=======

An UAO encoder/decoder CLI tool.

Features
--------

* Convert file encoding from utf-8 to big5-uao or vise versa.

Install
-------

	npm install -g uao-cli
	
Usage
-----

	uao (Unicode at on command line tool)

	Usage:
	  uao (encode | decode) [--ext <extension>] <files>...
	  
	Options:
	  encode             Encode from utf-8 to big5-uao.
	  decode             Decode from big5-uao to utf-8.
	  --ext <extension>  Instead of replacing the original file, create a new file with new extension.
	  <files>            File path. Support glob pattern.
	
For example:

	uao decode *.txt
	
Changelog
---------

* 0.1.0 (Apr 28, 2016)

    - First release.
