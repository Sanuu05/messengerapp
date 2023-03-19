
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import PrimaryButton from './PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, loguser, userSign } from '../action/user'
// import { app, provider } from '../../src/firebase'
import { app, provider } from '../firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'


// import { KeyboardAvoidingView } from 'react-native-web';
const { width, height } = Dimensions.get('screen')

const Login = () => {
    const [login, setlogin] = useState(true)
    // const dispatch = useDispatch()
    const [token, settoken] = useState()
    const [forget, setforget] = useState(false)
    const [data, setdata] = useState({
        email: "", password: "", name: "", cpassword: ""
    })
    const[loading,setloading] = useState(false)
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const [active,setactive] = useState(true)
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
      useFocusEffect(
        React.useCallback(() => {
            setactive(true)
          wait(8000).then(() => {
            setactive(false)
        });
    
          
        }, [dispatch])
    
    
      )
    const postData = () => {
        if (data?.email && data?.password) {
            setloading(true)
            console.log(loading)
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // sendEmailVerification(user)
                    // ...
                    console.log(userCredential.user?.emailVerified)
                    if (userCredential?.user?.emailVerified) {
                        // toast.success('Login sucessful')
                        // window.location.reload()
                        // alert('ehlloo')
                        dispatch(loguser({ email: userCredential.user.email }))
                        // dispatch(loadUser())
                        setloading(false)


                    } else {
                        // toast.error("Email is not verified")
                        alert(error?.message)
                        // setloading(false)
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setloading(false)
                    // ..
                    alert(error?.message)
                    // toast.error("Check details")
                    // console.log
                });

        } else {
            // toast.error('Enter all the field')
        }
        // dispatch(loguser({ email: data.email, password: data?.password }))
        // dispatch(loadUser())

    }
    const auth = getAuth()
    const user = auth.currentUser
    const submit = () => {
        // dispatch(userSign(data))
        if(data.email && data.name && data.cpassword && data.password){
        if (data.password === data.cpassword) {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    sendEmailVerification(user)
                    // dispatch(userNormalSign(userdata))
                    dispatch(userSign({email:data.email.toLowerCase(),name:data.name}))
                    // ...
                    console.log(userCredential)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    alert(error?.message)
                    // toast.error('Email already in use')
                });

        }
        else{
            alert('Enter same password')
        }
    }else{
        alert('Fill All field')
    }

    }
    const succtok = useSelector((state) => state.user.token)
    console.log("tok",succtok)

    const succ = useSelector((state) => state.user.user)
    // console.log("vbvb",succ?.user)cls
    const succ1 = useSelector((state) => state.user.signin)
    useFocusEffect(
        React.useCallback(() => {
              dispatch(loadUser())
            
            
        }, [dispatch, succtok])


    )
    useFocusEffect(
        React.useCallback(() => {
            if (succ?.user) {
                navigate.navigate('Bottom')
            }else{
                navigate.navigate('Login')
            }
        }, [dispatch, succ])


    )
    useFocusEffect(
        React.useCallback(() => {
            if (succ1) {
                setlogin(true)
            }
        }, [dispatch, succ1])


    )
    

    const forgetpass = (e) => {
        // e.preventDefault()
        if(data.email){
            sendPasswordResetEmail(auth, data.email)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                console.log(userCredential)
                alert('Reset password link has been send to email')
                setforget(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
                console.log(error)
            });
        }else{

        }
        
    }
    if(active){
        return <View style={{height:height,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#32CCFE" />
   </View>

    }else{
    return (
        
        <SafeAreaView style={{
            flex: 1
        }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled={true}
                style={{ flexGrow: 1 }} >
                <View style={{ height: height - 50, backgroundColor: 'white', position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }} >
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0, backgroundColor: 'white', flex: 1 }}>

                        {
                            login ? <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '85%', alignContent: 'center', paddingVertical: 20, borderRadius: 15 }}>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{
                                        uri: "https://www.aurigait.com/resources/files/2017/01/256-256-c8b6cbadb620f8b3f588bf53464c8ab9.png"
                                    }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                                </View>

                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 25 }}>Hello</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium' }}>{forget ? "Reset Password" : 'Sign into your Account'} </Text>
                                <TextInput placeholder='Email' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, email: text })} />
                                {
                                    forget ? null : <TextInput placeholder='Password' secureTextEntry={true} style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, password: text })} />
                                }

                                {/* <PrimaryButton title="Login" onpress={submit} /> */}
                                {
                                    forget ? <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        
                                            <TouchableOpacity activeOpacity={0.8} onPress={forgetpass} >
                                            <View style={styles.btncontainer} >
                                                <Text style={{ fontSize: 12, fontFamily: 'Alegreya_700Bold', color: 'white' }}>Reset Password</Text>

                                            </View>
                                        </TouchableOpacity>
                                        
                                        
                                    </View> :
                                    
                                        loading? <ActivityIndicator size="large" color="#32CCFE" />:
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={postData} >
                                                <View style={styles.btncontainer} >
                                                    <Text style={{ fontSize: 18, fontFamily: 'Alegreya_700Bold', color: 'white' }}>Login</Text>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                }



                            </View> : <View style={{ backgroundColor: 'white', width: '85%', alignContent: 'center', paddingVertical: 20, borderRadius: 15 }}>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{
                                        uri: "https://www.aurigait.com/resources/files/2017/01/256-256-c8b6cbadb620f8b3f588bf53464c8ab9.png"
                                    }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                                </View>
                                <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Alegreya_700Bold' }}>Hello</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium' }}>SignUp your Account</Text>
                                <TextInput placeholder='Name' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, name: text })} />
                                <TextInput placeholder='Email' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, email: text })} />
                                <TextInput placeholder='Password' secureTextEntry={true} style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, password: text })} />
                                <TextInput placeholder='Confirm Password' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, cpassword: text })} />
                                {/* <TextInput placeholder='Mobile' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, mobile: text })} /> */}
                                {/* <PrimaryButton title="Signup" onpress={sign} /> */}
                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                    <TouchableOpacity activeOpacity={0.8} onPress={submit} >
                                        <View style={styles.btncontainer} >
                                            <Text style={{ fontSize: 18, fontFamily: 'Alegreya_700Bold', color: 'white' }}>Signup</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {
                            forget ? <Text style={{ textAlign: 'center', marginTop: 1, fontFamily: 'Alegreya_400Regular', fontSize: 15 }}>Go back to Login page <Text onPress={() => setforget(false)} style={{ color: 'orange', fontFamily: 'Alegreya_700Bold' }}>Click here</Text></Text> :
                                <View>
                                    {
                                        login ? <Text style={{ textAlign: 'center', marginTop: 1, fontFamily: 'Alegreya_400Regular', fontSize: 15 }}>Forget Password? <Text onPress={() => setforget(true)} style={{ color: 'orange', fontFamily: 'Alegreya_700Bold' }}>Reset</Text></Text> :
                                            null
                                    }
                                    {
                                        login ? <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Alegreya_700Bold', fontSize: 18 }}>Dont have an Account? <Text onPress={() => setlogin(false)} style={{ color: 'orange' }}>Sign Up</Text></Text> :
                                            <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Alegreya_700Bold', fontSize: 18 }}>Have an Account? <Text onPress={() => setlogin(true)} style={{ color: 'orange' }}>Login</Text></Text>
                                    }

                                </View>
                        }



                        {/* <Text onPress={() => navigation.navigate('Home')}>CLICK</Text> */}


                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
                    }
}

export default Login

const styles = StyleSheet.create({
    btncontainer: {
        backgroundColor: '#32CCFE',
        height: 35,
        borderRadius: 30,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
        paddingHorizontal: 40
    }
})