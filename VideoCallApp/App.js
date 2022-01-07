import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import Peer from 'react-native-peerjs';
import { useEffect, useState } from 'react';

export default function App() {

  const [localStream, setlocalStream] = useState(null);
  const [remoteStream, setremoteStream] = useState(null);
  useEffect(() => {

    var localPeer= new Peer();

    localPeer.on('open', function(id){
      console.log('My local peer id is '+id);
    }); 

    localPeer.on('call', function(call){

      mediaDevices.getUserMedia({audio:true, video:true}).then(function(stream){
        setlocalStream(stream);
        call.answer(stream);

        call.on('stream', function(remoteStream){
          setremoteStream(remoteStream);
        })
      })
      
    });

    

  }, []);

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
