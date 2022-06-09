import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import api from '../../services/api';
import { Context } from '../../context/userContext';

export default function CadastroDisciplina() {

    const {registerDiscipline} = useContext(Context);

    const [nomeDisciplina, setNomeDisciplina] = useState('');
    const [codigoDisciplina, setCodigoDisciplina] = useState();
    const [aluno, setAluno] = useState();
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            const alunos = await api.get(`/alunos`, {
            });
            setAlunos(alunos.data);
            
            } catch (e) {
                console.log(e)
            }
        })
        ();
      }, [])

 return (
   <SafeAreaView style={styles.container}>
       <Text style={styles.textTitle}>Cadastro de Disciplina</Text>
       <View style={styles.contentForm}>
          <View style={styles.form}>
            <Text style={styles.text}>Disciplina:</Text>
            <TextInput 
            style={styles.textInput}
            value={nomeDisciplina}
            onChangeText={setNomeDisciplina}
            />

            <Text style={styles.text}>Codigo:</Text>
            <TextInput 
            style={styles.textInput}
            value={codigoDisciplina}
            onChangeText={setCodigoDisciplina}
            />

            <Text style={styles.text}>Aluno:</Text>
            <Picker style={styles.selectInput} selectedValue={aluno} onValueChange={(aluno) => setAluno(aluno)}> 
                {alunos.map((aluno) => {
                    return (
                        <Picker.Item label={aluno.nome} value={aluno.id} key={aluno.id}/>
                    )
                })}
            </Picker>

            <TouchableOpacity style={styles.buttonConteudo} onPress={()=> {registerDiscipline(nomeDisciplina, codigoDisciplina, aluno)}}>
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
    selectInput: {
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "#FFF",
        color: "#000",
        borderRadius: 6,
        margin: 5,
        padding: 5,
        fontWeight: "bold"
      },
})