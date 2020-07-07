import React,{useState}from 'react';
import { StyleSheet, Text, View ,Image,FlatList,Modal,Linking,Platform,Alert} from 'react-native';
import {TextInput,Button,Title,Card} from 'react-native-paper'
import {LinearGradient} from 'expo-linear-gradient'
import {MaterialIcons,Entypo} from '@expo/vector-icons'

const Profile=(props)=>{
    console.log(props);
    const {_id,name,email,phone,picture,pos,salary}=props.route.params.item;
 
    const openDial=()=>{
        console.log(Platform.OS)
        console.log(Platform.Version)

        if(Platform.OS==='android')
        Linking.openURL(`tel:${phone}`);
        else Linking.openURL(`telprompt:${phone}`)
    



    }

    const openMsg=()=>{
        console.log(Platform.OS)
        console.log(Platform.Version)

        if(Platform.OS==='android')
        Linking.openURL(`sms:${phone}`);
        else Linking.openURL(`sms:${phone}`)
    



    }

    const deleteEmployee=()=>{

        Alert.alert(                                              
            'Alert Title',
            `Are you sure you want to fire ${name}`,
            [
              {text: 'YES', onPress: () =>  fetch("http://44cfbc25.ngrok.io/delete",{  //if yes delete the employee
                method:"post",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                   id:_id
             
                })
             
             
             
               })
               .then(res=>res.json())
               .then(del=>{
               Alert.alert(`${del.name} has been fired.Refresh to see the changes`)
               props.navigation.navigate('Home')
                 })
               .catch(err=>Alert.alert(`Somethingwent wrong`))
             
                },
              {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},  //else cancel the deletion
            ]
          );

      




    }
    return(

     <View style={{flex:1}}>

    <LinearGradient colors={["#0033ff","#6bc1ff"]} style={{height:"20%"}}/>
    <View style={{alignItems:'center',marginTop:-65}}>
    <Image style={{height:130,width:130,borderRadius:65}} source={{uri:picture}}></Image>
    </View>
    <View style={{alignItems:'center',margin:8}}>
        <Title>{name}</Title>
        <Title style={{fontSize:15}}>{pos}</Title>
    </View>
   <Card style={{margin:5}} onPress={()=>Linking.openURL(`mailto:${email}`)}>
    <View style={{flexDirection:'row',padding:5}}>
        <MaterialIcons name='email' size={32} color="#0390fc" />
        <Title style={{fontSize:15,marginLeft:10}}>{email}</Title>

    </View>

   </Card>
   <Card style={{margin:5}} onPress={()=>openDial()}>
    <View style={{flexDirection:'row',padding:5}}>
        <Entypo name='phone' size={32} color="#0390fc" />
        <Title style={{fontSize:15,marginLeft:10}}>{phone}</Title>

    </View>
    

   </Card>
   <Card style={{margin:5}} onPress={()=>openMsg()}>
    <View style={{flexDirection:'row',padding:5}}>
        <MaterialIcons name='message' size={32} color="#0390fc" />
        <Title style={{fontSize:15,marginLeft:10}}>{phone}</Title>

    </View>
    </Card>
   <Card style={{margin:5}}>
    <View style={{flexDirection:'row',padding:5}}>
        <MaterialIcons name='attach-money' size={32} color="#0390fc" />
        <Title style={{fontSize:15,marginLeft:10}}>{salary}</Title>

    </View>

   </Card>

  <View style={{flexDirection:'row' ,justifyContent:'space-around',padding:10}}>
  <Button icon="account-edit" mode="contained"  theme={{colors:{primary:'#0390fc'}}} onPress={() =>
     props.navigation.navigate('Employee',{_id,name,salary,email,phone,picture,pos})}>
    Edit Employee
  </Button><Button icon="delete" mode="contained"  theme={{colors:{primary:'#0390fc'}}} onPress={() =>deleteEmployee()}>
    Fire Employee
  </Button>


  </View>
    

     </View>

    )
}
export default Profile