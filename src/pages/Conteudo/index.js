import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import CardConteudo from '../../components/CardConteudo';
import { useRoute } from "@react-navigation/native"

export default function Conteudo() {

  const route = useRoute();

  const { data } = route.params;

 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.contentArea}>
       <Text style={styles.title}>Conteúdos da Disciplina</Text>
       <View style={styles.contentConteudo}>

         {data.conteudos.map((conteudo, index) => {
           return (
            <CardConteudo data={conteudo} key={index}/>
           )
         })}
       </View>
     </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15
    },
    contentConteudo: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      color: '#781e20',
      fontSize: 22,
      fontWeight: 'bold'
    },
    contentArea: {
      marginTop: 20
    }
})