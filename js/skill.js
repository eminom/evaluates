

var libxmljs = require('libxmljs');
var fs = require('fs');
var ut = require('./parse_comm');
var assert = require('assert');

var data = fs.readFileSync('designs/xmls/skillConf.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function main(){
	//OK, this is the roots
	var heroes = xmlDoc.get('//skillConf');
	var kids = heroes.childNodes();
	ut.print('-- This file is generated automatically')
	ut.print('-- Do not modify this file manually')
	ut.print('SkillProperties = ReadOnly{');

	for(var i=0;i<kids.length;++i){
		if(kids[i].name() == 'skill') {
			var id = kids[i].attr('skillID');
			assert(id != null, 'must be there');
			var msg = '[\'' + id.value() + '\']' + ' = ReadOnly{';
			ut.print(msg, 1);
			ut.traverseAttribs(kids[i], 2);

			//internal
			var triggerIndex = 0;
			var triggers = kids[i].get('triggers').childNodes();
			for(var j=0;j<triggers.length;++j){
				if(triggers[j].name() == 'trigger'){
					++triggerIndex;
					var trMsg = 'Trigger' + triggerIndex + ' = ReadOnly{';
					ut.print(trMsg, 2);
					ut.traverseAttribs(triggers[j], 3);
					ut.print('},  ', 2);
				}
			}
			//end of internal

			ut.print('},  ', 1);
			ut.print();
		}
	}
	ut.print('}');
}

//Starting here.
main();








