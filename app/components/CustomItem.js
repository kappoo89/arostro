import React from 'react';
import {View, TouchableHighlight, Image, Text, StyleSheet} from 'react-native';

const base_url = 'https://image.tmdb.org/t/p/w500';

class CustomItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this._goToAbout} style={styles.cutsomItemWrapper}>
        <View>
          <Image style={styles.customItemImg} source={{
            uri: base_url + this.props.item.poster_path
          }}/>
          <Text style={styles.customItemText}>
            {this.props.item.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _goToAbout = () => {
    this
      .props
      .navigator
      .push('detail', {id: this.props.item.id});
  }
}

const styles = StyleSheet.create({
  cutsomItemWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 20
  },
  customItemView: {},

  customItemImg: {
    height: 500
  },
  customItemText: {
    color: '#446476',
    fontSize: 18,
    padding: 20,
    backgroundColor: '#fff'
  }
});

export default CustomItem;
