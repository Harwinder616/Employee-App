import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,Image,FlatList,Alert} from 'react-native';
import {Card,FAB, TextInput} from 'react-native-paper'

import{useSelector,useDispatch} from 'react-redux'
const Home=(props)=>{
 
  //const [data,setData]=useState([]);
  //const [loading,setLoading]=useState(true)

  const dispatch=useDispatch()
  const {data,loading}=useSelector((state)=>{
  return state




  })
  const [txt,setText]=useState('');





  useEffect(()=>{
    console.log('fired')
   fetchdata()

},[txt])







  const fetchdata=()=>{
    fetch('http://44cfbc25.ngrok.io').then(data=>data.json()).then(res=>{
        console.log('txt:'+txt)
    let ans=res.filter((item)=>{
                
        let check=item.name.toLowerCase().includes(txt.toLowerCase())
        console.log(check)
        return check





    })



    //setData(ans)
    //setLoading(false)
     dispatch({type:'ADD_DATA',payload:ans})
     dispatch({type:'SET_LOADING',payload:false})


}).catch(err=>{
    Alert.alert('Something went wrong')
})

  }
  
 
    
    const list=((item)=>{
        return(
                 
            
            <Card style={styles.mycard} key={item.id} onPress={()=>props.navigation.navigate('Profile',{item})}>
            <View style={{flexDirection:'row'}}>
            <Image style={{height:60,width:60,borderRadius:30,marginLeft:-8}} source={{uri:item.picture}}></Image>
        <View style={{marginTop:15,marginLeft:10}}><Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.pos}</Text>
        
        </View>
        </View>
        </Card>


        )


    })


       const sortdata=()=>{

        data.sort(function(a,b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 
        })

    }

    
return(
    

    <View style={{flex:1}}>
        {sortdata()}


          
<TextInput style={{marginTop:0}}
        label='Search Employee'
        value={txt}
        
        mode="outlined"
        onChangeText={text => {setText(text)
            
            
            fetchdata()

           /* setData(data.filter((item)=>{
                
                let check=item.name.toLowerCase().includes(txt.toLowerCase())
                return check





            }))
        
        
        */
        }}/>


{(!loading &&data.length===0)&&<Text style={{fontSize:30,alignContent:'center',textAlign:'center',marginTop:250}}>Currently No Employees</Text>}
          

         <FlatList
  data={data}
  renderItem={((data) =>{ return list(data.item)})}
  refreshing={loading}
  onRefresh={()=>fetchdata()}
  keyExtractor={item=>item._id}
/>
       
<FAB onPress={()=>props.navigation.navigate("Employee")}
    style={styles.fab}
    small={false}

    theme={{colors:{accent:'#0390fc'}}}    icon="plus"
   
  />


    </View>





)

}
const styles=StyleSheet.create({
mycard:{padding:15,
    marginTop:10,
   


},
text:{
    fontSize:15,
    
},
fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }

})



export default Home;