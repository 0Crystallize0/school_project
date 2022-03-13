// To top btn

const myBtn = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myBtn.style.display = "block";
    } else {
        myBtn.style.display = "none";
    }
};

myBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Test

const testBtn = document.querySelector('.test-start');
const test = document.querySelector('.test');
let answers = [];

testBtn.addEventListener('click', () => {
    test.classList.add('open');
    questions();
});

const animation = (testHeading, testQuestion, testAnswer) => {
    testHeading.classList.add('test-heading-animation');
    testQuestion.classList.add('test-question-animation');
    testAnswer.classList.add('test-answer-animation');
}

const close = () => {
    test.classList.remove('open');
}

const end = () => {
    document.querySelector('.current-question').classList.remove('current-question');

    answers = answers.filter(answer => answer !== '0');
    console.log(answers.length);
    document.querySelector('.score').style.display = "block";
    document.querySelector('.final-score').innerHTML = "Правильно: " + answers.length + " / 15";
}

const questions = () => {
    const questions = document.querySelectorAll('.question')
    let currentQuestion = document.querySelector('.current-question');
    let index = 0;

    let testHeading = currentQuestion.querySelector('.test-heading');
    let testQuestion = currentQuestion.querySelector('.test-question');
    let testAnswer = currentQuestion.querySelector('.test-answer');

    setTimeout(animation, 800, testHeading, testQuestion, testAnswer);

    const nextBtn = () => {
        let answer = currentQuestion.querySelector('input[name="answer"]:checked').value;
        answers.push(answer);

        currentQuestion.classList.remove('current-question');

        index++;
        questions[index].classList.add('current-question');

        currentQuestion = document.querySelector('.current-question');
        testHeading = currentQuestion.querySelector('.test-heading');
        testQuestion = currentQuestion.querySelector('.test-question');
        testAnswer = currentQuestion.querySelector('.test-answer');

        setTimeout(animation, 800, testHeading, testQuestion, testAnswer);
    }

    document.querySelectorAll('.test-next')
        .forEach(target => target.addEventListener('click', nextBtn));

    document.querySelectorAll('.exit-btn')
        .forEach(target => target.addEventListener('click', close));

    document.querySelector('.test-end').addEventListener('click', end);
}
