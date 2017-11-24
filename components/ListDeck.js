import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import {white,blue} from '../utils/colors'

class ListDeck extends React.Component {
  componentDidMount() {
    fetchDecks()
      .then(decks => {
        debugger;
        return this.props.dispatch(getDecks(decks))
      })
      .catch(error => {
        console.log(error)
      })

  }

  renderItem = ({ item }) => (
		<View >
			<TouchableOpacity	onPress={() => this.props.navigate('DeckDetail', item)}>
			
        <View style={styles.deck}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                
                    <Text style={styles.headerText}>{item.title}</Text>
                    <Text style={styles.cardText}>
                    {item.questions && item.questions.length} cards
                    </Text>
                </View>
            </View>

			</TouchableOpacity>
		</View>
	)

  render() {
	
		return (
			<View style={styles.container}>
				<FlatList
					data={Object.values(this.props.decks)}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => index}
				/>
			</View>
		)
	}
}


function mapStateToProps(state, props) {
  return {
    decks: state,
    navigate: props.navigation.navigate,
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:white,
    padding: 30,
    marginBottom: 10,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'stretch',
  },
  deck: {
    flexDirection: 'column',
    marginTop: 12,
    height: 120,
    backgroundColor: '#e76e63',
    justifyContent: 'center',
    alignItems: 'center',
    
},
  headerText: {
    padding: 20,
   
    textAlign: 'center'
  },
  cardText: {
    paddingBottom: 20,
    
    color: blue,
    textAlign: 'center'
  }
})

export default connect(mapStateToProps)(ListDeck)