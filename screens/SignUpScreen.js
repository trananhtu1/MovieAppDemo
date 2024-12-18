import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';


export default function SignUpScreen() {
    const navigation = useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit=async ()=>{
        if(email && password){
            try{
                await createUserWithEmailAndPassword(auth,email,password);
                navigation.navigate('Welcome');
            }catch(err){
                console.log('co loi ',err.message);
            }
        }
    }
  return (
    <View className="flex-1 bg-neutral-600" >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Image source={require('../assets/images/signup.png')} 
                style={{width: 115, height: 100}} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Họ Và Tên</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder='Enter Name'
            />
            <Text className="text-gray-700 ml-4">Email</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={value=>setEmail(value)}
                placeholder='Enter Email'
            />
            <Text className="text-gray-700 ml-4">Mật Khẩu</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={password}
                onChangeText={value=>setPassword(value)}
                placeholder='Enter Password'
            />
            <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
                onPress={handleSubmit}
            >
                <Text className="font-xl font-bold text-center text-gray-700">
                    Đăng Kí
                </Text>
            </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
        </Text>
        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/google.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/apple.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../assets/icons/facebook.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Bạn Đã Có Tài Khoản?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-yellow-500"> Đăng Nhập</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
