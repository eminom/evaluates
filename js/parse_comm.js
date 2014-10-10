
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


function printKeyValue(key, value, depth) {
	key = key.replace(/\b\w+\b/g, function(word){
		return word.substring(0,1).toUpperCase() + word.substring(1);}
	);
	if(isNumber(value)){
		print(key + ' = '   + value + ',' ,  depth);
	} else {
		print(key + ' = \'' + value + '\'' + ',' , depth);
	}
}

// Write all properties in elements into Lua table
//
function traverseNode(node, depth, handler){
	handler = handler || printKeyValue;
	var nodes = node.childNodes();
	var length = nodes.length;
	for(var i=0;i<length;++i){
		if(nodes[i].name() == 'text'){
			continue;
		}
		handler(nodes[i].name(), nodes[i].text(), depth);
	}
}


// Output all the attributes in Lua table
// Iterates the attributes' array
function traverseAttribs(node, depth, handler){
	handler = handler || printKeyValue;
	var attrs = node.attrs();
	var length = attrs.length;
	for(var i=0;i<length;++i){
		handler(attrs[i].name(), attrs[i].value(), depth);
	}
}

module.exports = {
	print:print,
	getField:getField,
	isNumber:isNumber,
	traverseNode:traverseNode,
	traverseAttribs:traverseAttribs,
};