import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { getDecks } from '../actions'
class DeckDetail extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        //dispatch(getDecks(decks))
		
	}

    // shouldComponentUpdate(nextProps, nextState){
    //     return ( nextProps.navigation.state.params.questions.length  !== this.props.navigation.state.params.questions.length );
    // }
    render() {
        const { title, questions } = this.props
        
        return (
            <View style={[styles.container]}>
                <View style={styles.headerText}>
                    <Text style={[styles.cardText,{textAlign:'center'}]}>{title}</Text>
                    <Text style={styles.cardText}>
                        {questions && questions.length} cards
                    </Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.addCardBtn}
                        onPress={() =>
                            this.props.navigation.navigate('AddNewCard', {
                                title: title,
                            })}
                    >
                        <Text style={styles.cardText}>Add Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addCardBtn}
                        onPress={() =>
                            this.props.navigation.navigate('QuizView', {
                                title: title,
                                questions: questions,
                            })}
                    >
                        <Text style={styles.cardText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      backgroundColor: 'white'
    },
    headerText: {
     
      padding: 20,
      paddingBottom: 0,
     
    },
    cardText: {
      
        textAlign:'center',
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

function mapStateToProps(state,props) {
    const { title,questions } = props.navigation.state.params
    return {
        title:title,
        questions: state[title].questions,
    }
}

export default connect(mapStateToProps)(DeckDetail)