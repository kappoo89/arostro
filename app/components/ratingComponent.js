import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import icoMoonConfig from '../../assets/fonts/selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'FontName');

class RatingComponent extends React.Component {

  render() {
    this.state = {
      starFull: Math.floor(this.props.rating / 2),
      starHalf: Math.floor(Math.floor(this.props.rating)) % 2,
      starEmpty: 5 - (Math.floor(this.props.rating / 2)) - (Math.floor(Math.floor(this.props.rating)) % 2),
      rating: this.props.rating
    }
    var stars = [];
    for (let i = 0; i < this.state.starFull; i++) {
      stars.push(<Icon key={'0_' + i} style={styles.star} name="star-full" size={25}/>)
    }
    for (let i = 0; i < this.state.starHalf; i++) {
      stars.push(<Icon key={'1_' + i} style={styles.star} name="star-half" size={25}/>)
    }
    for (let i = 0; i < this.state.starEmpty; i++) {
      stars.push(<Icon key={'2_' + i} style={styles.star} name="star-empty" size={25}/>)
    }

    return (
      <View style={styles.starsWrapper}>
        {stars}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starsWrapper: {
    flexDirection: 'row',
    marginLeft: 10,
    position: 'absolute',
    left: 0,
    top: 165
  },
  star: {
    marginRight: 2.5,
    backgroundColor: 'transparent',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 1
  }
});

export default RatingComponent;
