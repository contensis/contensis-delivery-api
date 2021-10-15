var path = require('path');
var fs = require('fs');

var processInterfaceDtsDirFn = (interfaceDtsDir, interfaceDtsFile) => {
	if (interfaceDtsFile.toLowerCase() === 'index.d.ts' || !interfaceDtsFile.includes('.')) {
		return '';
	}

	var dtsFileContent = fs.readFileSync(path.join(interfaceDtsDir, interfaceDtsFile), 'utf8');
	var lines = dtsFileContent
		.split('\n')
		.filter(line => !line.startsWith('import'))
		.map(line => line.startsWith('export ') ? line.substr(7) : line);
	var processedDtsFileContent = lines.join('\n') + '\n';
	return processedDtsFileContent;
};

var interfaceDtsCoreDirs = [
	path.join(__dirname, '../', 'node_modules/contensis-core-api/bundle-es5/models/search'),
	path.join(__dirname, '../', 'node_modules/contensis-core-api/bundle-es5/models')];

var interfaceDtsDeliveryDir = path.join(__dirname, '../', 'bundle/es5/models');
var generatedDtsFile = path.join(__dirname, '../', 'bundle/zengenti.contensis-client.d.ts');
var generatedDtsContent = '';

interfaceDtsCoreDirs.forEach(interfaceDtsCoreDir => {
	fs
		.readdirSync(interfaceDtsCoreDir)
		.forEach(interfaceDtsFile => {
			generatedDtsContent += processInterfaceDtsDirFn(interfaceDtsCoreDir, interfaceDtsFile, generatedDtsContent)
		});

});

fs
	.readdirSync(interfaceDtsDeliveryDir)
	.forEach(interfaceDtsFile => {
		generatedDtsContent += processInterfaceDtsDirFn(interfaceDtsDeliveryDir, interfaceDtsFile, generatedDtsContent)
	});

generatedDtsContent += '\ndeclare var Zengenti: ZengentiStatic;';

fs.writeFileSync(generatedDtsFile, generatedDtsContent, 'utf8');
