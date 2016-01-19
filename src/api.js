var callData = [
  {
    "id": 1,
    "from": "David",
    "number": "215-555-0000",
    "date": "2015-01-20-T18:25:43-05:00"
  },
  {
    "id": 2,
    "from": "Solicitor",
    "number": "800-456-7890",
    "date": "2015-01-17-T18:25:43-05:00"
  }
];

var messageData = [
  {
    "id": 1,
    "from": "David",
    "body": "Don't forget to get ready for the talk!",
    "date": "2015-01-20-T18:25:43-05:00",
    "status": "received"
  },
  {
    "id": 2,
    "from": "Sherrie",
    "body": "Are you going to that meeting?",
    "date": "2015-01-20-T10:25:43-05:00",
    "status": "received"
  },
  {
    "id": 3,
    "from": "Jeff",
    "body": "What are you doing tonight?",
    "date": "2015-01-20-T13:25:43-05:00",
    "status": "received"
  }
];


export var API = {
  getCalls() {
    return(callData);
  },

  getMessages() {
    return(messageData);
  }
}
