import { API } from 'application/api';

// action creators
export function addText(textInfo) {
  // example of error checking
  if ( textInfo.from ) {
    return Object.assign({}, textInfo, { type: 'DRAFT_TEXT'} )
  } else {
    return {}
  }
}

export function fetchCalls() {
  // not making async for simplicity
  return {
    type: 'FETCH_CALLS',
    calls: API.getCalls()
  }
}

export function fetchMessages() {
  // not making async for simplicity
  return {
    type: 'FETCH_MESSAGES',
    messages: API.getMessages()
  }
}
