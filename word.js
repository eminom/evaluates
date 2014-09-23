

var libxmljs = require('libxmljs');
var fs = require('fs');
var u = require('./parse_comm');

var data = fs.readFileSync('word.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots
	var heroes = xmlDoc.get('//wordInfo');
	var kids = heroes.childNodes();
	for(var i=0;i<kids.length;++i){
		if(kids[i].name() != 'text') {
			var id = u.getField(kids[i],'wordId');
			var msg = '[\'' + id + '\']' + ' = {';
			u.print(msg, 1);
			u.traverseNode(kids[i], 2);
			u.print('},  ', 1);
		}
	}
}

//Starting here.
main();








