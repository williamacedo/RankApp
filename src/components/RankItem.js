import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableHighlight, Modal, Button, TextInput, Image } from 'react-native';
import firebase from '../FirebaseCon';

export default class RankItem extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
    	key:'',
    	nome:'',
    	minuto:'',
      tel:'',
      email:'',
    	n:'',
    	score:'',
    	modalVisible:false,
      margin: 0
    };
    this.onPress = this.onPress.bind(this);
    this.modalOff = this.modalOff.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  onPress(key, nome, score, tel, email) {
   	let s = this.state;
   	s.key = key;
   	s.nome = nome;
   	s.score = score;
    s.tel = tel;
    s.email = email;
   	s.modalVisible = true;
   	this.setState(s);
  }

  modalOff() {
  	let s = this.state;
  	s.modalVisible = false;
  	this.setState(s);
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }  

  update() {
  	let key = this.state.key;
  	firebase.database().ref('players').child(key).set({
  		nome:this.state.nome,
  		score: (parseInt(this.state.minuto) * 60) + (parseInt(this.state.n)), 
      tel: this.state.tel,
      email: this.state.email
  	});

    this.setState({modalVisible: false});
  }

  remove (key) {
  	let s = this.state;
  	s.key = key;
    s.margin = -5;
  	let chave = this.setState(s);
    firebase.database().ref('players').child(key).remove();
    Alert.alert('Removido com sucesso');      
  }

   render() {

    return (
      <View>
        <View style={styles.table}>
          <Text style={styles.textTable1}>{this.props.data.nome}</Text>
          <Text style={styles.textTable2}>{this.props.data.score}</Text>
          <View style={styles.areaUR}>
          <TouchableHighlight underlayColor={false} onPress={() => this.onPress(this.props.data.key, this.props.data.nome, this.props.data.score, this.props.data.tel, this.props.data.email)}>
            <Image style={styles.imageButton} source={(require('./edit.png'))} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor={false} onPress={() => this.remove(this.props.data.key)}>
            <Image style={styles.imageButton} source={(require('./remove.png'))} />
          </TouchableHighlight>
          </View>              
        </View> 
        {/* Tela de Atualizar */}
      	<Modal animationType="slide" visible={this.state.modalVisible} onRequestClose={this.handleCloseModal}>
      		<TextInput value={this.state.nome} style={styles.input} placeholder="Nome" onChangeText={(text) => this.setState({nome:text})}  />
          <TextInput value={this.state.tel} style={styles.input} placeholder="Telefone" onChangeText={(text) => this.setState({tel:text})}  />
          <TextInput value={this.state.email} style={styles.input} placeholder="E-mail" onChangeText={(text) => this.setState({email:text})}  />
          <Text style={{alignSelf:'center'}}>Score Atual: {(parseInt(this.state.score) / 60).toFixed(2) }</Text>
            <View style={styles.areaMin}>
              <TextInput style={styles.inputTime} value={this.state.minuto} placeholder="Minuto" onChangeText={(text) => this.setState({minuto:text})}  />
              <TextInput style={styles.inputTime} placeholder="Segundo" value={this.state.n} onChangeText={(text) => this.setState({n:text})}  />
            </View>      	
          <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
          <TouchableHighlight style={[styles.inputUpdate, styles.update]} onPress={this.update}>
            <Text style={styles.inputText}>ATUALIZAR</Text>
          </TouchableHighlight>             
          <TouchableHighlight style={[styles.inputUpdate, styles.cancel]} onPress={this.modalOff}>
            <Text style={styles.inputText}>CANCELAR</Text>
          </TouchableHighlight>       
          </View>	
      	</Modal>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  input: {
	    height: 40,
      width: 320,
	    borderWidth: 1,
	    borderColor: '#FF0000',
	    marginTop: 10,
	    marginBottom: 10,
      alignSelf: 'center'
  },	
  inputTime:{
    height: 40,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginTop: 10,
    width: 180
  },
  areaMin:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  }, 
  table:{
    flexDirection: 'row',
     width: 270
  },
  textTable1:{
    flex: 1
  },
  imageButton:{
    marginTop: 4,
    width: 20,
    height: 20
  },
  inputUpdate:{
    height: 40,
    marginTop: 10,
    width: 140,
    borderRadius: 10    
  },
  update:{
    backgroundColor: '#fdbb1c'
  },
  cancel:{
    backgroundColor: '#8b0000'
  },
  inputText:{
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  areaUR:{
    flexDirection: 'row'
  } 
});