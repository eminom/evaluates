
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
	throw new Error('no field of ' + name);
}

function isNumber(a){
	return !Number.isNaN(parseFloat(a));
}


// Write all properties in elements into Lua table
//
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
			print(nodes[i].name() + ' = \'' + nodes[i].text() + '\'' + ',' , depth);
		}
	}
}


// Output all the attributes in Lua table
// Iterates the attributes' array
function traverseAttribs(node, depth){
	var attrs = node.attrs();
	var length = attrs.length;
	for(var i=0;i<length;++i){
		if(isNumber(attrs[i].value())){
			print(attrs[i].name() + ' = ' + attrs[i].value() + ',', depth);
		} else {
			print(attrs[i].name() + ' = \'' + attrs[i].value() + '\'' + ',', depth);
		}
	}
}

module.exports = {
	print:print,
	getField:getField,
	isNumber:isNumber,
	traverseNode:traverseNode,
	traverseAttribs:traverseAttribs,
};