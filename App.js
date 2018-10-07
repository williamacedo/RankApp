import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from './src/screens/Home';
import AddUser from './src/screens/AddUser';

const Navegador = createStackNavigator({
  Home: {
    screen:Home,
    navigationOptions: ({navigation}) => ({
      title:"Ranking",
      headerRight:(
        <TouchableOpacity style={{padding: 10, backgroundColor: '#2f92d7', marginRight: 10, borderRadius: 10}} onPress={() => navigation.navigate('AddUser')}>
          <Text style={{fontSize: 15, fontWeight:'bold', color: '#FFFFFF'}}>+ Adicionar</Text>
        </TouchableOpacity>
      )      
    })
  },
  AddUser:{
    screen:AddUser,
    navigationOptions:{
      title:'Adicionar Usuario'
    }    
  }
});


export default Navegador;