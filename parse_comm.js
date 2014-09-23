
function print(msg, depth){
	depth = depth || 0;
	msg = msg || '';
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
	return !Number.isNaN(parseFloat(a));
}

function traverseNode(node, depth){
	var nodes = node.childNodes();
	var length = nodes.length;
	for(var i=0;i<length;++i){
		if(nodes[i].name() == 'text'){
			continue;
		}
		if(isNumber(nodes[i].text())){
			print(nodes[i].name() + ' = ' +  nodes[i].text() + ',' ,  depth);
		} else {
			print(nodes[i].name() + ' = \'' + parseFloat(nodes[i].text()) + '\'' + ',' , depth);
		}
	}
}

module.exports = {
	print:print,
	getField:getField,
	isNumber:isNumber,
	traverseNode:traverseNode
};