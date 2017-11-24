import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class DeckDetail extends React.Component {
    render() {
        const { title, questions } = this.props.navigation.state.params
        
        return (
            <View style={styles.container}>
                <View style={styles.headerText}>
                    <Text style={styles.cardText}>{title}</Text>
                    <Text style={styles.cardText}>
                        {questions.length} cards
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

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(DeckDetail)