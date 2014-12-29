

var libxmljs = require('libxmljs');
var fs = require('fs');
var ut = require('./parse_comm');
var assert = require('assert');

var data = fs.readFileSync('designs/xmls/battleConf.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots
	var heroes = xmlDoc.get('//battleConf');
	var kids = heroes.childNodes();
	ut.print('-- This file is generated automatically')
	ut.print('-- Do not modify this file manually')
	ut.print('BattleProperties = ReadOnly{');
	for(var i=0;i<kids.length;++i) {
		if(kids[i].name() === 'battle') {
			var id = kids[i].attr('stage');   // Key
			assert(id != null, 'must be there');
			var msg = '[\'' + id.value() + '\']' + ' = ReadOnly{';
			ut.print(msg, 1);
			ut.traverseAttribs(kids[i], 2);

			// And this field means to be an array.
			ut.print('DropPreviews = ReadOnly{ ',2);
			do{
				var attribs = kids[i].get('dropPreviews').childNodes('dropPreview');
				for(var h=0;h<attribs.length;++h){
					if('dropPreview' === attribs[h].name()){
						var key = attribs[h].attr('key').value();
						assert( typeof(key) === 'string', 'must be there for me');
						//as u know, this msg is the msg above(all the same, var is useless in this case)
						var msg = key + ', ';    //Array.
						ut.print(msg, 4);
					}
				}
			}while(false);
			ut.print('}',2);
			ut.print('},  ', 1);
			ut.print();
		}
	}
	ut.print('}');
}

//Starting here.
main();








