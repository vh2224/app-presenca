import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { Context } from '../../context/userContext';
import CardAluno from '../../components/CardAluno';
import api from '../../services/api';

export default function Alunos() {

  const { registerContent } = useContext(Context);

  const navigation = useNavigation();

  const route = useRoute();

  const { data } = route.params;

  const [alunos, setAlunos] = useState([]);
  const [isProfessor, setIsProfessor] = useState(true);
  const [conteudo, setConteudo] = useState('');
  const [link, setLink] = useState('');
  const [disciplina, setDisciplina] = useState();

  useEffect(() => {
    (async () => {
      try {
        const alunos = await api.get(`/disciplinas/${data.id}/alunos`, {
        });
        setAlunos(alunos.data);
        try {
          const verificarProfessor = await api.get(`/api/professor`, {});
          if(verificarProfessor.data.id === 2) {
            setIsProfessor(false);
          }
          }catch (e) {
            console.log(e)
          }
        } catch (e) {
            console.log(e)
        }
    })
    ();
  }, [])

  if(isProfessor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentNameDisciplina}>
          <Text style={styles.nameDisciplina}>{data.nome}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.contentAlunos}>
           <Text style={styles.textTitle}>Lista de Presença</Text>
           {alunos.map((aluno, index) => {
             return (        
             <CardAluno data={aluno} key={index} isProfessor={isProfessor}/>
             )
           })}
           <View style={styles.contentConteudo}>
             <View>
               <Text style={styles.textTitle}>Registrar Conteúdo</Text>
             </View>
             <View>
               <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Conteudo', {data: data})}>
                 <Text style={styles.textButton}>Ver todos</Text>
               </TouchableOpacity>
             </View>
           </View>
           <View style={styles.contentForm}>
             <View style={styles.form}>
               <Text style={styles.text}>Conteudo</Text>
                <TextInput 
                style={styles.textInput}
                value={conteudo}
                onChangeText={setConteudo}
                />
   
               <Text style={styles.text}>Link</Text>
               <TextInput 
                style={styles.textInput}
                value={link}
                onChangeText={setLink}
                />
   
                <Picker style={styles.selectInput} selectedValue={disciplina} onValueChange={(value) => setDisciplina(value)}> 
                <Picker.Item label="Selecione a Disciplina" value="default" />
                  <Picker.Item label={data.nome} value={data.id}/>
                </Picker>
   
               <TouchableOpacity style={styles.buttonConteudo} onPress={() => {registerContent(conteudo, link, disciplina)}}>
                   <Text style={styles.buttonText}>
                     Cadastrar
                   </Text>
               </TouchableOpacity>
             </View>
           </View>
        </ScrollView>
      </SafeAreaView>
     );
  }
  else if (!isProfessor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentNameDisciplina}>
          <Text style={styles.nameDisciplina}>{data.nome}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.contentAlunos}>
           <Text style={styles.textTitle}>Lista de Alunos</Text>
           {alunos.map((aluno, index) => {
             return (        
             <CardAluno data={aluno} key={index} isProfessor={isProfessor}/>
             )
           })}
           <View style={styles.contentConteudo}>
             <View>
               <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Conteudo', {data: data})}>
                 <Text style={styles.textButton}>Ver Conteudo</Text>
               </TouchableOpacity>
             </View>
           </View>
        </ScrollView>
      </SafeAreaView>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentNameDisciplina: {
    backgroundColor: '#781e20',
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameDisciplina: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 60
  },
  contentAlunos: {
    marginHorizontal: 15,
    marginTop: 30
  },
  textTitle: {
    color: '#781e20',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15
  },
  contentConteudo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#781e20',
    height: 35,
    width: 80,
    borderRadius: 15
  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#781e20',
    height: 35,
    width: 380,
    borderRadius: 15
  },
  textButton: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
  textButton: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold'
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