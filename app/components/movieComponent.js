import React from 'react';
import {View, TouchableHighlight, Image, Text, StyleSheet} from 'react-native';

const base_url = 'https://image.tmdb.org/t/p/w500';

class MovieComponent extends React.Component {
  render() {
    if (this.props.view === 0) {
      return (
        <TouchableHighlight onPress={this._goToDetail} style={styles.customItemBigWrapper}>
          <View>
            <Image style={styles.customItemBigImg} source={{
              uri: base_url + this.props.item.poster_path
            }}/>
            <Text style={styles.customItemBigText}>
              {this.props.item.title}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }

    if (this.props.view === 1) {
      return (
        <TouchableHighlight onPress={this._goToDetail} style={styles.cutsomItemWrapper}>
          <View style={styles.customItemListView}>
            <Image style={styles.customItemListImg} source={{
              uri: base_url + this.props.item.poster_path
            }}/>
            <View style={styles.customItemListTextWrapper}>
              <Text style={styles.customItemListText}>
                {this.props.item.title}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }

  _goToDetail = () => {
    this
      .props
      .navigator
      .push('detail', {id: this.props.item.id});
  }
}

const styles = StyleSheet.create({
  customItemBigWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 20
  },
  customItemBigView: {},

  customItemBigImg: {
    height: 500
  },
  customItemBigText: {
    color: '#446476',
    fontSize: 18,
    padding: 20,
    backgroundColor: '#fff'
  },
  /**/
  cutsomItemWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 20,
    marginBottom: 10,
    marginTop: 10
  },
  customItemListView: {
    flex: 1,
    flexDirection: 'row'
  },
  customItemListImg: {
    height: 105,
    width: '20%'
  },
  customItemListTextWrapper: {
    width: '80%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  customItemListText: {
    color: '#446476',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20
  }
});

export default MovieComponent;
