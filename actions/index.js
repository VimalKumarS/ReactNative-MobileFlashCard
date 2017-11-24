export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'
export const ADD_QUESTION = 'ADD_QUESTION'

export const addDeck = deck => ({ type: ADD_DECK, data: deck })

export const getDecks = decks => ({ type: GET_DECKS, data: decks })

export function addQuestion(deck) {
  return {
    type: ADD_QUESTION,
    data: deck
  }
}