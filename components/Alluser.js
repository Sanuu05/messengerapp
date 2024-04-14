import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
// import { io } from "socket.io-client"
import { emploadmsg, getalluser, loadUser } from '../action/user'

const { width, height } = Dimensions.get('screen')

const Alluser = () => {
    const ma = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const [reload, setreload] = useState()
    const alluser = useSelector((state => state?.all?.alluser))
    console.log({alluser})
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getalluser())
        }, [dispatch])


    )
    const [refreshing, setRefreshing] = useState(false);

    const Chatlist = ({ v }) => {
        const user = useSelector((state => state.user.user))

        // const filter = user?.user?.msg?.filter(p => p.user == v?._id)

        // const latest = filter[0]
        // console.log('vbvb',latest)
        if (user?.user?._id === v?._id) {
            return null
        } else {
            return (

                <TouchableOpacity activeOpacity={0.8} style={{ display: 'flex', flexDirection: 'row', marginTop: 10,alignItems:'stretch' }} onPress={() => navigate.navigate('Msg', v)} >
                    <Image source={{
                        uri: v?.profilePic ? v?.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }} style={{ height: 55, width: 55, resizeMode: 'cover', borderRadius: 999 }} />
                    <View style={{ marginLeft: 13, marginTop: 2, borderBottomColor: '#8B8585', flex: 1 }}>
                        <Text style={{ fontSize: 21, fontFamily: 'Alegreya_700Bold', letterSpacing: 1,color:'#676D6F' }}>{v?.name}</Text>
                        <Text style={{ fontSize: 13, fontFamily: 'Alegreya_500Medium', letterSpacing: 1, color: '#C9CBD5' }}>{v?.email}</Text>    

                    </View>
                </TouchableOpacity>
            )
        }

    }
    const [serach, setsearch] = useState()
    // const setseaarch =(val)=>{

    // }

    return (

        <SafeAreaView style={{ backgroundColor: 'white',display:'flex',flexDirection:'column' }}>
            {/* <ScrollView> */}
            <View style={{ elevation: 1, backgroundColor: 'white' }}>
            <View >
                <View style={{marginLeft:5}}>
                    <Text style={{ fontSize: 32,letterSpacing:1.8, marginLeft: 8, marginTop: 15, fontFamily: 'Alegreya_700Bold' }}>All Users</Text>
                </View>
                <View style={{ paddingHorizontal: 15, marginVertical: 6 }}>
                <View style={{ backgroundColor: '#F6F7FB', padding: 8, borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='search' size={20} color="#676D6F" style={{marginLeft:5}} />
                        <TextInput placeholder='Search by Name or Email-Id' style={{ flex: 1,paddingLeft:5 ,fontSize: 15, fontFamily: 'Alegreya_400Regular'}} onChangeText={text => setsearch(text)}  />

                    </View>
                </View>
            </View>
            </View>
            <View style={{paddingHorizontal:15, marginTop: 15,height:height-150 }}>
                <ScrollView contentContainerStyle={{paddingBottom:200}} >
                    {
                        alluser?.map((v, i) => {
                            return (
                                <Chatlist v={v} key={i} />
                            )
                        })
                    }
                </ScrollView>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>


    )
}

export default Alluser

const styles = StyleSheet.create({})