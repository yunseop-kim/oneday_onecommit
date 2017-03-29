import question from './question';
import CONFIG from './config';

function printOut(answer) {
    let str = bondingString(answer);
    console.log(str);
}

function bondingString(answer) {
    const answers = [
        `Hello, ${answer}, nice to meet you!`,
        `Hello, ${answer}, how are you?`,
        `Hello, ${answer}, how have you been?`
    ];
    let randNum = Math.floor((Math.random() * answers.length) + 1);
    return answers[randNum];
}

question(CONFIG.QUESTION)
    .then(bondingString)
    .then(process.exit);