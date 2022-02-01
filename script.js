const firstTime = document.querySelector(".first-time");
const form = document.querySelector(".quiz-body-form");
const firstTimeBtn = document.querySelector(".first-time-btn");
const buttonPrev = document.querySelector(".button-prev");
const quizTel = document.querySelector(".quiz-btn");
const fourTime = document.querySelector(".four-time");
const fourBtn = document.querySelector(".four-btn");
const lastTime = document.querySelector(".last-time");

function change() {
  firstTime.style.display = "none";
  form.style.display = "block";
};

function prev() {
  firstTime.style.display = "flex";
  form.style.display = "none";
};

function quiz() {
  fourTime.style.display = "block";
  form.style.display = "none";
};
function last() {
  fourTime.style.display = "none";
  lastTime.style.display = "flex";
};

firstTimeBtn.addEventListener('click', change);
buttonPrev.addEventListener('click', prev);
quizTel.addEventListener('click', quiz);
fourBtn.addEventListener('click', last);

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const form = document.querySelector(".quiz-body-form");
  const formItems = form.querySelectorAll("fieldset");
  const btnsNext = form.querySelectorAll(".button-next");
  const btnsPrev = form.querySelectorAll(".button-prev");
  const quizInputPhone = document.querySelector(".quiz-input-phone");
  const answersObj = {
    step0: {
      question: "",
      answers: [],
    },
    step1: {
      answers: [],
      phone: "",
    },
    

  };

  btnsNext.forEach((btn, btnIndex) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      formItems[btnIndex].style.display = "none";
      formItems[btnIndex + 1].style.display = "flex";
    });

    btn.disabled = true;
  });

  for (let i = 0; i < btnsPrev.length; i++) {
    btnsPrev[i].addEventListener("click", (event) => {
      event.preventDefault();

      formItems[i + 1].style.display = "none";
      formItems[i].style.display = "flex";
    });
  }

  formItems.forEach((formItem, formItemIndex) => {
    if (formItemIndex === 0) {
      formItem.style.display = "flex";
    } else {
      formItem.style.display = "none";
    }

    if (formItemIndex !== formItems.length - 1) {
      const inputs = formItem.querySelectorAll("input");
      const itemTitle = formItem.querySelector(".question");

      answersObj[`step${formItemIndex}`].question = itemTitle.textContent;

      inputs.forEach((input) => {
        const parent = input.parentNode;
        input.checked = false;
        parent.classList.remove("active-radio");
      });
    }

    // выбор radio и checkbox
    formItem.addEventListener("change", (event) => {
      const target = event.target;
      const inputsChecked = formItem.querySelectorAll("input:checked");

      if (formItemIndex !== formItems.length - 1) {
        answersObj[`step${formItemIndex}`].answers.length = 0;
        inputsChecked.forEach((inputChecked) => {
          answersObj[`step${formItemIndex}`].answers.push(inputChecked.value);
        });

        if (inputsChecked.length > 0) {
          btnsNext[formItemIndex].disabled = false;
        } else {
          btnsNext[formItemIndex].disabled = true;
        }

        if (target.classList.contains("form-radio")) {
          const radios = formItem.querySelectorAll(".form-radio");

          radios.forEach((input) => {
            if (input === target) {
              input.parentNode.classList.add("active-radio");
            } else {
              input.parentNode.classList.remove("active-radio");
            }
          });
        } else if (target.classList.contains("form__input")) {
          target.parentNode.classList.toggle("active-checkbox");
        } else {
          return;
        }
      }
    });



  });

  const sendForm = () => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      answersObj.step2.phone = document.getElementById("quiz-phone").value;


      // for (let key in answersObj.step2) {
      //   if (answersObj.step4[key].value === "") {
      //     alert("Введите даные во все поля");
      //   }
      // }

      if (document.getElementById("quiz-policy").checked) {
        postData(answersObj)
          .then((res) => res.json())
          .then((res) => {
            if (res["status"] === "ok") {
              overlay.style.display = "none";
              quiz.style.display = "none";
              form.reset();
              alert(res["message"]);
            } else if (res["status"] === "error") {
              alert(res["message"]);
            }
          });
      } else {
        alert("Дайте согласие на обработку персональных данных");
      }
    });
  };
  const postData = (body) => {
    return fetch("./quiz.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  sendForm();

});

