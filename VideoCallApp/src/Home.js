import 'expo-dev-client';
import { useEffect, useState, useReducer, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import Peer from 'react-native-peerjs';
import data from './data/data';
import invokeApp from 'react-native-invoke-app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = ({ navigation }) => {

  invokeApp();

  const [callId, setCallId] = useState('');
  const [isRinging, setisRinging] = useState(false);
  const acceptedCall= useRef(false);
  const [muestraUI, setUI]=useState(false);

  RNCallKeep.setup({
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      selfManaged: true,
    }
  });


  const rejectCall = ({ callID }) => {
    setUI(false);
    data.dataConnection.close();

  };

  const displayCallAndroid = () => {
    setisRinging(true);
    RNCallKeep.displayIncomingCall(callId, 'Santi2', 'Santi2', 'generic', true);
  };

  const answerCall = ({ callID }) => {
    setUI(false);
    acceptedCall.current=true;
    setisRinging(false);
    navigation.navigate('Call');
  };

  const show = ({handle,callID, name }) => {
    setUI(true);
    RNCallKeep.endCall(callId);
  }

 
  useEffect(() => {
   
    RNCallKeep.addEventListener('showIncomingCallUi', show );

    return () => {
    RNCallKeep.removeEventListener('showIncomingCallUi', show);
    }
  }, []);

  useEffect(() => {
    var localPeer = new Peer();

    localPeer.on('open', function (id) {
      console.log('My local peer id is ' + id);
      setCallId(id);
    });

    localPeer.on('connection',function(conn){
      data.dataConnection=conn;
    });

    localPeer.on('call', function (call) {
      data.call=call;
      displayCallAndroid();
    });
  }, []);

  

  return (
    <View style={styles.container}>
    {!muestraUI && 
      <Text>PAGINA DE INICIO</Text>
    }
    {muestraUI &&
    <View style={{backgroundColor:'red', flex:1}}>
     <Text>Te esta llamando </Text>
     <Button title='aceptar' onPress={answerCall}/>
     <Button title='rechazar' onPress={rejectCall}/>
    </View>
    }
    </View>
    
  );
};

export default Home;
