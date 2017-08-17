import React from 'react';
import {View, TouchableHighlight, Image, Text, StyleSheet} from 'react-native';

const base_url = 'https://image.tmdb.org/t/p/w500';

class CustomItemList extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this._goToDetail} style={styles.cutsomItemWrapper}>
        <View style={styles.customItemListView}>
          <Image style={styles.customItemListImg} source={{
            uri: base_url + this.props.item.poster_path
          }}/>
          <Text style={styles.customItemListText}>
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
  customItemListView: {
    flex: 1,
    flexDirection: 'row'
  },
  customItemListImg: {
height : 105,
    width: '20%'
  },
  customItemListText: {
    color: '#446476',
    width: '80%',
    fontSize: 18,
    padding: 20,
    backgroundColor: '#fff'
  }
});

export default CustomItemList;
