import React,{useState}from 'react';
import { StyleSheet, Text, View ,Image,FlatList,Modal, CameraRoll,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';

import * as Permissions from 'expo-permissions';


const Employee=(props)=>{


      const getdetails=(type)=>{
        
        
        if(props.route.params)
        {
             if(type==='name')
             return props.route.params.name
             else if(type==='pos')
             return props.route.params.pos
             else if(type==='picture')
             return props.route.params.picture
            else  if(type==='email')
             return props.route.params.email
            else  if(type==='salary')
             return props.route.params.salary
             else if(type==='phone')
             return props.route.params.phone

        }
        else 
        return "";
      }
   
const [name,setName]=useState(getdetails("name"));
const [phone,setPhone]=useState(getdetails("phone"));
const [email,setMail]=useState(getdetails("email"));
const [salary,setSalary]=useState(getdetails("salary"));
const [pos,setPos]=useState(getdetails("pos"));
const [picture,setPicture]=useState(getdetails("picture"));

const [modal,setModal]=useState(false);

const Submitdata=()=>{

  if(props.route.params)   //we need to update employee
  {    
    fetch("http://44cfbc25.ngrok.io/update",{   //after 8 hours you need to generate new domain from ngrok.its valid only for 8 hours
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
          id:props.route.params._id,
          name,
          email,      //same name in schemas an here above thats why only one thing
          phone,
          picture,
          pos,
          salary
   
      })
   
   
   
     })
     .then(res=>res.json())
     .then(data=>{console.log(data)
     Alert.alert(`${data.name} is successfully updated.Refresh to see the changes`)
     props.navigation.navigate('Home')})
     .catch(err=>Alert.alert('Something went wrong'))
   
    
   
       



  }
else{    //we need to add new employee


  if(name==""||email==''||phone==''||salary==''||pos=='')
  Alert.alert('Fill all the inputs first')
  else if(picture=='')
  Alert.alert('Select and Upload Image')
  else{
  fetch("http://44cfbc25.ngrok.io/send",{
   method:"post",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({
       name,
       email,      //same name in schemas an here avove thats why only one thing
       phone,
       picture,
       pos,
       salary

   })



  })
  .then(res=>res.json())
  .then(data=>{
  Alert.alert(`${data.name} is successfuly saved. Please Refresh to see the changes`)
  props.navigation.navigate('Home')})
  .catch(err=>Alert.alert('Something went wrong'))


  }

  }
}

const Gallery=async()=>{
    const obj=await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(obj.granted)
    {
          let data=await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.7
              

          })
          console.log(data)
          if(!data.cancelled)
          {

              let newfile={
                  uri:data.uri,
                  type:`test/jpg`,
                   name:`test.jpg`
              }
            handle(newfile)
          }



    }
    else{

        Alert.alert('You dont have required permission')
    
        }
}
const Camera=async()=>{
    const obj=await Permissions.askAsync(Permissions.CAMERA);
    console.log(obj)
    if(obj.granted)
    {
          let data=await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.All  ,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.7
              

          })
           if(!data.cancelled)
           {  console.log('entered')

               let newfile={
                   uri:data.uri,
                   type:`test/jpg`,
                   name:`test.jpg`
               }
             handle(newfile)
           }


    }
    else{

    Alert.alert('You dont have required permission')

    }
}
const handle=(image)=>{
  const data=new FormData();
  data.append('file',image)
  data.append('upload_preset','employee-app'),
  data.append('cloud_name','dde0f77jl')


 

  fetch("https://api.cloudinary.com/v1_1/dde0f77jl/image/upload",{
      method:"post",
      body:data,


  }

  ).then(res=>res.json())
  .then(data=>{console.log(data)
      setPicture(data.url)
      setModal(false)
  })
}
return(
  

<View style={{flex:1}}>
  
<TextInput style={styles.input}
        label='Name'
        value={name}
        
        mode="outlined"
        onChangeText={text => setName(text)}
      />
      <TextInput style={styles.input}
        label='Email'
        value={email}
        
        mode="outlined"
        onChangeText={text => setMail(text)}
      />
      <TextInput style={styles.input}
        label='phone'
        value={phone}
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={text => setPhone(text)}


      />
      <TextInput style={styles.input}
        label='Salary'
        value={salary}
        
        mode="outlined"
        onChangeText={text => setSalary(text)}
      />
      <TextInput style={styles.input}
        label='pos'
        value={pos}
        
        mode="outlined"
        onChangeText={text => setPos(text)}
      />
      <Button  style={{margin:5}}icon={picture==""?"upload":"check"} mode="contained" theme={{colors:{primary:'#0390fc'}}} onPress={() => setModal(true)}>
    upload image
  </Button>
  {props.route.params?<Button  style={{margin:5}}icon="update" mode="contained" theme={{colors:{primary:'#0390fc'}}} onPress={() => Submitdata()}>
    update
  </Button>:<Button  style={{margin:5}}icon="content-save" mode="contained" theme={{colors:{primary:'#0390fc'}}} onPress={() => Submitdata()}>
    save
  </Button>}
  
  <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={()=>setModal(false)}>

  <View style={{position:"absolute" ,bottom:2,width:"100%",backgroundColor:"white"}}>
      <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
      <Button icon="camera" mode="contained"  theme={{colors:{primary:'#0390fc'}}} onPress={() =>Camera()}>
    camera
  </Button>
  <Button icon="camera" mode="contained"  theme={{colors:{primary:'#0390fc'}}} onPress={() => Gallery()}>
    gallery
  </Button>
          
      </View>
      
      <Button   theme={{colors:{primary:'#0390fc'}}} onPress={() => setModal(false)}>
    cancel
  </Button>
  

  </View>
  </Modal>
</View>


)




}
const styles=StyleSheet.create({
   input:{
       margin:7
   }
    
    })
export default Employee