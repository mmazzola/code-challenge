import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Font} from 'expo';
import HistoryScreen from './../screens/history.js';
import consts from './../commons/constants.js';
import Icon from './../components/icon.js';

export default class ModalEvents extends Component {

    constructor(props) {
        super(props);

        // Initialize component state
        this.state = {
            modalVisible: false,
            height: props.modal_height,
            rotate: "0deg",
        };
    }

    toggleModal() {
        this.setState({
            rotate: this.state.rotate == "0deg"
                ? "180deg"
                : "0deg",
            height: !this.state.modalVisible
                ? this.props.screen.height + 25
                : this.props.modal_height,
            modalVisible: !this.state.modalVisible,
        });
    }

    render() {

        return (
            <Animatable.View
                style={{
                height: this.state.height || this.props.modal_height,
                width: this.props.screen.width,
            }}
                transition="height"
                duration={50}>
                <TouchableHighlight
                    onPress={() => {
                    this.toggleModal();
                }}>
                    <View
                        style={[
                        styles.titleEventView, {
                            height: this.props.modal_height
                        }
                    ]}>
                        <View style={styles.titleEventLeft}>
                            <Image source={this.props.logo} style={styles.logo}></Image>
                            <Text style={styles.titleEventText}>See Match Events</Text>
                        </View>
                        <Animatable.Image
                            source={require('./../assets/arrow_up.png')}
                            transition="rotate"
                            duration={1000}
                            delay={0}
                            style={{
                            width: 25,marginRight:10,
                            height: 25,
                            tintColor: 'white',
                            transform: [
                                {
                                    rotate: this.state.rotate || "0deg"
                                }
                            ]
                        }}></Animatable.Image>
                    </View>
                </TouchableHighlight>
                     <HistoryScreen  events={this.props.events} style={styles.eventContainer}/>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    titleEventView: {
        flexDirection: 'row',
        paddingRight: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: consts.colors.$royal,
        borderWidth: 0.5,
        borderBottomColor: 'black'
    },
    logo: {
        width: 25,
        height: 25
    },
    titleEventLeft: {
        flexDirection: 'row',
        paddingLeft: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleEventText: {
        marginLeft: 10,
        fontSize: 20,
        color: 'white'
    },
    eventContainer: {
        flex: 0
    }
});