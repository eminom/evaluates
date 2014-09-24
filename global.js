

var libxmljs = require('libxmljs');
var fs = require('fs');
var ut = require('./parse_comm');
var assert = require('assert');

var data = fs.readFileSync('designs/xmls/global.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots
	var global = xmlDoc.get('//global');
	var kids = global.childNodes();
	ut.print('-- This file is generated automatically')
	ut.print('-- Do not modify this file manually')
	ut.print('GlobalDictionary = ReadOnly{');
	ut.traverseNode(global, 2);
	ut.print('}');
}

//Starting here.
main();








