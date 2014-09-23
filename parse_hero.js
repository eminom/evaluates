

var libxmljs = require('libxmljs');
var fs = require('fs');

var data = fs.readFileSync('hero.xml').toString('utf8');
var xmlDoc = libxmljs.parseXml(data);

function print(msg, depth){
	depth = depth || 0;
	for(var i=0;i<depth;++i){
		process.stdout.write('  ');
	}
	process.stdout.write(msg);
	process.stdout.write('\n');
}

function getField(node, name){
	var nodes = node.childNodes(node);
	var length = nodes.length;
	for(var i=0;i<length;++i){
		if(nodes[i].name() == name){
			return nodes[i].text();
		}
	}
	throw 'no field of ' + name;
}

function isNumber(a){
	return 'NaN' != parseFloat(a);
}

function traverseNode(node, depth){
	var nodes = node.childNodes();
	var length = nodes.length;
	for(var i=0;i<length;++i){
		if(nodes[i].name() == 'text'){
			continue;
		}
		if(isNumber(nodes[i].text())){
			print(nodes[i].name() + ' = ' +  nodes[i].text() ,  depth);
		} else {
			print(nodes[i].name() + ' = \'' + parseFloat(nodes[i].text()) + '\'', depth);
		}
	}
}

function main(){
	//OK, this is the roots
	var heroes = xmlDoc.get('//heroInfo');
	var kids = heroes.childNodes();
	for(var i=0;i<kids.length;++i){
		if(kids[i].name() != 'text') {
			var id = getField(kids[i],'heroId');
			var msg = id + ' = {';
			print(msg, 1);
			traverseNode(kids[i], 2);
			print('},  ', 1);
		}
	}
}

//Starting here.
main();








