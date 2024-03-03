/**
 * TypeAnimator - Animate Text Display
 * 
 * Represents a text animator for creating typing effects on HTML elements.
 * 
 * Usage:
 * 
 * 1. Set up HTML:
 * 
 *    - Create a container element in your HTML (e.g., <div>, <span>) with an ID or class selector.
 *    - Add the text content you want to animate inside the container.
 * 
 *    Example:
 *    ```html
 *    <span id="text-to-animate"></span>
 *    ```
 * 
 * 2. Define Phrases Array:
 * 
 *    - In your JavaScript file where calling this class define an array containing phrases to be animated/typed.
 * 
 *    Example:
 *    ```javascript
 *    const phrases = ["Welcome to our website.", "Discover amazing features.", "Get started now!"];
 *    ```
 * 
 * 3. Create TypeAnimator Instance:
 * 
 *    - Instantiate a TypeAnimator object.
 * 
 *    Example:
 *    ```javascript
 *    const typeAnimator = new TypeAnimator();
 *    ```
 * 
 * 4. Set Text Element:
 * 
 *    - Use the `setTextToTypeCssSelector` method to specify the CSS selector for the text container element.
 * 
 *    Example:
 *    ```javascript
 *    typeAnimator.setTextToTypeCssSelector("#text-to-animate");
 *    ```
 * 
 * 5. Optional Configuration:
 * 
 *    - Adjust typing speed, erasing speed, time it waits before displaying the next phrase
 *      and other parameters as needed using the appropriate setter methods.
 * 
 *    Example:
 *    ```javascript
 *    typeAnimator.setTypingSpeed(50); // Set typing speed to 50 milliseconds per character
 *    ```
 * 
 * 6. Start Animation:
 * 
 *    - Finally, call the `start` method to begin the text animation.
 * 
 *    Example:
 *    ```javascript
 *    typeAnimator.start();
 *    ```
 * 
 * @param {Array} phrasesArray - An array of phrases to be animated.
 */




/**
 * Represents a TypeAnimator for animating text.
 * @class
 */
class TypeAnimator{
    
    constructor() {
        
        this._animatedTextElement             = null;
        this.phrasesArray                     = null;
        this._index                           = 0;
        this.typingSpeed                      = 100; 
        this.waitingTimeBeforeErasingText     = 3000; 
        this.waitTimeBeforeCallingNextPhrase  = 1000; 
        this.eraseSpeed                       = 50; 
        this._typingInterval                  = null;
        this._erasingInterval                 = null;
    }

    /**
     * Types out the text of the current phrase in the phrases array.
     * @private
     */
    _typeText() {
        const phrase = this.phrasesArray[this._index];
        let charIndex = 0;

        this._typingInterval = setInterval(() => {
            if (charIndex < phrase.length) {
                this._animatedTextElement.textContent += phrase[charIndex];
                charIndex++;
            } else {
                clearInterval(this._typingInterval);
                setTimeout(this._eraseText.bind(this), this.waitingTimeBeforeErasingText);
            }
        }, this.typingSpeed);
    }

    /**
     * Erases the text currently displayed.
     * @private
     */
    _eraseText() {
        let phrase = this._animatedTextElement.textContent;
        let charIndex = phrase.length - 1;

        this._erasingInterval = setInterval(() => {
            if (charIndex >= 0) {
                this._animatedTextElement.textContent = phrase.slice(0, charIndex); // get the phrase minus one character from the end
                charIndex--;
            } else {
                clearInterval(this._erasingInterval);
                setTimeout(this._nextPhrase.bind(this), this.waitTimeBeforeCallingNextPhrase);
            }
        }, this.eraseSpeed);
    }

    /**
     * Moves to the next phrase in the array and starts typing it.
     * @private
     */
    _nextPhrase() {
        this._index = (this._index + 1) % this.phrasesArray.length;
        this._typeText();
    }

    /**
     * Starts the animation by typing out the text.
     */
    start() {
        this._typeText();
    }

    /**
     * Stops the animation by clearing the typing and erasing intervals.
     */
    stop() {
        clearInterval(this._typingInterval);
        clearInterval(this._erasingInterval);
    }

    /**
     * Sets new text to be animated.
     * @param {Array} phrasesArray - An array of phrases to be animated.
     */
    setPhraseArray(phrasesArray) {

        if (!Array.isArray(phrasesArray) ) {
            throw new Error("The phrase array must be an array!!!");
        }
        if (Array.isArray(this.phrasesArray).length === 0) {
            throw new Error("The phrase array cannot be empty!!!");
        }

        this.phrasesArray = phrasesArray;
        this._index       = 0;
        this.stop();     // Stop any ongoing animation
    }


    /**
     * Sets the element to animate text based on a CSS selector.
     * The method queries the document for an element matching the provided CSS selector,
     * and assigns it as the target element for animating text.
     * Throws an error if the provided identifier is invalid or if no element is found matching the selector.
     * @param {string} identifier - The CSS selector for the element to animate text. Must start with '.' (class) or '#' (id).
     * @throws {Error} Throws an error if the identifier does not start with '.' or '#' or if no element is found matching the selector.
     */
    setTextToTypeCssSelector(identifier) {
        if (!identifier.startsWith(".") && !identifier.startsWith("#")) {
            throw new Error("The identifier must start with a '.' (class) or '#' (id).");
        }

        const animatedTextElement = document.querySelector(identifier);

        if (!animatedTextElement) {
            throw new Error("The identifier (id or class) for animated text couldn't be located. Null was returned.");
        }

        this._animatedTextElement = animatedTextElement;
    }

    /**
     * Sets the typing speed for the text animation.
     * @param {number} speed - The typing speed in milliseconds per character.
     * @throws {Error} Throws an error if the provided speed is not an integer.
     */
    setTypingSpeed(speed) {
        this._isValid(speed, "The value for the speed entered must be an integer");
        this.typingSpeed = speed;
    }

    /**
     * Sets the waiting time before deleting the text.
     * @param {number} waitingTime - The waiting time in milliseconds.
     * @throws {Error} Throws an error if the provided waiting time is not an integer.
     */
    setwaitingTimeBeforeErasingText(waitingTime) {
        this._isValid(waitingTime, "The value for the waiting time before the text is erase must be an integer");
        this.waitingTimeBeforeErasingText = waitingTime;
    }

    /**
     * Sets the waiting time before the next phrase is called.
     * @param {number} waitingTime - The waiting time in milliseconds.
     * @throws {Error} Throws an error if the provided waiting time is not an integer.
     */
    setwaitTimeBeforeCallingNextPhrase(waitingTime) {
        this._isValid(waitingTime, "The value for the waiting time before the next phrase is called must an integer");
        this.waitTimeBeforeCallingNextPhrase = waitingTime;
    }

  
    /**
     * Checks if the value is a number.
     * Throws an error with the specified message if the value is not a number.
     * @param {*} value - The value to check.
     * @param {string} msg - The error message to throw if the value is not a number.
     * @throws {Error} Throws an error if the value is not a number.
     */
    _isValid(value, msg) {
        if (typeof value !== 'number') {
            throw new Error(msg);
        }
    }

}


export { TypeAnimator };