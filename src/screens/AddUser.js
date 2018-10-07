import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableHighlight, Switch } from 'react-native';
import firebase from '../FirebaseCon';

export default class AddUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeInput: '',
      whatsapp: '',
      email:'',
      n:0,
      botao:'INICIAR',
      minuto:0,
      areaManual: false
    };
    this.timer = null;

    this.enviar = this.enviar.bind(this);
    this.goTime = this.goTime.bind(this);
    this.limpar = this.limpar.bind(this);

    console.disableYellowBox = true;
  }

  enviar() {
    if(this.state.nomeInput.length > 0) {
      let players = firebase.database().ref('players');
      let chave = players.push().key;

      players.child(chave).set({
        nome:this.state.nomeInput,
        score: (parseInt(this.state.minuto) * 60) + (parseInt(this.state.n)),
        tel:this.state.whatsapp,
        email:this.state.email
      }); 

      this.props.navigation.navigate('Home');
    } 
  }

  limpar() {
    if(this.timer != null) {
      clearInterval(this.timer);
      this.timer = null
    }

    let s = this.state;
    s.n = 0;
    s.minuto = 0;
    s.botao = "INICIAR";
    this.setState(s);
  }

  goTime() {
    let s = this.state;

    if(this.timer != null) {
      // PARAR O TIMER
      clearInterval(this.timer);
      this.timer = null;
      s.botao = "INICIAR";
    } else {
      // COMEÇAR O TIMER
      this.timer = setInterval(() => {
        var segs = this.state;
        if(segs.n == 60) {
          segs.minuto++;
          segs.n = 0
        }
        segs.n++;
        this.setState(segs);
      }, 1000);

      s.botao = "PARAR";
    }

    this.setState(s);
  }

    render() {

      return (
        <View style={styles.container}>
            <ScrollView>
            <TextInput style={styles.input} onChangeText={(nomeInput) => this.setState({nomeInput})} />
            <View style={styles.area}>
              <TextInput style={styles.inputTime} placeholder="Telefone" onChangeText={(whatsapp) => this.setState({whatsapp})} />
              <TextInput style={styles.inputTime} placeholder="Email" onChangeText={(email) => this.setState({email})} />
            </View>
            <Text>Tempo</Text>
            <View style={styles.areaManual}>
            <Switch style={styles.switch} value={this.state.areaManual} onValueChange={(v)=>this.setState({areaManual:v})} />
            <Text style={{lineHeight: 25}}>Inserir Manual</Text>
            </View>
            {this.state.areaManual &&
              <View style={styles.area}>
                <TextInput style={styles.inputTime} placeholder="Minuto" onChangeText={(text) => this.setState({minuto:text})}  />
                <TextInput style={styles.inputTime} placeholder="Segundo" onChangeText={(text) => this.setState({n:text})}  />
              </View>
            }          
            <Text style={styles.time}>{this.state.minuto + ':' + this.state.n} </Text>
            <View style={styles.area}>
            <TouchableHighlight onPress={this.goTime} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.botao}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.limpar}>
              <Text style={styles.buttonText}>LIMPAR</Text>
            </TouchableHighlight> 
            </View>
              <TouchableHighlight style={styles.enviar} onPress={this.enviar}>
                <Text style={styles.buttonText}>ENVIAR</Text>
              </TouchableHighlight>
          </ScrollView>
        </View>
      );
    }  
}

const styles = StyleSheet.create({
  container:{
    margin: 20,
    flex: 1
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginTop: 10,
    marginBottom: 10
  },
  inputTime:{
    height: 40,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginTop: 10,
    width: 150
  },
  button:{
    backgroundColor: '#635f62',
    padding:20,
    borderRadius: 20,
    marginTop: 10,
    width: 150,
    justifyContent:'center',
    alignItems:'center',    
  },
  time: {
    color:'#baa07a',
    fontSize: 80,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  area:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  enviar:{
    backgroundColor: '#667937',
    padding: 20,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  inputInfo:{
    height: 40,
    borderWidth: 1,
    borderColor: '#FF0000',
    marginTop: 10,
    width: 180
  },  
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF'
},
  switch:{
    alignSelf: 'flex-start'
  },
  areaManual:{
    flexDirection: 'row',
    marginBottom: 5
  }
});