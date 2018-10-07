import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import RankItem from '../components/RankItem';
import firebase from '../FirebaseCon';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      lista:[],
      search:'',
      loading:false,
      display: 1,
      gold: 0,
      silver: 0,
      bronze: 0
    };

    this.update = this.update.bind(this);
    this.loadlista = this.loadlista.bind(this);
    this.busca = this.busca.bind(this);

    console.disableYellowBox = true;
  }

  componentDidMount() {   
    this.loadlista();
  }

  loadlista() {
    this.setState({loading:true});
    firebase.database().ref('players').orderByChild('score').on('value', (snapshot) => {
      let state = this.state;
      state.lista = []

      snapshot.forEach((childItem) => {
        state.lista.push({
          key:childItem.key,
          nome:childItem.val().nome,
          score:childItem.val().score,
          tel:childItem.val().tel,
          email:childItem.val().email
        });
      });
      state.loading = false;
      if(this.state.lista.length == ''){
        state.display = 0;
      } else if (this.state.lista.length == 1){
        state.display = 1;
        state.gold = 1;
        state.silver = 0;
        state.bronze = 0;
      } else if(this.state.lista.length == 2)   {
        state.display = 1;
        state.gold = 1;
        state.silver = 1;
        state.bronze = 0;        
      } else if (this.state.lista.length >= 3) {
        state.display = 1;
        state.gold = 1;
        state.silver = 1; 
        state.bronze = 1;        
      }
      this.setState(state);
    });
  }

  setText(txt) {
  	if(txt == '') {
  		this.setState({display: 1})
  	} else {
		this.setState({display: 0})
  	}
  }

  update() {
    this.props.navigation.navigate('UpdateUser');
  }

  busca(event) {
    this.setState({search: event.nativeEvent.text});
  }


    render() {
      let filteredNames = this.state.lista.filter(
        (nome) => {
          return nome.nome.indexOf(this.state.search) !== -1
        }
      );
      return (
        <View style={styles.container}>
        <TextInput style={styles.busca} placeholder="Buscar..." value={this.state.search} onChangeText={(txt) => this.setText(txt)} onChange={this.busca} />     
        {this.state.loading && <ActivityIndicator style={{alignSelf:'center'}} size="large" />}
          <View style={styles.content}>
            {this.state.loading == false &&
            <View style={[styles.rank, {opacity: this.state.display}]}>
            	<Image source={require('../assets/gold.png')} style={{width: 21, height: 21, opacity: this.state.gold }} />
            	<Image source={require('../assets/silver.png')} style={{width: 21, height: 21, opacity: this.state.silver}} />
            	<Image source={require('../assets/bronze.png')} style={{width: 21, height: 21, opacity: this.state.bronze}} />
            </View>
            }
              <View style={{marginTop: 4}}>
              <FlatList data={filteredNames} enableEmptySections={true} renderItem={({item})=> <RankItem data={item} />}  />
              </View>
          </View>
        </View>
      );
    }  
}

const styles = StyleSheet.create({
  container:{
    margin: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10
  },
  content: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center'
  },
  busca:{
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  rank:{
    alignSelf: 'flex-start',
    marginTop: 5,
    marginRight: 2
  }
});