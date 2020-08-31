import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  View,
  Linking,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedArticle } from '../redux/selectors';
import { fetchSelectedArticle } from '../api/articles';

const HomeDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const article = useSelector(getSelectedArticle);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSelectedArticle(dispatch, id);
    setLoading(false);
  }, [])

  const HTMLStyles = {
    h2: { fontSize: 20, color: '#303235' },
    img: { marginBottom: 15 },
    a: { color: '#039BE5', fontWeight: 'bold' }
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <ScrollView>
          <HTML style={styles.title} html={article.titre} />
          <HTML
            imagesMaxWidth={Dimensions.get('window').width}
            tagsStyles={HTMLStyles}
            baseFontStyle={{fontSize: 16, fontFamily: 'sans-serif-light', color: '#090f0f'} }
            ignoredStyles={['height', 'width']}
            html={article}
            onLinkPress={(evt, href) => {
              Linking.openURL(href)
            }}
            classesStyles={{}}
          />
        </ScrollView>
      )}
    </View>
  );
};
export default HomeDetailsScreen;

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  imagenew: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  title: {
    marginLeft: 30,
  },
});
