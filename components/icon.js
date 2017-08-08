import React, {Component} from 'react';
import {View} from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import svgs from './../commons/svgs.js';

export default class Icon extends Component {

    render() {
        return (
        <View style={this.props.style}>
        <SvgIcon
        name={this.props.name}
            fill={this.props.fill}
            height={this.props.height}
            width={this.props.width}
            viewBox = {this.props.viewBox}
            svgs={svgs}/>
            </View>);
    }
}