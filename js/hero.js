

var libxmljs = require('libxmljs');
var fs = require('fs');
var ut = require('./parse_comm');
var assert = require('assert');

var data = fs.readFileSync('designs/xmls/heroConf.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots
	var heroes = xmlDoc.get('//heroConf');
	var kids = heroes.childNodes();
	ut.print('-- This file is generated automatically')
	ut.print('-- Do not modify this file manually')
	ut.print('HeroProperties = ReadOnly{');
	for(var i=0;i<kids.length;++i){
		if(kids[i].name() != 'text') {
			var id = kids[i].attr('heroID');
			assert(id != null, 'must be there');
			var msg = '[\'' + id.value() + '\']' + ' = ReadOnly{';
			ut.print(msg, 1);
			ut.traverseAttribs(kids[i], 2);
			ut.print('},  ', 1);
			ut.print();
		}
	}
	ut.print('}');
}

//Starting here.
main();








