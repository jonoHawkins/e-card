import greetings from './lang/greetings.json'
import christmas from './lang/christmas.json'
import signOff from './lang/signOff.json'

function getRandomFromArr(words: string[]) {
    return words[Math.round(Math.random() * (words.length - 1))]
}

function getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
}

function randomiseGreeting({ selector = '.js-message' } = {}) {
    const node = document.querySelector(selector);

    if (!node) {
        throw new Error(`Cannot find ${selector}`)
    }

    const params = new URLSearchParams(location.search);

    document.body.setAttribute('class', `s-theme s-theme--${getRandomInt(1, 6)}`);

    node.innerHTML = `
            <div class="msg">
                <span class="msg__greeting">${getRandomFromArr(greetings).replace('${to}', params.get('to'))}</span>
                <span class="msg__main">${getRandomFromArr(christmas)}</span>
                <span class="msg__sign-off">${getRandomFromArr(signOff).replace('${from}', params.get('from'))}</span>
            </div>
            <button class="js-randomize randomize-btn">Randomize</button>
    `
}

// randomiseGreeting();

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.js-randomize')) {
        randomiseGreeting();
    }
}, { capture: true });