import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {moviesDataService} from '../services/moviesDataService';
import CustomItem from '../components/CustomItem';
import {LinearGradient} from 'expo';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      movies: [],
      scrollOffset: 0,
      firstLoading: true
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
        return (<CustomItem key={item.id} item={item} navigator={this.props.navigator}/>);
      })
  }
  render() {
    return (
      <View>
        <LinearGradient colors={['#ffffff', '#e0e0e0']} style={styles.linearGradient}>
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
}
const styles = StyleSheet.create({
  linearGradient: {
    marginTop: 20
  }
});

export default HomeScreen;
