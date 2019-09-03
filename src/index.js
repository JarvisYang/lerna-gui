const program = require('commander');
const packageJson = require('../package.json');
const addActionFactory = require('./add');

program.version(packageJson.version);

addActionFactory(program);

program.parse(process.argv);
