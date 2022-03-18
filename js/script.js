// To top btn

const myBtn = document.querySelector('#btn-back-to-top');

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myBtn.style.display = 'block';
    } else {
        myBtn.style.display = 'none';
    }
};

myBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Test

const question = {
    test: document.querySelector('.test'),
    questions: document.querySelectorAll('.question'),
    currentQuestion: document.querySelector('.current-question'),
    index: -1,
    answers: [],

    updateCurrentQuestion() {
        this.index++;
        this.currentQuestion.classList.remove('current-question');
        this.questions[this.index].classList.add('current-question');
        this.currentQuestion = document.querySelector('.current-question');
    },

    startTest() {
        this.test.style.display = 'block';

        this.updateCurrentQuestion();

        document.querySelectorAll('.test-next')
            .forEach(target => target.addEventListener('click', this.nextQuestion));

        document.querySelectorAll('.exit-btn')
            .forEach(target => target.addEventListener('click', this.closeTest));
    },

    closeTest() {
        if (confirm('Завершить тест?')) {
            question.test.style.display = 'none';
            question.index = -1;
            this.answers = [];
            question.currentQuestion.classList.remove('current-question');
            question.questions[0].classList.add('current-question');
            question.resetAnimation();

            if (document.querySelector('.medal')) {
                document.querySelector('.medal').remove();
            }

            document.querySelectorAll('.test-next')
                .forEach(target => target.removeEventListener('click', this.nextQuestion));

            document.querySelectorAll('.exit-btn')
                .forEach(target => target.removeEventListener('click', this.closeTest));

            document.querySelector('.test-score').removeEventListener('click', () => {
                question.finishTest();
            });
        }
    },

    finishTest() {
        this.answers = this.answers.filter(answer => answer !== '0');

        this.finaleScore = document.querySelector('.final-score');
        this.finaleMedal = this.finaleScore.parentNode;

        this.medal = document.createElement('img');
        this.medal.classList.add('medal');
        this.medal.alt = 'img';

        this.finaleScore.innerHTML = 'Правильно: ' + this.answers.length + ' / 15';

        if (this.answers.length === 15) {
            this.medal.src = 'assets/img/1.png';
            this.finaleMedal.appendChild(this.medal);
        } else if (this.answers.length >= 8 && this.answers.length < 15) {
            this.medal.src = 'assets/img/2.png';
            this.finaleMedal.appendChild(this.medal);
        } else if (this.answers.length >= 3 && this.answers.length < 8) {
            this.medal.src = 'assets/img/3.png';
            this.finaleMedal.appendChild(this.medal);
        }
    },

    nextQuestion() {
        question.writeAnswer();
        question.updateCurrentQuestion();
        question.resetQuestion();
        question.animate();
    },

    writeAnswer() {
        let answer = this.currentQuestion.querySelector('input[name="answer"]:checked').value;
        this.answers.push(answer);
    },

    resetQuestion() {
        this.testHeading = this.currentQuestion.querySelector('.test-heading');
        this.testQuestion = this.currentQuestion.querySelector('.test-question');
        this.testAnswer = this.currentQuestion.querySelector('.test-answer');
    },

    animate() {
        setTimeout(() => {
            this.testHeading.classList.add('test-heading-animation');
            this.testQuestion.classList.add('test-question-animation');
            this.testAnswer.classList.add('test-answer-animation');
        }, 700);
    },

    resetAnimation() {
        this.testQuestion.classList.remove('test-question-animation');
        this.testAnswer.classList.remove('test-answer-animation');

        document.querySelectorAll('.test-heading')
            .forEach(target => target.classList.remove('test-heading-animation'));

        document.querySelectorAll('.test-question')
            .forEach(target => target.classList.remove('test-question-animation'));

        document.querySelectorAll('.test-answer')
            .forEach(target => target.classList.remove('test-answer-animation'));

        document.querySelectorAll('.form-check-input')
            .forEach(target => target.checked = false);
    }
}

document.querySelector('.test-start').addEventListener('click', () => {
    question.startTest();
    question.resetQuestion();
    question.animate();
});

document.querySelector('.test-score').addEventListener('click', () => {
    question.finishTest();
});

document.querySelector('.test-end').addEventListener('click', () => {
    question.closeTest();
});
