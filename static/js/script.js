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


displayAnimatedText();


