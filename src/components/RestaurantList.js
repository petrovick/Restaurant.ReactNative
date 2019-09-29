import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  FlatList,
  Image
} from 'react-native';

import {withNavigation} from 'react-navigation';

import axios from 'axios'

import Header from 'components/Header'
import RestaurantRow from 'components/RestaurantRow'
import PizzaImage from 'images/pizza.png'

class RestaurantList extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    search: null,
    restaurants: []
  }

  componentDidMount() {
    axios.get('http://localhost:3000/restaurants')
      .then(result => this.setState({restaurants: result.data}))
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF'
      }}>
        <View style={{
            marginTop: 30,
            alignItems: 'center'
          }}>
          <Image source={PizzaImage} />
        </View>
        <Header />
        <TextInput style={styles.input} 
          placeholder="Live Search"
          onChangeText={text => {
            this.setState({search: text})
          }}
          value={this.state.search}
        />

        <FlatList
        data={
          this.state.restaurants.filter(place => {
          return !this.state.search || 
            place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
          })
        }
        renderItem={({item, index}) => <RestaurantRow place={item} index={index} />}
        keyExtractor={item => item.name}
        initialNumToRender={16}
        ListHeaderComponent={<View style={{height: 30}} />}
        />

        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5'
  }
});
export default withNavigation(RestaurantList)