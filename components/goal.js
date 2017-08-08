import React, {Component} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Icon from './icon.js';
import consts from './../commons/constants.js';

export default class Goal extends Component {

    render() {

        let iconName = this.props.type == "white"
            ? "GoalWhite"
            : "Goal";

        return (
            <View style={styles.container}>
                <Icon name={iconName} width={10} height={10}/>
                <View
                    style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    <Text style={styles.name} ellipsizeMode='tail'>{this.props.info.scorer}</Text>
                    <Text style={styles.time}>{this.props.info.time}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    name: {
        textAlign: 'left',
        fontSize: 10,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
        color: consts.colors.$final,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1
        }
    },
    time: {
        fontSize: 10,
        fontWeight: 'bold',
        color: consts.colors.$final,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1
        }
    }
});