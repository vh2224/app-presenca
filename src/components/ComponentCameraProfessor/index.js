import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native'

export default function ComponentCameraProfessor() {
  
  const navigation = useNavigation();
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera</Text>;
  }

  async function take() {
    if (ref) {
      const opt = {
        quality: 0.8,
        base64: true,
        flexOrientation: true,
        forceUpOrientation: true,
      }
      const data =  await ref.current.takePictureAsync(opt);
      setCaptured(data.uri);
      setOpen(true);
      await MediaLibrary.saveToLibraryAsync(data.uri);
    }
  }

 return (
   <SafeAreaView>
       <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonFlip} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.text}> Voltar </Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.buttonTake}
            onPress={take}>
            <Text style={styles.text}> Take </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open}>
        <View style={styles.contentPhoto}>
          <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
            <Text style={styles.text}> Close </Text>
          </TouchableOpacity>
          <Image style={styles.img} source={{uri: captured}} />
        </View>
      </Modal>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
    }, 
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: 30
    },
    buttonFlip: {
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    buttonTake: {
        bottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    contentPhoto: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    img: {
        width: '75%',
        height: '65%',
    },
    buttonClose: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50
    },
    buttonConfirm: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50
    },
    text: {
        color: '#FFF'
    }
});