import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { HeartIcon, StarIcon, ArrowRightOnRectangleIcon } from 'react-native-heroicons/solid';
import useAuth from '../hook/useAuth';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigation = useNavigation();


  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    console.log('đã lấy movies trending', data.results.length)
    if(data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    console.log('đã lấy movies sắp update', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    console.log('đã lấy top movies ', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Welcomes');
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <View className="flex-1 bg-neutral-600">
      {/* search bar */}
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={()=> navigation.navigate('Favorite')}>
            <StarIcon size="30" strokeWidth={2} color="yellow" />
          </TouchableOpacity>
          <Text 
            className="text-white text-3xl font-bold">
              <Text className="text-yellow-400">Mov</Text>ies
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <ArrowRightOnRectangleIcon size="30" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >

            {/* Phim Thịnh Hành*/}
            { trending.length>0 && <TrendingMovies title="Thịnh Hành" data={trending} /> }

            {/* Phim Sắp Cập Nhật*/}
            { upcoming.length>0 && <MovieList title="Đang Cập Nhật" data={upcoming} /> }
            
            {/*TOP Phim*/}
            { topRated.length>0 && <MovieList title="Đánh Giá Cao" data={topRated} /> }

          </ScrollView>
        )
      }
      
  </View>
   
  )
}
