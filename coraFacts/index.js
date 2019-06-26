/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
  'en': {
    translation: {
      FACTS: [
        'Mummy looks very nice today.',
        'Peanut butter is tasty.',
        'Cora goes to school at William Tyndale, she is in year 1.',
        'Martha loves Elmo.',
        'Martha goes to Nursery at Hopes and Dreams',
        'Daddys head has lovely corners.',
        'Frog and Toad are good friends.',
        'Normal cheddar cheese is the best.',
        'Vinegar is a good ingredient of potions.',
        'Spiders love drinking fly juice',
        'The days are getting longer. It will soon be spring',
        'We live on Halton Road',
        'Cora goes school at William Tyndale. She is in year 1',
      ],
      SKILL_NAME: 'Cora Facts',
      GET_FACT_MESSAGE: "The mice say ",
      HELP_MESSAGE: 'You can say tell me something, or, you can say exit... What can I help you with?',
      HELP_REPROMPT: 'What can I help you with?',
      STOP_MESSAGE: 'Goodbye!',
    },
  },
};

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function () {
    this.emit('GetFact');
  },
  'GetFact': function () {
    // Get a random fact from the space facts list
    // Use this.t() to get corresponding language data
    const factArr = this.t('FACTS');
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];

    // Create speech output
    const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
    this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = this.t('HELP_MESSAGE');
    const reprompt = this.t('HELP_MESSAGE');
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
