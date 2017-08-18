import React from 'react';
import {View, TouchableHighlight, Image, Text, StyleSheet} from 'react-native';

const base_url = 'https://image.tmdb.org/t/p/w500';

class CustomItemBig extends React.Component {
  render() {
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
  }
});

export default CustomItemBig;
