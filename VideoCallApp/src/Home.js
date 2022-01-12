import 'expo-dev-client';
import { useEffect, useState, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import Peer from 'react-native-peerjs';
import data from './data/data'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = ({ navigation }) => {

  const [callId, setCallId] = useState('');
  const [isRinging, setisRinging] = useState(false);


  RNCallKeep.setup({
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
    }
  });


  const endCall = ({ callID }) => {
    RNCallKeep.endCall(callId);
    //data.call.close();
  };

  const displayCallAndroid = () => {
    setisRinging(true);
    RNCallKeep.displayIncomingCall(callId, 'Santi', 'Santi', 'generic', true);

    setTimeout(() => {
      if (isRinging) {
        setisRinging(false);
        RNCallKeep.reportEndCallWithUUID(callId, 6);
      }
    }, 15000);
  };

  const answerCall = ({ callID }) => {
    setisRinging(false);
    RNCallKeep.endCall(callId);
    navigation.navigate('Call');
  };

 
  useEffect(() => {
    RNCallKeep.addEventListener('endCall', endCall);
    RNCallKeep.addEventListener('answerCall', answerCall);

    return () => {
    RNCallKeep.removeEventListener('endCall', endCall);
    RNCallKeep.removeEventListener('answerCall',answerCall);
    }
  }, []);

  useEffect(() => {
    var localPeer = new Peer();

    localPeer.on('open', function (id) {
      console.log('My local peer id is ' + id);
      setCallId(id);
    });

    localPeer.on('call', function (call) {
      data.call=call;
      displayCallAndroid();
    });
  }, []);

  

  return (
    <View style={styles.container}>
      <Text>PAGINA DE INICIO</Text>
    </View>
  );
};

export default Home;
