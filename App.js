import React from 'react';
import { StyleSheet, Text, View, StatusBar,Platform } from 'react-native';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import ListDeck from "./components/ListDeck"
import NewDeck from "./components/NewDeck"
import DeckDetail from "./components/DeckDetail"
import AddNewCard from "./components/AddNewCard"
import QuizView from "./components/Quiz"
import { Constants } from 'expo'  

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = TabNavigator({
  ListDeck: {
    screen: ListDeck,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='home' size={30} color={purple} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
    }
  },
}, {
  tabBarPosition: 'bottom',
  navigationOptions: {
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail:{ screen :DeckDetail},
  AddNewCard:{screen:AddNewCard},
  QuizView :{screen:QuizView}
}
);

export default class App extends React.Component {
  componentDidMount() {
       setLocalNotification()
      }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
