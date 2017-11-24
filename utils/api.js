import { AsyncStorage } from 'react-native'

const async_storage_key = 'mobile-flashcard-vk'

const initalData = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces',
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event',
			},
		],
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer:
					'The combination of a function and the lexical environment within which',
			},
		],
	},
}

export function initialize() {
	AsyncStorage.setItem(async_storage_key, JSON.stringify(initalData))
	return initalData
}


export function fetchDecks() {
	return AsyncStorage.getItem(async_storage_key).then(results => {
		return results === null ? initialize() : JSON.parse(results)
	})
}

export function addNewDeck(deck) {
	let resp= AsyncStorage.mergeItem(async_storage_key, JSON.stringify(deck))
	return resp;
}

export function newCardToDeck({ card, deckTitle }) {
	return AsyncStorage.getItem(async_storage_key, (err, result) => {
		let decks = JSON.parse(result)

		let newQuestions = JSON.parse(
			JSON.stringify(decks[deckTitle].questions),
		)
		newQuestions[newQuestions.length] = card

		const value = JSON.stringify({
			[deckTitle]: { title: deckTitle, questions: newQuestions },
		})

		AsyncStorage.mergeItem(async_storage_key, value)
		return value;
	})
} 