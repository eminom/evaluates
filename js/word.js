

var libxmljs = require('libxmljs');
var fs = require('fs');
var ut = require('./parse_comm');

var data = fs.readFileSync('designs/xmls/word.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots

	ut.print('-- This file is generated automatically');
	ut.print('-- Do not modify this file manually');
	ut.print('WordDictionary = ReadOnly { ');
	var heroes = xmlDoc.get('//wordInfo');
	var kids = heroes.childNodes();
	for(var i=0;i<kids.length;++i){
		if(kids[i].name() != 'text') {
			var id = ut.getField(kids[i],'wordId');
			var msg = '[\'' + id + '\']' + ' = {';
			ut.print(msg, 1);
			ut.traverseNode(kids[i], 2);
			ut.print('},  ', 1);
			ut.print();
		}
	}
	ut.print('}');
}

//Starting here.
main();








