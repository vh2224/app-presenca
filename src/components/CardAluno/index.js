import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Context } from '../../context/userContext';

const semIcone = "https://i.pinimg.com/originals/4b/3e/02/4b3e0279e016cc145240de10c8a06fb6.png"

export default function CardAluno({data, isProfessor}) {

    const {registerPresence} = useContext(Context);

 return (
   <View style={styles.container}>
       <View style={styles.studentData}>
            <View style={styles.contentFoto}>
                <Image  
                    source={{
                        uri: `${data.foto !== "" ? data.foto : semIcone}`,
                      }}
                    style={styles.foto}
                />
            </View>
           <View style={styles.contentInformacoes}>
                <Text style={styles.name}>{data.nome}</Text>
                <Text style={styles.matricula}>{data.matricula}</Text>
           </View>
       </View>
       {isProfessor && 
            data.presenca === null &&
                <View style={styles.contentButton}>
                        <TouchableOpacity style={styles.button1} onPress={() => {registerPresence(false, data.id, data.nome, data.matricula, data.senha)}}>
                            <Text style={styles.buttonText}>F</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => {registerPresence(true, data.id, data.nome, data.matricula, data.senha)}}>
                            <Text style={styles.buttonText}>P</Text>
                        </TouchableOpacity>
                </View>
        }
        {isProfessor && 
        
            data.presenca === true && 
                <View style={styles.button3}>
                    <Text style={styles.buttonText}>Presente</Text>
                </View>
        }
        {isProfessor && 
        
            data.presenca === false && 
                <View style={styles.button4}>
                    <Text style={styles.buttonText}>Ausente</Text>
                </View>
        }
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        elevation: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20
    },
    studentData: {
        marginLeft: 20,
        flexDirection: 'row'
    },
    name: {
        color: '#781e20',
        fontSize: 16,
        fontWeight: 'bold'
    },
    matricula: {
        color: '#ddd',
        fontSize: 14,
        fontWeight: '700'
    },
    button1: {
        backgroundColor: '#781e20',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 60 / 2
    },
    button2: {
        backgroundColor: 'green',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 60 / 2
    },
    button3: {
        backgroundColor: 'green',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 40,
        borderRadius: 60 / 2
    },
    button4: {
        backgroundColor: '#781e20',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 40,
        borderRadius: 60 / 2
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    contentButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    foto: {
        marginRight: 10,
        width: 50,
        height: 50,
        borderRadius: 60 / 2
    },
    contentFoto: {
        marginRight: 10
    },
    contentInformacoes: {
        justifyContent: 'center'
    }
})