import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { newCardToDeck } from '../utils/api'
import { addQuestion } from '../actions'

class AddNewCard extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: ''
    }

    this.addNewCard = this.addNewCard.bind(this)
  }


  addNewCard = () => {
    const { question, answer } = this.state
    const deckTitle = this.props.navigation.state.params.title
    const card = { question, answer }
    this.setState({
      question: '',
      answer: ''
    })
    newCardToDeck({ card, deckTitle }).then((data) => {
      //debugger;
      //this.props.dispatch(addQuestion(data))
   
      const resetAction = NavigationActions.reset({
        index: 1,
        key:null,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'DeckDetail',
          params: {  
            title: deckTitle,
            questions: JSON.parse(data)[deckTitle].questions
          }
        })
       
        ]
      });
      this.props.navigation.dispatch(resetAction);
      
      
      // this.props.navigation.dispatch(resetAction)
      // this.props.navigation.navigate('DeckDetail', {
      //   title: deckTitle,
      //   questions: JSON.parse(data)[deckTitle].questions}
      // );
    });
   }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Question: </Text>
          <TextInput style={styles.inputText} placeholder="Enter your question?" value={this.state.question} onChangeText={question => this.setState({ question })} />
          <Text style={styles.label}>Answer: </Text>
          <TextInput style={styles.inputText} placeholder="Enter your answer." value={this.state.answer} onChangeText={answer => this.setState({ answer })} />
          <TouchableOpacity
            onPress={this.addNewCard}
            style={styles.addCardBtn}
          >
            <Text style={styles.cardText}>Submit</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  label: {
    
    color: 'black',
    padding: 5,
    textAlign: 'left'
  },
  inputText: {
    height: 50,
   
    textAlign: 'left',
    marginBottom: 20
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


function mapStateToProps(state) {
  return {
    decks: state,
  }
}


export default connect(mapStateToProps)(AddNewCard)