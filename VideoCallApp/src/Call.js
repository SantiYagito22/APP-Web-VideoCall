import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RTCView, mediaDevices} from 'react-native-webrtc';
import { useEffect, useState, useReducer } from 'react';
import data from './data/data';



export default function Call() {

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

useEffect(() => {
  mediaDevices.getUserMedia({ audio: true, video: true }).then(function(stream){

    setTimeout(() => {
      setLocalStream(stream);
      data.call.answer(stream);
    
      data.call.on('stream', function (remoteStream) {
        setRemoteStream(remoteStream);
      });
    }, 1500);
   
  });
},[]); 
  


  return (
    <View style={styles.container}>
      {localStream &&
      <RTCView
       streamURL= {localStream.toURL()}
       style={styles.stream}
      />
      }
      {remoteStream &&
      <RTCView
       streamURL= {remoteStream.toURL()}
       style={styles.stream}
      />
      }
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex:1
  }
});
