const { ActivityTypes, MessageFactory, CardFactory } = require('botbuilder');
//const builderTeams = require('botbuilder-teams');

/**
 * A bot that responds to input from suggested actions.
 */

const brbCard = require('./brbCard.json')

class BrbBot {
    /**
     *
     * @param {ConversationState} conversation state object
     */
    constructor(conversationState) {
        // Creates a new state accessor property.
        // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors
        this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
        this.conversationState = conversationState;
    }
    /**
     *
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        if (turnContext.activity.text == "back") {
            count = count === undefined ? 1 : ++count;
            await turnContext.sendActivity("Welcome Back!")
        }

        else if (turnContext.activity.type === ActivityTypes.Message) {
            let count = await this.countProperty.get(turnContext);
            count = count === undefined ? 1 : ++count;
            await turnContext.sendActivity({
                attachments: [CardFactory.adaptiveCard(brbCard)]
            });
        }

        else {
                await turnContext.sendActivity(`[${ turnContext.activity.type } event detected.]`);
        }
        await this.conversationState.saveChanges(turnContext);
    }
}

module.exports.BrbBot = BrbBot;
