import React, {Component} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Goal from './goal.js';
import Icon from './icon.js';
import consts from './../commons/constants.js';

export default class Team extends Component {

    constructor(props) {
        super(props);

        // Initialize component state
        this.state = {};
    }

    render() {

        return (

            <View style={styles.container}>
                <Text style={styles.name}>{this.props.info.name}</Text>
                <Image
                    source={{
                    uri: this.props.info.logo_url
                }}
                    style={styles.logo}/>
                <View style={styles.goalContainer}>
                    {this
                        .props
                        .info
                        .goals
                        .map(function (goal,index) {
                            return <Goal info={goal} key={index} type="white"/>;
                        })}
                </View>
                <View style={styles.shootoutContainer}>

                    {this
                        .props.info
                        .shootout.serie
                        .map(function (label,index) {
                            return label == "Scored"
                                ? <Icon name="PenaltyScoredWhite" width={15} height={15} key={index}/>
                                : <Icon name="PenaltyMissedWhite" width={15} height={15} key={index}/>;
                        })}
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    name: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: consts.colors.$final,
        textShadowColor: 'black',
        textShadowOffset:{width:1,height:1}
    },
    logo: {
        margin: 10,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    goalContainer: {
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    shootoutContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});