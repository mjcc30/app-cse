import React from 'react';
import { ScrollView, Linking, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { initializeRegistryWithDefinitions } from 'react-native-animatable';

const htmlReader = () => {
  return (
    <ScrollView>
      <HTML style={styles.title} html={article.titre} />
      <HTML
        html={article}
        imagesMaxWidth={Dimensions.get('window').width}
        onLinkPress={(evt, href) => {
          Linking.openURL(href);
        }}
        tagsStyles={{ a: { color: 'red' } }}
        classesStyles={{}}
      />
    </ScrollView>
  );
};

export default htmlReader;
