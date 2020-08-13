/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// android:usesCleartextTraffic="true"
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  Share,
  TouchableWithoutFeedback, Linking, TouchableNativeFeedback
} from 'react-native';
const { width, height } = Dimensions.get('window');
console.disableYellowBox = true;


export default class App extends Component {
  state = {
    news: [],
    loading: true,
  };
  fetchnews = () => {
    fetch(
      'http://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=45596c91f78f48ffb68513fdf0242350',
    )
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          news: response.articles,
          loading: false,
        });
      });
  };
  componentDidMount() {
    this.fetchnews();
  }
  sharearticle = async article => {
    try {
      await Share.share({
        message: "checkout from TOP NEWS " + article
      })
    }
    catch (error) {
      console.log(error);
    }

  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#333',
          }}>
          <Image source={require('./IMAGE/TN.jpg')} width='50%' height="50%" />
          <ActivityIndicator size="large" color="#0384fc" />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>


            <Text style={styles.text1}>TOP</Text>
            <Text style={styles.text1}>NEWS</Text>

          </View>
          <View style={styles.news}>
            <FlatList
              data={this.state.news}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
                    <View style={{
                      width: width - 50,
                      height: 180,
                      backgroundColor: "#fff",
                      marginBottom: 15,
                      borderRadius: 15

                    }}>
                      <Image source={{ uri: item.urlToImage }}
                        style={[StyleSheet.absoluteFill]
                        } />
                      <View style={styles.gradient}>
                        <Text style={{
                          position: 'absolute',
                          bottom: 0,
                          color: '#fff',
                          fontSize: 20,
                          padding: 5
                        }}>
                          {item.title}
                        </Text>
                        <Text style={{
                          fontSize: 16,
                          color: '#fff',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          padding: 5,
                          fontWeight: 'bold'

                        }}
                          onPress={() => {
                            this.sharearticle(item.url)
                          }}>Share</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}

            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  header: {
    padding: 30,
  },
  text1: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 25,
  },
  news: {
    alignSelf: 'center'
  },
  gradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15
  }
});
