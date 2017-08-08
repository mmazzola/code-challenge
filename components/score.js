import React, {Component} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import consts from './../commons/constants.js';

export default class Score extends Component {

    constructor(props) {
        super(props);

        // Initialize component state
        this.state = {
            isover: true
        };
    }

    render() {
        let stateLabel = this.state.isover
            ? "Final Result"
            : "..."; // This app only considers final results

        let withShootout = (this.props.shootout_home && this.props.shootout_away);

        let scoreHome = parseInt(this.props.score_home, 10) + (withShootout
            ? parseInt(this.props.shootout_home, 10)
            : 0);
        let scoreAway = parseInt(this.props.score_away, 10) + (withShootout
            ? parseInt(this.props.shootout_away, 10)
            : 0);

        return (
            <View style={styles.container}>
                <Text style={styles.stateLabel}>{stateLabel}</Text>

                <View style={styles.resultContainer}>
                    <TextScore totalScore={scoreHome} gameScore={this.props.score_home}/>
                    <Text
                        style={styles.scoreLabel}>-</Text>
                    <TextScore totalScore={scoreAway} gameScore={this.props.score_away}/>
                </View>
            </View>
        );
    }
}

class TextScore extends Component {

    render() {
        return (
            <View style={styles.textScoreContainer}>
                <Text style={styles.scoreLabel}>{this.props.totalScore}
                </Text>
                <Text style={styles.shootoutLabel}>{'(' + this.props.gameScore + ')'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultContainer: {
        flexDirection: 'row'
    },
    textScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreLabel: {
        color: consts.colors.$final,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 3,
        textShadowColor: 'black',
        textShadowOffset:{width:1,height:1}
    },
    stateLabel: {
        color: consts.colors.$final,
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset:{width:1,height:1}
    },
    shootoutLabel: {
        color: consts.colors.$final,
        textShadowColor: 'black',
        textShadowOffset:{width:1,height:1}
    }
});