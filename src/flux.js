import { API } from 'application/api';
import Fluxxor from 'fluxxor';

let constants = {
  DRAFT_TEXT: "ADD_DRAFT_TEXT_MESSAGE",
  FETCH_CALLS: "SUCCESFULLY_FETCHED_CALLS",
  FETCH_MESSAGES: "SUCCESFULLY_FETCHED_MESSAGES"
};

var CallStore = Fluxxor.createStore({
  initialize() {
    this.calls = [];

    this.bindActions(
      constants.FETCH_CALLS, this.onCallsFetched
    );
  },

  getCalls() {
    return this.calls
  },

  onCallsFetched(calls) {
    this.calls = calls;
    this.emit('change');
  }
});

var MessageStore = Fluxxor.createStore({
  initialize() {
    this.messages = [];

    this.bindActions(
      constants.FETCH_MESSAGES, this.onMessagesFetched,
      constants.DRAFT_TEXT, this.onDraftText
    );
  },

  getMessages() {
    return this.messages
  },

  onMessagesFetched(messages) {
    this.messages = messages;
    this.emit('change');
  },

  onDraftText(textInfo) {
    this.messages.push({
      id: this.messages.length + 1,
      from: textInfo.from,
      number: textInfo.number,
      status: "draft"
    });

    this.emit('change');
  }
});


let actions = {
  addText(textInfo) {
    // example of error checking
    if ( textInfo.from ) {
      this.dispatch(constants.DRAFT_TEXT, textInfo)
    }
  },

  fetchCalls() {
    var result = API.getCalls();
    this.dispatch(constants.FETCH_CALLS, result);
  },

  fetchMessages() {
    var result = API.getMessages();
    this.dispatch(constants.FETCH_MESSAGES, result);
  }
}

export var flux = new Fluxxor.Flux({
  MessageStore: new MessageStore(),
  CallStore: new CallStore()
}, actions);
