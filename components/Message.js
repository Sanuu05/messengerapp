import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, ScrollView, Image, Modal, Button, ActivityIndicator, Pressable ,AppState} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
// import Pusher from 'pusher-js'
import Icon2 from 'react-native-vector-icons/Entypo'

import { useDispatch, useSelector } from 'react-redux'
import { delmsg, emploadmsg, loadmsg, loadoneuser, sendmsg } from '../action/user'
const { width, height } = Dimensions.get('screen')
import * as ImagePicker from 'expo-image-picker';
// import { io } from "socket.io-client"
import socket from '../action/socketManager'
// import { Button } from 'react-native-web'

const Message = (props) => {
    const navigate = useNavigation()
    const [msgres, setmsgres] = useState()
    const [sentmsg, setsentmsg] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch()
    const [imagedata, setimagedata] = useState()
    const [reload, setreload] = useState()
    const [allMsg,setAllMsg]= useState([])
    // console.log('mmm',)
    // const baseUrl = "https://msg-snya.onrender.com"
    // const baseUrl = "http://192.168.137.1:5555"

    const userad = useSelector((state => state?.user?.user?.user?._id))
    const mainer = useSelector(state => state?.user)
    const loading = useSelector((state) => state.user.load)
    const user = useSelector((state => state.all.alluser))

    const filter = user.find(p => p._id == props.route?.params?._id)
    const msg = useSelector((state) => state.allmsg.allmsg?.msg)
    const muser = useSelector((state) => state.allmsg.allmsg?.user)
    // const socket = io(baseUrl)
    // console.log(">>>>>>>>>>>>>>>>",props.route?.params?.type)
    useEffect(()=>{
        setAllMsg(msg)

    },JSON.stringify(msg))
    useEffect(() => {


        if (props.route?.params?._id) {
            dispatch(loadmsg(props.route?.params?._id,props.route?.params?.type))
            // dispatch(loadoneuser(props.route?.params?._id))
            // console.log('reload')


        }

    }, [dispatch, props.route?.params?._id, reload])
    useEffect(() => {

        if (props.route.params?.type=="group" && props.route.params._id) {
            console.log(">>>><<<>><>><>>>>>")
            socket.emit('joinRoom', props.route.params._id);
          }

        

        socket.on('chatMessage',function (data) {
            setAllMsg((prev)=>[...prev,data])
            // console.log(">>>>>>>>>>>>>>>>>>>>.",data)
        });
        socket.on('connected',function (data) {
            // setAllMsg((prev)=>[...prev,data])
            // console.log(">>>>>>>>>>>>>>>>>>>>.connected",data)
        });
        // socket.on('new-message', function (data) {
        //     if (String(userad) == String(data?.id) || String(userad) == String(data?.sid)) {
        //         console.log('Got announcement:', data);
        //         const random = Math.random()
        //         setreload(`${data?.msg}${random}`)
        //         setModalVisible(false)

        //     }

        // });
        // socket.on('del-message', function (data) {
        //     console.log('del announcement:', data);
        //     if (String(data?.id) == userad) {
        //         setreload(data?.msgid)
        //     }

        // });
        // socket.on('update', function (data) {
        //     // console.log('del announcement:', data);
        //     console.log('up', data)
        //     console.log('upAD', userad)
        //     // console.log('up12', props.route?.params?._id)
        //     // const random = Math?.random()
        //     //   setreload(`${random}`)
        //     if (String(props.route?.params?._id) == String(data)|| String(userad) == String(data) ) {
        //         //   setModalVisible(false)
        //         console.log('equal')
        //         //   setload(false)
        //         const random = Math?.random()
        //         setreload(`${random}`)
        //     }
        // })


        return () => {
            // Leave the room when component unmounts
            if (props.route.params?.type=="group" && props.route.params._id) {
              socket.emit('leaveRoom', props.route.params._id);
            }
          };

    }, [])



    // useEffect(() => {


    // }, [])





    // console.log('msg', msg)

    const submit = () => {
        // alert(props.route?.params?._id)
        setmsgres('')
        
        // console.log('bvb')
        if (msgres) {
            // dispatch(sendmsg(msgres, (props.route?.params?._id), null))
            // const socket = io(baseUrl)
            if(props.route.params?.type=="group"){
                
                socket.emit('chatMessage',{content: msgres,groupId:props.route?.params?._id,senderId:userad,type:'text'});
            }else{
                console.log({content: msgres,groupId:props.route?.params?._id,senderId:userad,type:'text'})
                socket.emit('chatMessage',{content: msgres,receiverId:props.route?.params?._id,senderId:userad,type:'text'});
            }
           
            setAllMsg([...allMsg,{content: msgres,receiverId:props.route?.params?._id,senderId:userad}])

        }


    }
    const [pickedImagePath, setPickedImagePath] = useState('');
    // useEffect(() => {
    //     const subscription = AppState.addEventListener("change", nextAppState => {
    //       if (
    //         appState.current.match(/inactive|background/) &&
    //         nextAppState === "active"
    //       ) {
    //         console.log("App has come to the foreground!",userad?.user?._id);
    //         const random = Math?.random()
    //         setreload(`${random}`)
    //       }
    
    //       appState.current = nextAppState;
    //       setAppStateVisible(appState.current);
    //       console.log("AppState", appState.current);
    //       if(appState.current==="background"){
             
    //       }
    //     });
        
    
    //     return () => {
    //       subscription?.remove();
    //     };
    //   }, []);

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        setload(false)
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            //   allowsEditing:true,
            base64: true,
            quality: 1,
        });
        // console.log("<><<><<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",result?.assets[0]);
        const source = result?.assets[0]?.base64
     
        setimagedata(result?.assets[0])
        if (source) {
            setModalVisible(true)

        }

        // Explore the result
        

        if (!result.canceled) {
            setPickedImagePath(result?.assets[0].uri);
            // console.log(result.uri);
        }
    }
    const showCameraPicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            //   allowsEditing:true,
            base64: true,
            quality: 1,
        });
        const source = result.base64
        setimagedata(result)
        if (source) {
            setModalVisible(true)
        }

        // Explore the result
        // console.log(result.uri);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            // console.log(result.uri);
        }
    }
    // console.log(imagedata)
    const [load, setload] = useState(false)
    const sendphoto = () => {

        if (imagedata) {
            setload(true)
            let base64Img = `data:image/jpg;base64,${imagedata?.base64}`;
            let apiUrl =
                'https://api.cloudinary.com/v1_1/sannu/image/upload';
            let data = {
                file: base64Img,
                upload_preset: 'insta-clone'
            };

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
                .then(async response => {
                    let data = await response.json();
                    if (data.secure_url) {
                        //   alert('Upload successful');
                        socket.emit('chatMessage',{content: '',mediaUrl:data.secure_url,receiverId:props.route?.params?._id,senderId:userad,type:'image'});
                        setAllMsg([...allMsg,{content: '',mediaUrl:data.secure_url,receiverId:props.route?.params?._id,senderId:userad}])
                        setModalVisible(false)
                        setPickedImagePath('')
                        setload(false)
                        // dispatch(sendmsg(msgres, props.route?.params?._id, data.secure_url))
                    }
                })
                .catch(err => {
                    alert('Cannot upload');
                });

        }
    }
    const Msgdiv = ({ v }) => {
        const [modalVisible, setModalVisible] = useState(false)
        const [delitem, setdelitem] = useState()

        useFocusEffect(
            React.useCallback(() => {
                // const socket = io(baseUrl)

                socket.on('chatMessage', function (data) {
                    // console.log('del announcement:', data);
                    setModalVisible(false)
                });
            }, [])


        )
        return <View  >
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Delete {delitem?.type}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: width - 100 }}>
                                <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: '#E76F51', paddingHorizontal: 35, paddingVertical: 10, elevation: 1, borderRadius: 10 }} onPress={() => dispatch(delmsg(delitem?.id))} >
                                    <Text style={{ color: 'white',fontFamily: 'Alegreya_700Bold' ,fontSize:18}}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: '#E76F51', paddingHorizontal: 35, paddingVertical: 10, elevation: 1, borderRadius: 10 }} onPress={() => setModalVisible(false)} >
                                    <Text style={{ color: 'white',fontFamily: 'Alegreya_700Bold',fontSize:18 }}>No</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

            {
                v?.content ? <Text onLongPress={() => {
                    setdelitem({ id: v?._id, type: "Message" })
                    setModalVisible(true)
                }} style={{ fontSize: 17, fontFamily: 'Alegreya_700Bold', backgroundColor: v?.senderId==userad ? '#2176FF' : "#F4F4F4", alignSelf: v?.senderId==userad? 'flex-end' : 'flex-start', marginTop: 0, color: v?.senderId==userad  ? '#BCD7FF' : '#8D9293', minWidth: 130, textAlign: 'center', marginHorizontal: 15, paddingHorizontal: 20, paddingVertical: 15, elevation: 0,borderBottomRightRadius:50,borderTopRightRadius:v?.senderId==userad ?null: 50,borderTopLeftRadius:50,borderBottomLeftRadius:v?.senderId==userad?50:null}}>{v?.content}</Text> : null
            }
            {/* onLongPress={() => dispatch(delmsg(v._id))} */}
            {
                v?.mediaUrl ? <TouchableOpacity activeOpacity={1} onLongPress={() => {
                    setdelitem({ id: v?._id, type: "Image" })
                    setModalVisible(true)
                }}>
                    <Image source={{
                        uri: v?.mediaUrl
                    }} style={{ width: width-120, height: undefined, aspectRatio:1, alignSelf:  v?.senderId==userad ? 'flex-end' : 'flex-start', marginTop: 10, marginHorizontal: 15, paddingHorizontal: 20, paddingVertical: 10 }} />

                </TouchableOpacity>
                    : null
            }
        </View>
    }
    const Top = () => {
        const [modalVisible, setModalVisible] = useState(false)
        return <View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView1}>
                        <View style={styles.modalView1}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 20 }}>
                                <Text style={{ fontSize: 25, fontFamily: 'Alegreya_700Bold', textAlign: 'center', color: 'grey' }}>Details</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Image source={{
                                    uri: filter?.profilePic ? filter?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                }} style={{ height: 100, width: 100, borderRadius: 999, resizeMode: 'cover' }} />
                                <Text style={{ fontSize: 30, fontFamily: 'Alegreya_700Bold' }}>{filter?.name}</Text>
                                <Text style={{ fontSize: 20, fontFamily: 'Alegreya_400Regular' }}>{filter?.email}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable> */}
            </View>
            <View style={{ elevation: 0, paddingBottom: 15, backgroundColor: "white", position: 'relative', height: 50, zIndex: 100, width: '100%', display: 'flex', flexDirection: 'row', top: 0, justifyContent: 'flex-start', alignItems: 'center' }}>
               
                    {/* style={{ position: 'absolute', zIndex: 99, left: 10, top: 0 }} */}
                    {/* <Text>Back</Text> */}
                    <TouchableOpacity style={{ backgroundColor: '#F2F2F2',elevation:0,marginLeft:15,height:45,width:45,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:10 }} onPress={() => {
                            // dispatch(emploadmsg())
                            navigate.goBack()
                        }}>
                        <Icon1 name='angle-left' color="#BFBFBF" size={30} style={{ marginTop: 0, marginLeft: 0, zIndex: 99 }}  />

                    </TouchableOpacity>

                
                <View style={{ marginLeft: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image source={{
                            uri: muser?.profilePic ? muser?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                        }} style={{ width: 45, height: 45, resizeMode: 'cover', borderRadius: 999 }} />
                        <View style={{ marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Alegreya_700Bold', textAlign: 'center', marginTop: 0, padding: 0,color:'#6B7073' }}>{muser?.name}</Text>
                            <Text style={{ fontSize: 13, fontFamily: 'Alegreya_400Regular', textAlign: 'center', marginTop: 0, padding: 0, color: muser?.online ? "#86C7BF" : 'red' }}>{muser?.online ? "Online" : "Offline"}</Text>
                        </View>

                    </View>


                </View>

                {/* <TouchableOpacity style={{ position: 'absolute', zIndex: 99, right: 10, top: 2 }}>
                  
                    <Icon name='information-circle-outline' color="grey" size={28} style={{ marginTop: 10, marginLeft: 15, zIndex: 99 }} onPress={() => setModalVisible(true)} />
                </TouchableOpacity> */}
            </View>
        </View>
    }
    return (

        <SafeAreaView style={{
            flex: 1, backgroundColor: 'white'
        }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled={true}
                style={{ flexGrow: 1 }}>

                <View style={{ height: height - 50, backgroundColor: 'white', position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: '#ffffff', marginBottom: 90, display: 'flex', flexDirection: 'column' }}>
                        {
                            muser ?
                                <Top /> : null
                        }

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                // Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={{ backgroundColor: 'white', height: height, padding: 10 }}>
                                {/* <Text>Hello modal</Text> */}
                                {
                                    imagedata ? <Image source={{
                                        uri: imagedata?.uri
                                    }} style={{ width: "100%", height: height - 200, resizeMode: 'contain' }} /> : null
                                }
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity onPress={() => {
                                        setModalVisible(false)
                                        setimagedata()
                                    }} style={{ elevation: 0, padding: 5, backgroundColor: '#F6F8FD', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                                        <Text style={{ fontSize: 18, fontFamily: 'Alegreya_700Bold' }}>Cancel</Text>
                                        <Icon name='close' size={30} color="#557BF3" />
                                    </TouchableOpacity>
                                    {
                                        load ? <TouchableOpacity style={{ elevation: 0, padding: 5, backgroundColor: '#F6F8FD', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100 }}>
                                            <ActivityIndicator size="large" color="#32CCFE" />
                                        </TouchableOpacity> : <TouchableOpacity onPress={sendphoto} style={{ elevation: 0, padding: 5, backgroundColor: '#F6F8FD', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Alegreya_700Bold' }}>Send</Text>
                                            <Icon name='send' size={30} color="#557BF3" />
                                        </TouchableOpacity>
                                    }



                                </View>


                                {/* <Button onPress={sendphoto} title="Send" /> */}

                            </View>
                        </Modal>
                        <View style={{ flex: 1, backgroundColor: '#ffffff', borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 0, elevation: 0 ,marginBottom:0}}>
                        {
                                    (msg?.length == 0|| msg?.length==undefined) && loading ? <View style={{ height: height - 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <ActivityIndicator size='large' color="orange" />

                                    </View> : null
                                }
                            <ScrollView
                                ref={ref => { scrollView = ref }}
                                onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
                                style={{ paddingBottom: 10 }}
                                contentContainerStyle={{paddingBottom:20}}
                            >
                                

                                {
                                    allMsg?.map((v, i) => {
                                        return (

                                            <Msgdiv v={v} key={i} />
                                        )


                                    })
                                }
                                {/* <Text style={{fontSize:18,backgroundColor:'grey',alignSelf:'flex-end',marginTop:10,marginHorizontal:10,paddingHorizontal:15,paddingVertical:3,elevation:5,borderRadius:999}}>Hello</Text>
                        <Text style={{fontSize:18,backgroundColor:'blue',alignSelf:'flex-start',marginTop:10,marginHorizontal:10,paddingHorizontal:15,paddingVertical:3,elevation:5,borderRadius:999}}>Hello</Text> */}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', backgroundColor: '#FCFCFC', bottom: 0, height: 70, width: '100%', borderTopLeftRadius: 0,elevation:1, borderTopRightRadius: 0, paddingHorizontal:9 }}>
                        <View style={{ backgroundColor: '#FCFCFC', height: 70, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon2 name='camera' size={27} color="#CECFD4" style={{ marginHorizontal: 5,borderRightColor:'#CECFD4',borderRightWidth:2,paddingRight:10 }} onPress={showImagePicker}  />
                            <TextInput placeholder='Type Something....' value={msgres} style={{ backgroundColor: '#FCFCFC', height: 40, flex: 1, paddingHorizontal: 10, borderRadius: 30, marginHorizontal: 5,fontSize: 17, fontFamily: 'Alegreya_700Bold' }} onChangeText={text => setmsgres(text)} />

                            {/* <Icon1 name='image' size={30} color="#557BF3" style={{ marginHorizontal: 5 }} onPress={showCameraPicker} />
                             */}
                            {/* <Icon1 name='image' size={30} color="#557BF3" style={{ marginHorizontal: 5 }} onPress={() => setModalVisible(true)} />
                            <Icon1 name='image' size={30} color="#557BF3" style={{ marginHorizontal: 5 }} onPress={() => setModalVisible(false)} /> */}
                            <TouchableOpacity activeOpacity={0.5} onPress={submit} style={{backgroundColor:'#E76F51',height:55,width:55,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:999}}>
                                <Icon name='send' size={20} color="white" />
                            </TouchableOpacity>
                        </View>


                    </View>


                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>


    )
}

export default Message

const styles = StyleSheet.create({
    centeredView1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginTop: 80
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView1: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        width: width - 50,
        minHeight: 200,
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 25
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'Alegreya_700Bold'
    }
})