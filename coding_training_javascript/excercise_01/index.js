const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function inputAnswer() {
    rl.question('What is your name? ', (answer) => {
        // TODO: Log the answer in a database
        printOut(answer);
        rl.close();
    });
}

function printOut(answer){
    let str = bondingString(answer);
    console.log(str);
}

function bondingString(answer){
    let answers = [
        `Hello, ${answer}, nice to meet you!`,
        `Hello, ${answer}, how are you?`,
        `Hello, ${answer}, how have you been?`
    ];
    let randNum = Math.floor((Math.random() * answers.length) + 1);
    return answers[randNum];
}

inputAnswer();