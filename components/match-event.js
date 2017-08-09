import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import consts from './../commons/constants.js';
import Icon from './../components/icon.js';

export default class MatchEvent extends React.PureComponent {

    render() {

        let iconName;
        let showIcon = true;
        let addLabel = '';
        switch (this.props.event.category) {
            case 'goal':
                iconName = 'Goal';
                break;
            case 'period_change':
                iconName = 'Whistle';
                break;
            case 'substitution_on':
                addLabel = 'In: ';
                iconName = 'Substitution';
                break;
            case 'substitution_off':
                addLabel = 'Out: ';
                iconName = 'Substitution';
                break;
            case 'booking':
                iconName = this.props.event.value;
                break;
            case 'penaltyshot':
                iconName = this.props.event.value === 'Scored'
                    ? 'PenaltyScored'
                    : 'PenaltyMissed';
                break;
            default:
                showIcon = false;
                break;
        }

        let sideProperty = 'flex-start';
        if (this.props.event.side == 'away') {
            sideProperty = 'flex-end';
        } else if (this.props.event.side == 'both') {
            sideProperty = 'center';
        }

        let minuteShow = this.props.event.period != null || this.props.event.category == "period_change";

        return (
            <View
                style={[
                styles.container, {
                    justifyContent: sideProperty
                }
            ]}>
                <View style={styles.centerView}></View>
                <View style={styles.boxView}>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: minuteShow
                            ? 'space-between'
                            : 'center'
                    }}>
                        {showIcon
                            ? (<Icon name={iconName} width={20} height={20}/>)
                            : null}
                        {minuteShow
                            ? <Text>Minute: {this.props.event.time}</Text>
                            : null}
                    </View>
                    <Text style={styles.label}>{addLabel + this.props.event.label}</Text>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: consts.colors.$stable
    },
    boxView: {
        borderColor: consts.colors.$royal,
        backgroundColor: consts.colors.$stable,

        width: '40%',
        margin: 10,
        padding: 5,
        borderWidth: 3,
        borderRadius: 4,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    centerView: {
        position: 'absolute',
        left: '48%',
        top: 0,
        width: '1%',
        height: '100%',
        backgroundColor: consts.colors.$calm
    },
    label: {
        width: "100%",
        margin: 5,
        textAlign: 'center'
    }
});