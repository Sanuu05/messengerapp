import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_400Regular_Italic,
  Alegreya_500Medium,
  Alegreya_500Medium_Italic,
  Alegreya_700Bold,
  Alegreya_700Bold_Italic,
  Alegreya_800ExtraBold,
  Alegreya_800ExtraBold_Italic,
  Alegreya_900Black,
  Alegreya_900Black_Italic
} from '@expo-google-fonts/alegreya'
import AppLoading from 'expo-app-loading';
import Bottonav from './components/Bottonav';
import Message from './components/Message';
const Stack = createNativeStackNavigator();
const store = createStore(reducers, compose(applyMiddleware(thunk)))
import { useEffect } from 'react';
import CreateGroup from './components/CreateGroup';
import Login from './screens/Login';

export default function App() {

  // const userId = useSelector((state => state?.user?.user?.user?._id))
  // useEffect(()=>{
  //   socket.emit('authenticate', userId);

  // },[])
  let [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_400Regular_Italic,
    Alegreya_500Medium,
    Alegreya_500Medium_Italic,
    Alegreya_700Bold,
    Alegreya_700Bold_Italic,
    Alegreya_800ExtraBold,
    Alegreya_800ExtraBold_Italic,
    Alegreya_900Black,
    Alegreya_900Black_Italic

  })
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login'component={Login} options={{
          headerShown:false
        }}  />
        <Stack.Screen name="Bottom" component={Bottonav} options={{
          headerShown:false
        }} />
         <Stack.Screen name="Msg" component={Message} options={{
          headerShown:false
        }} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} options={{
          headerShown:false
        }} />
        
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
