import 'expo-dev-client';
import { useEffect, useState, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import Peer from 'react-native-peerjs';
import { mediaDevices } from 'react-native-webrtc';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Home = ({ navigation }) => {
  const [localStream, setlocalStream] = useState(null);
  const [remoteStream, setremoteStream] = useState(null);
  const [callId, setCallId] = useState('');
  const [isRinging, setisRinging] = useState(false);
  const [acceptCall, setAcceptCall] = useState(false);

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
    setAcceptCall(true);
    RNCallKeep.endCall(callId);
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
      console.log('ENTRO');
      displayCallAndroid();
      if(acceptCall)
      {
        console.log('Entro despues de aceptar');
        mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(function (stream) {
          setlocalStream(stream);
          call.answer(stream);

          call.on('stream', function (remoteStream) {
            setremoteStream(remoteStream);
          });
        });
        navigation.navigate('Call', {locStream: localStream, remStream: remoteStream});
      }
      console.log('Paso');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>PAGINA DE INICIO</Text>
    </View>
  );
};

export default Home;
