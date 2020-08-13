import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Linking,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import HTML from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";

import { getSelectedArticle } from "../redux/selectors";
import { fetchSelectedArticle } from "../api/articles";

const HomeDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const article = useSelector(getSelectedArticle);

  useEffect(() => {
    fetchSelectedArticle(dispatch, id);
  }, []);

  const ENPOINT_URL_IMAGE = `"https://preprod-pac.pac-cse.fr/`;
  const SRC = new RegExp(/(")\//g);
  const content = article.contenu.replace(SRC, ENPOINT_URL_IMAGE);
  console.log(content);

  return (
    <ScrollView>
      {/*<Text>{JSON.stringify(data.contenu)}</Text>*/}
      <HTML style={styles.title} html={article.titre} />
      <HTML
        html={content}
        onLinkPress={(evt, href) => {
          Linking.openURL(href);
        }}
      />
    </ScrollView>
  );
};
export default HomeDetailsScreen;

var { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  imagenew: {
    width: width / 3,
    height: width / 3,
    resizeMode: "cover",
    borderRadius: 5,
  },
  title: {
    marginLeft: 30,
  },
});
