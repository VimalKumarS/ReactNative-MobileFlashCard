import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  clearLocalNotification, setLocalNotification
} from '../utils/helpers'
import { style } from 'expo/src/Font';
import { NavigationActions } from 'react-navigation'

class QuizView extends React.Component {
  constructor(props) {
    super(props)
    const { deck } = this.props
    this.state = {
      totalCards: deck.questions.length,
      currentCard: 0,
      totalCorrect: 0,
      showAnswer: false,
      quizCompleted: false
    }
    this.showAnswer = this.showAnswer.bind(this)
    this.correctAnswer = this.correctAnswer.bind(this)
    this.incorrectAnswer = this.incorrectAnswer.bind(this)
    this.backReset = this.backReset.bind(this);
  }
  showAnswer() {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  correctAnswer() {
    const { currentCard, totalCards } = this.state
    this.setState((prevState) => ({
      totalCorrect: prevState.totalCorrect + 1,
      currentCard: prevState.currentCard + 1
    }))

    if ((currentCard + 1) === totalCards) {
      this.setState((prevState) => ({
        quizCompleted: true,
        currentCard: 0
      }))
      clearLocalNotification().then(setLocalNotification)
    }
  }

  incorrectAnswer() {
    const { currentCard, totalCards } = this.state
    if (this.state.totalCorrect >= 0) {
      this.setState((prevState) => ({
        currentCard: prevState.currentCard + 1
      }))
    }

    if ((currentCard + 1) === totalCards) {
      this.setState((prevState) => ({
        quizCompleted: true,
        currentCard: 0
      }))
      clearLocalNotification().then(setLocalNotification)
    }
  }

  backReset(deck,routename){

    const resetAction = NavigationActions.reset({
      index: 1,
      key:null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: routename,
        params: {  
          title: deck.title,
          questions: deck.questions
        }
      })
     
      ]
    });
    this.props.navigation.dispatch(resetAction);

  }

  render() {
    const { totalCards, currentCard, showAnswer, quizCompleted, totalCorrect } = this.state
    const { deck, navigation } = this.props
    return (
      <View style={styles.container}>
        {quizCompleted
          ?
          <View>
            <Text style={styles.quiz}>Quiz Completed</Text>
            <Text style={styles.score}>Your Score: {totalCorrect + ' out of ' + totalCards} </Text>

            <TouchableOpacity onPress={() => this.backReset(deck,"DeckDetail")}>
              <Text style={styles.answer}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => this.backReset(deck,"QuizView")}>
              <Text style={styles.answer}>Restart</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <Text style={{ color: "red", padding: 10, fontSize: 20 }}>
              {'Remaining Question: ' + (totalCards - (currentCard + 1))}
            </Text>
            {showAnswer
              ?
              <View>
                <Text style={styles.question}>{deck.questions[currentCard].answer}</Text>
                <TouchableOpacity style={[style.addCardBtn,{ borderColor: "green", marginBottom: 20 }]} onPress={this.showAnswer}>
                  <Text style={styles.cardText}>Question</Text>
                </TouchableOpacity>
              </View>
              :
              <View>
                <Text style={styles.question}>{deck.questions[currentCard].question}</Text>
                <TouchableOpacity style={[style.addCardBtn,{ borderColor: "green",borderWidth:2, marginBottom: 20 }]} onPress={this.showAnswer}>
                  <Text style={styles.cardText}>Answer</Text>
                </TouchableOpacity>
              </View>
            }
            <TouchableOpacity onPress={this.correctAnswer} style={[style.addCardBtn, { backgroundColor: "green",borderWidth:2, marginBottom: 20 }]}>
              <Text style={styles.cardText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.incorrectAnswer} style={[style.addCardBtn,{ backgroundColor: "red", marginBottom: 20 }]}>
              <Text style={styles.cardText}>Incorrect</Text>
            </TouchableOpacity>

          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20
  },
  question: {

    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  answer: {

    color: "red",
    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  quiz: {

    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  score: {

    padding: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  cardText: {
    
    textAlign: 'center',
    padding: 20,
    marginBottom: 20,
    color: 'black'
  },
  addCardBtn: {
    backgroundColor: 'white',
    borderColor: 'purple',
    borderWidth: 2,
    marginBottom: 20
  }
})


function mapStateToProps(state, props) {
  const { title,question } = props.navigation.state.params
  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(QuizView)