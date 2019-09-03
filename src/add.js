const path = require('path');
const {spawn} = require('child_process');

const lernaAdd = (module, scope) => {
  const args = [
    'add',
    module,
  ];
  if (scope) {
    args.push(`--scope=${scope}`);
  }
  return new Promise((resolve, reject) => {
    console.log(`[lerna-gui] lerna ${args.join(' ')}`)
    const runAdd = spawn(
      'lerna',
      args,
      {
        cwd: process.cwd(),
        stdio: [
          process.stdin,
          process.stdout,
          process.stderr
        ]
      }
    );

    runAdd.on('close', (code) => {
      resolve(code);
    });
  });
};

module.exports = (program) => {
  program
    .command('add <pkg...>')
    .option('--scope [scope]', 'work on certain module')
    .description(' Add a multiple dependencies to matched packages')
    .action(async (pkgList, cmd) => {
      const pkgSet = Array.from(new Set(pkgList)).filter(pkg => !!pkg);
      for (let i = 0; i < pkgList.length; i++) {
        await lernaAdd(pkgSet[i], cmd.scope);
      }
    });
};
