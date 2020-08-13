/* eslint-disable semi */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';

import { fetchArticles } from '../api/articles';
import { getArticles } from '../redux/selectors';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState({
    backup: [],
    news: [],
    textSearch: '',
    selectTheme: 0,
    loading: true,
  });
  let selectTheme = [];

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const articles = useSelector(getArticles);

  useEffect(() => {
    fetchArticles(dispatch, () => setLoading(false));
    const fetchData = async () => {
      const result = await axios(baseUrl);
      setData({
        ...data,
        banner: result.data,
        backup: result.data,
      });
    };
    fetchData();
  }, []);

  const onChangeSearch = ({ text }) => {
    console.log(text);
    const data = backup;
    const newData = data.filter(function (item) {
      const itemData = item.titre.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData.length);
    setData({
      ...data,
      news: newData,
      textSearch: text,
    });
  };

  const _renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        navigation.navigate('HomeDetailsScreen', {
          id: item.id,
        });
      }}
    >
      <View style={[styles.divnews, styles.shadows]}>
        <Image style={styles.imagenew} source={{ uri: item.img }} />
        <View style={{ padding: 5 }}>
          <Text style={styles.titleNews} numberOfLines={2}>
            {item.titre}
          </Text>
          <Text style={styles.themeNews}> {item.type} </Text>
          <Text> {item.date_creation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const _renderItemCategory = (item) => (
    <TouchableOpacity onPress={() => setData({ selectTheme: item.id })}>
      <View
        style={selectTheme === item.id ? styles.divtheme : styles.divtheme2}
      >
        <Text
          style={selectTheme === item.id ? styles.textTheme : styles.textTheme2}
        >
          {item.type}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={{ width: width, backgroundColor: 'gray', padding: 8 }}>
          <TextInput
            placeholder="Search..."
            style={{
              height: 40,
              borderColor: '#f2f2f2',
              borderRadius: 10,
              backgroundColor: 'white',
              borderWidth: 1,
              paddingHorizontal: 20,
            }}
          />
        </View>
        <View style={{ height: 200 }}>
          <Swiper>
            {articles.map((itemimag) => (
              <TouchableOpacity key={itemimag.id}>
                <ImageBackground
                  style={{ width: width, height: 200 }}
                  source={{ uri: itemimag.img }}
                >
                  <LinearGradient
                    style={styles.fondoBanner}
                    colors={['transparent', 'black']}
                  >
                    <Text style={styles.textBanner} numberOfLines={2}>
                      {itemimag.titre}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
        <View style={{ height: 45 }}>
          <FlatList
            horizontal={true}
            data={articles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => _renderItemCategory(item)}
          />
        </View>
        {loading ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <FlatList
            data={articles}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

var { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  imagenew: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  shadows: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 },
  },
  divnews: {
    width: width - 10,
    backgroundColor: 'white',
    margin: 5,
    flexDirection: 'row',
    borderRadius: 5,
  },
  titleNews: {
    width: (width / 3) * 2 - 20,
    fontSize: 22,
  },
  themeNews: {
    color: '#c2191c',
    fontSize: 20,
  },
  headernews: {
    width: width,
    height: 50,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logonews: {
    height: 45,
    width: width / 3,
    resizeMode: 'contain',
  },
  textBanner: {
    fontSize: 25,
    color: 'white',
  },
  fondoBanner: {
    flex: 2,
    justifyContent: 'flex-end',
    padding: 10,
  },
  divtheme: {
    height: 42,
    borderTopWidth: 3,
    padding: 10,
    borderColor: '#c2191c',
    backgroundColor: 'white',
  },
  divtheme2: {
    height: 41,
    borderBottomWidth: 2,
    borderColor: '#c2191c',
    padding: 10,
    backgroundColor: '#343434',
  },
  textTheme: {
    color: 'black',
  },
  textTheme2: {
    color: 'white',
  },
});
