import { TypeAnimator } from "./animatedText.js";



function displayAnimatedText() {
    const phrases = ["I am a web and Full stack developer",
                     "I am problem solver", 
                     "I am a proficient in HTML",
                     "I am proficient in JS",
                     "I am proficient in CSS",
                     "I proficent in Python",
                     "I know Node",
                     "I am constantly learning and improving myself",
                     "I am creative"
                    ];

  
    const typeText = new TypeAnimator(); 
    typeText.setPhraseArray(phrases)
    typeText.setTextToTypeCssSelector("#animated-text");
    typeText.start();


}


displayAnimatedText();


