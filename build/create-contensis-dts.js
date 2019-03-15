var path = require('path');
var fs = require('fs');

var interfaceDtsDir = path.join(__dirname, '../', 'bundle/es5/models');
var generatedDtsFile = path.join(__dirname, '../', 'bundle/zengenti.contensis-client.d.ts');
var generatedDtsContent = '';

fs
	.readdirSync(interfaceDtsDir)
	.forEach(interfaceDtsFile => {
		if (interfaceDtsFile.toLowerCase() === 'index.d.ts') {
			return;
		}

		var dtsFileContent = fs.readFileSync(path.join(interfaceDtsDir, interfaceDtsFile), 'utf8');

		var lines = dtsFileContent
			.split('\n')
			.filter(line => !line.startsWith('import'))
			.map(line => line.startsWith('export ') ? line.substr(7) : line);
		generatedDtsContent += lines.join('\n') + '\n';
	});

generatedDtsContent += '\ndeclare var Zengenti: ZengentiStatic;';

fs.writeFileSync(generatedDtsFile, generatedDtsContent, 'utf8');
