const program = require('commander');
const packageJson = require('../package.json');
const addActionFactory = require('./add');

program.version(packageJson.version);
// program.option('-s, --scope', 'work on certain module');

addActionFactory(program);

program.parse(process.argv);
