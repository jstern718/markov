/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains(this.words);
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains(words) {
    const markovChain = {};

    for (let i = 0; i < words.length; i++) {
      let currentWord = words[i];
      let nextWord = words[i+1];

      if (i === words.length - 1) {
        markovChain[currentWord] ? markovChain[currentWord].push(null) : markovChain[currentWord] = [null]
      } else {
        markovChain[currentWord] ? markovChain[currentWord].push(nextWord) : markovChain[currentWord] = [nextWord];
      }
    }

    return markovChain
  }

  /** Pick random choice from array. */
  static choice(items) {
    return Math.floor(Math.random() * items.length);
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    const chain = this.chains;
    let currentWord = this.words[0];
    let resultText = currentWord;

    while (currentWord !== null) {
      let randomNum = MarkovMachine.choice(chain[currentWord])
      let wordToAdd = chain[currentWord][randomNum];

      if (wordToAdd === null) {
        break;
      }
      resultText += (' ' + wordToAdd);

      currentWord = wordToAdd;
    }

    return resultText
  }
}

module.exports = {
  MarkovMachine,
};