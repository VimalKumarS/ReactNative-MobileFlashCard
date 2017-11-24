import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../utils/api'
import { addDeck } from '../actions/'

class NewDeck extends Component {


  constructor(props) {
    super(props)
    this.state = {
      newtext : ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.SaveDeck = this.SaveDeck.bind(this)
  }
  componentWillMount(){
    this.setState({
      newtext: ''
    })
  }

  SaveDeck = () => {
    const { decks } = this.props
    const deck = this.state.newtext
    this.setState({
      newtext: ''
    })
  
      const newDeck = {
        [deck]: { title: deck, questions: [] },
      }
      return addNewDeck(newDeck)
        .then(() => this.props.dispatch(addDeck(newDeck)))
        .then(() => {
          
          this.props.navigation.navigate('NewDeck')
        })
        .catch(error => {
          console.log(error)
        })
    
  }
  handleChangeText (text) {
    this.setState({
      newtext: text
    })
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputBox}>
          <Text style={styles.text}>
            What is the title of your new deck?
					</Text>
          <TextInput
            value={this.state.newtext}
            style={styles.input}
            onChangeText={this.handleChangeText}
            placeholder={'Deck Title'}
            
          />
          <TouchableOpacity
            onPress={this.SaveDeck}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    
    
  },
  input: {
    width: 250,
    height: 50,
    padding: 8,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: '#fff',
    margin: 30,
  },
  button: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    
  },
  inputBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = state => {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(NewDeck)