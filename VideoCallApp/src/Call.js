import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import Peer from 'react-native-peerjs';
import { useEffect, useState, useReducer } from 'react';
import RNCallKeep, { AnswerCallPayload } from 'react-native-callkeep';


export default function Call(navigation, route) {

  const [localStream, setlocalStream] = useState(null);
  const [remoteStream, setremoteStream] = useState(null);
  
  setlocalStream(route.params.locStream);
  setremoteStream(route.params.remStream);

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
