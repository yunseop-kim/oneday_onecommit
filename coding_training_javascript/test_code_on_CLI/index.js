var inquirer = require('inquirer');
var question = {
  type: 'list',
  name: 'choice',
  message: 'pick three',
  choices: ['one', 'two', 'three']
};
inquirer.prompt([question], function (answers) {
  console.log('user picked', answers.choice);
});