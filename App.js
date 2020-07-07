import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home'
import Employee from './screens/employee'
import Profile from './screens/profile'
import { NavigationContainer } from '@react-navigation/native';
import{createStackNavigator}from '@react-navigation/stack'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import Reducers from './reducers/reducers'


const store=createStore(Reducers);
const Stack = createStackNavigator();

 const App=()=> {
  return (
    <View style={styles.container}>
<Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={
        {
          title:'Home',
          headerTintColor:'white',
          headerStyle:{
          backgroundColor:"#0390fc"}
        }
      } />
      <Stack.Screen name="Employee" component={Employee} options={
        {
          title:'Create Employee',
          headerTintColor:'white',
          headerStyle:{
          backgroundColor:"#0390fc"}
        }
      } />
      <Stack.Screen name="Profile" component={Profile} options={
        {
          title:'Profile',
          headerTintColor:'white',
          headerStyle:{
          backgroundColor:"#0390fc"}
        }
      } />
     
    </Stack.Navigator>      
    </View>
  );
}

export default ()=>{

  return(
    <Provider store={store}>
       <NavigationContainer>
     <App/>
   </NavigationContainer>
    </Provider>
  

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e1e1',
   
  },
});
