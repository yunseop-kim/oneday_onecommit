var bddStdin = require('bdd-stdin');
var inquirer = require('inquirer');
it('selects the third choice', function (done) {
  bddStdin(bddStdin.keys.down, bddStdin.keys.down, '\n');
  var question = {
    type: 'list',
    name: 'choice',
    message: 'pick three',
    choices: ['one', 'two', 'three']
  };
  inquirer.prompt([question], function (answers) {
    console.assert(response === 'three');
    done();
  });
});