import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

import {moviesDataService} from '../services/moviesDataService';
import MovieComponent from '../components/movieComponent';

import {LinearGradient} from 'expo';

import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import icoMoonConfig from '../../assets/fonts/selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'FontName');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      movies: [],
      scrollOffset: 0,
      firstLoading: true,
      isLoading: false,
      viewType: 0
    }
    downloadMovies = () => {

      if (this.state.scrollOffset <= 0 && !this.state.firstLoading || this.state.isLoading) {
        return;
      }
      this.setState({isLoading: true});
      moviesDataService
        .getMovies(this.state.page)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            movies: this
              .state
              .movies
              .concat(responseJson.results),
            page: this.state.page + 1,
            firstLoading: false,
            isLoading: false
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    buttonStyle = (typeExpected) => {
      if (typeExpected === this.state.viewType) {
        return {color: '#446476'}
      }
      return {color: '#446476', opacity: 0.5}
    }
  }
  componentWillMount() {
    downloadMovies();
  }
  renderItems() {
    return this
      .state
      .movies
      .map(item => {
        return (<MovieComponent key={item.id} item={item} navigator={this.props.navigator} view={this.state.viewType}/>);
      })
  }
  /**/
  render() {
    return (
      <View>
        <LinearGradient colors={['#ffffff', '#e0e0e0']} style={styles.linearGradient}>
          <View style={styles.buttonBox}>
            <Text onPress={() => this._setViewListType(0)}><Icon name="stop" size={32} style={buttonStyle(0)}/></Text>
            <Text onPress={() => this._setViewListType(1)}><Icon name="list" size={32} style={buttonStyle(1)}/></Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} onScroll={(event) => {
            this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
          }} onMomentumScrollEnd={() => {
            downloadMovies()
          }}>
            {this.renderItems()}
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
  _setViewListType = (type) => {
    if (type === 0) {
      this.setState({viewType: 0});
    } else if (type === 1) {
      this.setState({viewType: 1});
    }
  }
  _onScroll = (event) => {
    console.log(event);
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    marginTop: 20
  },
  buttonBox: {
    padding: 20,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
    justifyContent: 'space-around'
  }
});

export default HomeScreen;
