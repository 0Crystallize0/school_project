const myButton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
    } else {
        myButton.style.display = "none";
    }
};

myButton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

const testBtn = document.querySelector('.test-start');
const exit = document.querySelector('.exit-btn');
const test = document.querySelector('.test');

testBtn.addEventListener('click', () => {
    test.classList.add('open');
});

exit.addEventListener('click', () => {
    test.classList.remove('open')
})
