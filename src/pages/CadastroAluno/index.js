import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Context } from '../../context/userContext';

export default function CadastroAluno() {

    const { registerStudent } = useContext(Context);

    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState();
    const [senha, setSenha] = useState('');

 return (
   <SafeAreaView style={styles.container}>
       <Text style={styles.textTitle}>Cadastro de Aluno</Text>
       <View style={styles.contentForm}>
          <View style={styles.form}>
            <Text style={styles.text}>Nome</Text>
            <TextInput 
            style={styles.textInput}
            value={nome}
            onChangeText={setNome}
            />

            <Text style={styles.text}>Matrícula</Text>
            <TextInput 
            style={styles.textInput}
            value={matricula}
            onChangeText={setMatricula}
            />

            <Text style={styles.text}>Senha</Text>
            <TextInput 
            style={styles.textInput}
            value={senha}
            onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.buttonConteudo} onPress={()=> {registerStudent(nome, matricula, senha)}}>
                <Text style={styles.buttonText}>
                  Cadastrar
                </Text>
            </TouchableOpacity>
          </View>
        </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    textTitle: {
        color: '#781e20',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15
    },
    contentForm: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#ddd',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 50,
        elevation: 5
    },
    form: {
        width: "100%",
        height: "auto",
        marginTop: 20,
        padding: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold", 
        padding: 5,
        color: '#781e20'
    },
    textInput: {
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "#FFF",
        color: "#000",
        borderRadius: 6,
        margin: 5,
        padding: 5,
    },
    buttonConteudo: {
        margin: 30,
        backgroundColor: "#781e20",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: 'bold'
    },
})