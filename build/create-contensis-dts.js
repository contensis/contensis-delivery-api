var path = require('path');
var fs = require('fs');

var interfaceDts = path.join(__dirname, '../', 'bundle/es5/interfaces.d.ts');
var generatedDts = path.join(__dirname, '../', 'bundle/zengenti.contensis-client.d.ts');

var dtsContent = fs.readFileSync(interfaceDts, 'utf8');

var lines = dtsContent
	.split('\n')
	.map((line) => line.startsWith('export ') ? line.substr(7) : line);

dtsContent = lines.join('\n');

dtsContent += '\n\ndeclare var Zengenti: ZengentiStatic;';

fs.writeFileSync(generatedDts, dtsContent, 'utf8');

