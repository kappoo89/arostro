import React from 'react';
import {
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {moviesDataService} from '../services/moviesDataService';
import {LinearGradient} from 'expo';

import BlurImage from 'react-native-blur-image';

import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import icoMoonConfig from '../../assets/fonts/selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'FontName');

const MyStatusBar = () => (
  <View>
    <StatusBar barStyle="light-content" translucent/>
  </View>
);
const base_url = 'https://image.tmdb.org/t/p/w500';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      heartStatus: 'heart'
    }
  }
  componentWillMount() {

    AsyncStorage.getItem('@myFavoriteMovie:' + this.props.route.params.id, (err, result) => {
      console.log(result);
      if (result) {
        this.setState({heartStatus: 'heart2'});
      }
    });

    moviesDataService
      .getMovie(this.props.route.params.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({movie: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <LinearGradient colors={['#fff', '#e0e0e0']} style={styles.linearGradient}>
          <BlurImage source={{
            uri: base_url + this.state.movie.backdrop_path
          }} style={styles.blurBackground} blurRadius={50}/>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailCard}>
              <Image style={styles.detailCardImg} source={{
                uri: base_url + this.state.movie.backdrop_path
              }}/>
              <Text onPress={() => this._toggleFavorite(this.state.movie.id)} style={styles.detailCardHeart}><Icon name={this.state.heartStatus} size={25}/></Text>
              <Text style={styles.detailCardTextTitle}>{this.state.movie.title}</Text>
              <Text style={styles.detailCardTextInfo}>{this.state.movie.runtime} {' min'}</Text>

              <Text style={styles.detailCardTextStory}>{this.state.movie.overview}</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
  _toggleFavorite = (id) => {
    AsyncStorage.getItem('@myFavoriteMovie:' + this.props.route.params.id, (err, result) => {
      if (result) {
        AsyncStorage.removeItem('@myFavoriteMovie:' + this.props.route.params.id, (err, result) => {
          this.setState({heartStatus: 'heart'});
        });
      } else {
        AsyncStorage.setItem('@myFavoriteMovie:' + this.props.route.params.id, JSON.stringify({id: id}), (err, result) => {
          this.setState({heartStatus: 'heart2'});
        });
      }
    });
  }
  /*
  _goBackHome = () => {
    this
      .props
      .navigator
      .pop();
  }
  */
}
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    paddingTop: 20,
    height: '100%'
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '40%'
  },

  detailCard: {
    marginTop: '15%',
    backgroundColor: 'white',
    shadowColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingBottom: 20,
    marginBottom: 20
  },
  detailCardImg: {
    height: 200
  },
  detailCardHeart: {
    position: 'absolute',
    backgroundColor: 'transparent',
    padding: 10,
    right: 0,
    color: '#fff'
  },
  detailCardTextTitle: {
    color: '#446476',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  detailCardTextInfo: {
    color: '#446476',
    fontSize: 14,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  detailCardTextStory: {
    marginTop: 20,
    color: '#446476',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'flex-start'
  }
});

export default DetailScreen;
