

var libxmljs = require('libxmljs');
var fs = require('fs');
var ut = require('./parse_comm');
var assert = require('assert');

var data = fs.readFileSync('designs/xmls/kamiConf.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots
	var heroes = xmlDoc.get('//kamiConf');
	var kids = heroes.childNodes();
	ut.print('-- This file is generated automatically')
	ut.print('-- Do not modify this file manually')
	ut.print('GhostProperties = ReadOnly{');
	for(var i=0;i<kids.length;++i) {
		if(kids[i].name() === 'kami') {
			var id = kids[i].attr('kamiID');
			assert(id != null, 'must be there');
			var msg = '[\'' + id.value() + '\']' + ' = ReadOnly{';
			ut.print(msg, 1);
			ut.traverseAttribs(kids[i], 2);

			ut.print('Attribs = ReadOnly{ ',2);
			do{
				var attribs = kids[i].get('territoryAttributes').childNodes('kami');
				for(var i=0;i<attribs.length;++i){
					if('territoryAttribute' === attribs[i].name()){
						var name = attribs[i].attr('ID').value();
						var percent = attribs[i].attr('percent').value();
						// console.log(name);
						// console.log(percent);
						assert( typeof(name) === 'string' && typeof(percent) === 'string',
							'must be there for me');
						//as u know, this msg is the msg above(all the same, var is useless in this case)
						var msg = name + ' = ' + percent + ', ';
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








