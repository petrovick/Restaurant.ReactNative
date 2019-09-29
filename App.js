import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import RestaurantList from 'components/RestaurantList'
import RestaurantInfo from 'components/RestaurantInfo'
import About from 'components/About'

import Icon from 'react-native-vector-icons/FontAwesome'


const List = createStackNavigator(
  {
    Home: { screen: RestaurantList },
    Info: { screen: RestaurantInfo }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0066CC',
        color: '#FFF'
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        color: '#FFF'
      }
    }
  });
export default 
  createAppContainer(
    createBottomTabNavigator({
      List: {screen: List},
      About: {screen: About}
    },
    {
      defaultNavigationOptions: ({navigation}) => {
        return {
          tabBarIcon: ({tintColor}) => {
            const route = navigation.state.routeName
            const name = {
              'List': 'list',
              'About': 'info-circle'
            }[route]
            console.log(`route name : ${name}`)
            return <Icon name={name} color={tintColor} size={22} />
          },
          tabBarOptions: {
            activeBackgroundColor: '#E6F0FA'
          }
        }
      }
    })
  )
  
