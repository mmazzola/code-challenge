import React from 'react';
import {StyleSheet, Text, Image, View, FlatList} from 'react-native';
import consts from './../commons/constants.js';
import MatchEvent from './../components/match-event.js';

export default class HistoryScreen extends React.Component {
  constructor(props) {
    super(props);

    // Initialize component state
    this.state = {};
  }

  renderSeparator() {
    return (<View
      style={{
      height: StyleSheet.hairlineWidth,
      width: "100%",
      backgroundColor: "black"
    }}/>);
  }

  renderFooter() {
    return (
      <View
        style={{
        backgroundColor: consts.colors.$stable,
          width:'100%',
          height:50
        }}>
        <View
          style={{
          position: 'absolute',
          left: '48%',
          top: 0,
          width: '1%',
          height: '50%',
          backgroundColor: consts.colors.$calm
        }}/></View>
    );
  }

  render() {
    return (<FlatList
      data={this.props.events}
      keyExtractor={(item, index)=>item.timestamp+item.label}  
      renderItem={({item}) => <MatchEvent event={item}></MatchEvent>}
      ItemSeparatorComponent={this.renderSeparator}
      ListFooterComponent={this.renderFooter}/>);
  }
}