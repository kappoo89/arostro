import React from 'react';
import {ScrollView, Text, View, StyleSheet, Button} from 'react-native';
import {moviesDataService} from '../services/moviesDataService';
import CustomItemBig from '../components/CustomItemBig';
import CustomItemList from '../components/CustomItemList';
import {LinearGradient} from 'expo';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      movies: [],
      scrollOffset: 0,
      firstLoading: true,
      viewType: 0
    }
    downloadMovies = () => {
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
            firstLoading: false
          });
        })
        .catch((error) => {
          console.error(error);
        });
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
        if (this.state.viewType === 0) {
          return (<CustomItemBig key={item.id} item={item} navigator={this.props.navigator}/>);
        } else if (this.state.viewType === 1) {
          return (<CustomItemList key={item.id} item={item} navigator={this.props.navigator}/>);
        }
      })
  }
  render() {
    return (
      <View>
        <LinearGradient colors={['#ffffff', '#e0e0e0']} style={styles.linearGradient}>
          <Button onPress={() => this._setViewListType(0)} title="A" color="#841584"/>
          <Button onPress={() => this._setViewListType(1)} title="B" color="#841584"/>
          <ScrollView showsVerticalScrollIndicator={false} onScroll={(event) => {
            this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
          }} onMomentumScrollEnd={() => {
            if (this.state.scrollOffset <= 0 && !this.state.firstLoading) {
              return;
            }
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
}
const styles = StyleSheet.create({
  linearGradient: {
    marginTop: 20
  }
});

export default HomeScreen;
