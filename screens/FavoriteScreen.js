import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchNowPlayingMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { ChevronLeftIcon, HeartIcon, StarIcon } from 'react-native-heroicons/solid';

const ios = Platform.OS === 'ios';

export default function FavoriteScreen() {
  const [trending, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    getNowPlayingMovies();
    getTopRatedMovies();
  }, []);

  const getNowPlayingMovies = async () => {
    const data = await fetchNowPlayingMovies();
    console.log('đã lấy movies chieu rap',data.results.length)
    if (data && data.results) setNowPlaying(data.results);
    setLoading(false)
  }
 
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('đã lấy top movies ', data.results.length)
    if (data && data.results) setTopRated(data.results);
  }



  return (
    <View className="flex-1 bg-neutral-600">
      {/* search bar */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity className="bg-yellow-400 rounded-xl p-1" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <Text
            className="text-white text-3xl font-bold">
            <Text className="text-yellow-400">Mov</Text>ies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Phim Thịnh Hành*/}
            {trending.length > 0 && <TrendingMovies title="Phim Chiếu Rạp" data={trending} />}

            {/*TOP Phim*/}
            {topRated.length > 0 && <TrendingMovies title="Hay Nhất Mọi Thời Đại" data={topRated} />}

          </ScrollView>
        )
      }

    </View>

  )
}
