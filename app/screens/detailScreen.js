import React from 'react';
import {
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {moviesDataService} from '../services/moviesDataService';
import {LinearGradient} from 'expo';

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
      movie: {}
    }
  }
  componentWillMount() {
    console.log('this.props.route.params.id', this.props.route.params.id);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.aboutCard}>
              <Image style={styles.aboutCardImg} source={{
                uri: base_url + this.state.movie.backdrop_path
              }}/>
              <Text style={styles.aboutCardTextTitle}>{this.state.movie.title}</Text>
              <Text style={styles.aboutCardTextInfo}>{this.state.movie.runtime} {' min'}</Text>

              <Text style={styles.aboutCardTextStory}>{this.state.movie.overview}</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
  /*
< Text onPress = {
  this._goBackHome
} > Go back home < /Text>*/
  _goBackHome = () => {
    this
      .props
      .navigator
      .pop();
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    paddingTop: 20,
    height: '100%'
  },
  aboutCard: {
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
  aboutCardImg: {
    height: 200
  },
  aboutCardTextTitle: {
    color: '#446476',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  aboutCardTextInfo: {
    color: '#446476',
    fontSize: 14,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  aboutCardTextStory: {
    marginTop: 20,
    color: '#446476',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'flex-start'
  }
});

export DetailScreen AboutScreen;
