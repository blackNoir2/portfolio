import { TypeAnimator } from "./utils/animatedText.js";



function displayAnimatedText() {

    const phrases = ["I am a web and a Full stack developer",
                     "I am a problem solver", 
                     "I am a proficient in HTML",
                     "I am proficient in JS",
                     "I am proficient in CSS",
                     "I am proficent in Python",
                     "I know Node",
                     "I am constantly learning and improving myself",
                     "I am creative and the entire world is my inspiration"
                    ];

  
    const typeText = new TypeAnimator(); 
    typeText.setPhraseArray(phrases);
    typeText.setTextToTypeCssSelector("#animated-text");
    typeText.start();
}


function toggleHomeIcon() {
    toggleTextHelper(".home-icon");
}


function toggleAboutMeIcon() {
    toggleTextHelper(".about-me-icon");
}


function toggleSkillsIcon() {
    toggleTextHelper(".skills-icon");
}


function toggleProjectIcon() {
    toggleTextHelper(".projects-icon");
}


function toggleContactUsIcon() {
    toggleTextHelper(".contact-me-icon");
}

function toggleTextHelper(iconDivElement, textMenuItemElement = ".menu-item") {
    const divElements      = document.querySelectorAll(iconDivElement);
    const menuItemElements = document.querySelectorAll(`${iconDivElement} ${textMenuItemElement}`);

    divElements.forEach((divElement, index) => {
        divElement.addEventListener("mouseover", () => {
            divElement.classList.add("display-item");
            menuItemElements[index].classList.remove("hide-item");
        });

        divElement.addEventListener("mouseout", () => {
            divElement.classList.remove("display-item");
            menuItemElements[index].classList.add("hide-item");
        });
    });
}



displayAnimatedText();
toggleHomeIcon();
toggleAboutMeIcon();
toggleSkillsIcon();
toggleProjectIcon();
toggleContactUsIcon();


