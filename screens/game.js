import React, {Component} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Team from './../components/team.js';
import Score from './../components/score.js';
import consts from './../commons/constants.js';

export default class Game extends Component {

    render() {

        let backgroundImage = require('./../assets/stadium_wallpaper.jpg');

        return (
            <View style={this.props.style}>
                <View style={styles.venueContainer}>
                    <Text style={styles.outerVenueLabel}>{this.props.game.venue.name}</Text>
                    <Text style={styles.outerVenueLabel}>{this.props.game.venue.time}</Text>
                </View>
                <Image style={styles.container} source={backgroundImage}>
                    <Text style={styles.innerVenueLabel}>{this.props.game.venue.cup}</Text>
                    <View style={styles.teamContainer}>
                        <Team info={this.props.game.info_home}/>
                        <Score
                            score_home={this.props.game.info_home.score}
                            shootout_home={this.props.game.info_home.shootout.score}
                            score_away={this.props.game.info_away.score}
                            shootout_away={this.props.game.info_away.shootout.score}/>
                        <Team info={this.props.game.info_away}/>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: null,
        height: null,
        paddingLeft: 15,
        paddingRight: 15
    },
    venueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: consts.colors.$lightish
    },
    outerVenueLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    innerVenueLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: consts.colors.$final,
        textShadowColor: 'black',
        textShadowOffset:{width:1,height:1}
        },
    teamContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});