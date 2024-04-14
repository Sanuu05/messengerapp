import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, AppState } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { getalluser, loadUser, emploadmsg, editprofilepic, getActiveUser } from '../action/user'
import socket from '../action/socketManager'
import FabButton from './FabButton'
const { width, height } = Dimensions.get('screen')

const HomeScreen = () => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const [reload, setreload] = useState()
    // const baseUrl = "https://veajqzj9se.execute-api.ap-south-1.amazonaws.com"
    // const baseUrl = "http://192.168.137.1:8080"
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const succtok = useSelector((state) => state.user.token)
    const userad = useSelector((state => state.user.user))
    const userall = useSelector((state => state.all?.allActiveUser))
    const [token, settoken] = useState()
    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                console.log("App has come to the foreground!", userad?.user?._id);
                // dispatch(editprofilepic({ online: true }))
                setreload(true)
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
            if (appState.current === "background") {
                // console.log('offs', userad?.user?._id)
                setreload(false)
                // dispatch(editprofilepic({ online: false }))
            }
        });


        return () => {
            subscription?.remove();
        };
    }, []);
    const getTheme = async () => {
        try {
            const value = await AsyncStorage.getItem('tokenmain');
            console.log('cvcss')

            settoken((value))
        } catch (error) {
            console.log('error', error);
        };
    };
    const [online, setonline] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getActiveUser())
            dispatch(editprofilepic({ online: true }))
            dispatch(loadUser())
            dispatch(emploadmsg())
            // socket.emit('authenticate', userId);
            // socket.on('new-message', function (data) {
            //     setreload(data)
            // });
        }, [])


    )

    useEffect(() => {

        socket.on('chatMessage',function (data) {
            dispatch(getActiveUser())
        });


    }, [])
  
    const succ = useSelector((state) => state.user.token)
    const Chatlist = ({ v, serach }) => {
        // console.log('userx',v)
        const user = useSelector((state => state.user.user))
        // const filter = user?.user?.msg?.filter(p => p.user == v?._id)
        // const latest = filter ? filter[0] : null
        // if (user?.user?._id === v?._id) {
        //     return null
        // } else {
            return (

                <TouchableOpacity activeOpacity={0.8} style={{ display: 'flex', flexDirection: 'row', marginTop: 10, alignItems: 'stretch' }} onPress={() => navigate.navigate('Msg', {...v,type:v?.userDetails?"user":"group"})} >
                    <Image source={{
                        uri: v?.userDetails?.profilePic ? v?.userDetails?.profilePic? v?.groupDetails?.profilePic: v?.groupDetails?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }} style={{ height: 55, width: 55, resizeMode: 'cover', borderRadius: 999 }} />
                    <View style={{ marginLeft: 13, marginTop: 2, borderBottomColor: '#8B8585', flex: 1 }}>
                        <Text style={{ fontSize: 21, fontFamily: 'Alegreya_700Bold', letterSpacing: 1, color: '#676D6F' }}>{v?.userDetails?.name ? v?.userDetails?.name:v?.groupDetails?.name}</Text>
                        {
                            v?.recentMessage ? <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', letterSpacing: 1, color: '#C9CBD5' }}>{v?.recentMessage?.length > 30 ? `${v?.recentMessage?.slice(0, 30)}......` : v?.recentMessage}</Text> : null

                        }
                        {
                            v?.recentMedia ? <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', letterSpacing: 1, color: '#C9CBD5' }}>{new URL(v?.recentMedia).pathname.split('/').pop()}</Text> : null

                        }

                    </View>
                </TouchableOpacity>
            )
        // }

    }
    const [serach, setsearch] = useState()

    const [alluser, setalluser] = useState()
    useEffect(() => {

        const filte = serach ? setalluser(userad?.alluser?.filter(p => p.name == serach || p.email == serach)) : setalluser(online ? userad?.alluser?.filter(p => p.online == online) : userad?.alluser)
    }, [serach, reload, userad, online])
    const succn = useSelector((state) => state.user.user)
    const succ1 = useSelector((state) => state.user.signin)
    useFocusEffect(
        React.useCallback(() => {
            if (succn?.user) {
                navigate.navigate('Bottom')
            } else {
                navigate.navigate('Login')
            }
        }, [dispatch, succ])
    )
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{ elevation: 1, backgroundColor: 'white' }}>
                <View style={{ marginLeft: 9 }}>
                    <Text style={{ fontSize: 32, letterSpacing: 1.8, marginLeft: 8, marginTop: 15, fontFamily: 'Alegreya_700Bold' }}>Messages</Text>
                </View>
                <View style={{ paddingHorizontal: 18, marginVertical: 6 }}>
                    <View style={{ backgroundColor: '#F6F7FB', padding: 8, borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='search' size={20} color="#676D6F" style={{marginLeft:5}} />
                        <TextInput placeholder='Search by Name or Email-Id' style={{ flex: 1,paddingLeft:5 ,fontSize: 15, fontFamily: 'Alegreya_400Regular'}} onChangeText={text => setsearch(text)}  />

                    </View>
                </View>
                <View style={{ paddingHorizontal: 15, marginVertical: 1, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row' }} >
                    <TouchableOpacity activeOpacity={0.9} style={{ width: '40%', borderBottomColor: '#E76F51', borderBottomWidth: online ? 0 : 3, paddingVertical: 3 }} onPress={() => setonline(false)}>
                        <Text style={{ textAlign: 'center', fontSize: 17, fontFamily: 'Alegreya_700Bold', color: online ? 'black' : '#E76F51' }}>Chats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={{ width: '40%', borderBottomColor: '#E76F51', borderBottomWidth: online ? 3 : 0, paddingVertical: 3 }} onPress={() => setonline(true)} >
                        <Text style={{ textAlign: 'center', fontSize: 17, fontFamily: 'Alegreya_700Bold', color: online ? '#E76F51' : 'black' }}>Online</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 15 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                    {
                        userall?.map((v, i) => {
                            return (
                                <Chatlist v={v} key={i} serach={serach} />
                            )
                        })
                    }
                </ScrollView>
            </View>
            
        <FabButton/>
        </View>


    )
}

export default HomeScreen

const styles = StyleSheet.create({})