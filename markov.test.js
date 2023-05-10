"use strict"
let { MarkovMachine } = require("./markov");

describe("test markov machine", function () {

  let machine;
  let machine2;

  beforeAll(function(){
    machine = new MarkovMachine("the cat in the hat");
    machine2 = new MarkovMachine(
      "anyone lived in a pretty how town with up so floating many bells down"
    );
  })

  test("getChains", function () {
    expect(machine.chains).toEqual({
      the: [ 'cat', 'hat' ],
      cat: [ 'in' ],
      in: [ 'the' ],
      hat: [ null ]
    });
  });

  test("getText", function () {
    expect(machine2.getText()).toEqual(
      "anyone lived in a pretty how town with up so floating many bells down"
    );
  });
})
