import React, {Component} from 'react';
import {
		StyleSheet,
		Text,
		Image,
		View,
		Platform,
		TouchableHighlight,
		Modal,
		Dimensions
} from 'react-native';
import {Font} from 'expo';
import HistoryScreen from './screens/history.js';
import Game from './screens/game.js';
import consts from './commons/constants.js';
import * as Animatable from 'react-native-animatable';
import Icon from './components/icon.js';
import ModalEvents from './components/modal-events.js';

console.disableYellowBox = true;

export default class App extends Component {

		constructor() {
				super();
				this.state = {
						gameData: null,
						screen: {
								width: Dimensions
										.get('window')
										.width,
								height: Dimensions
										.get('window')
										.height
						}
				};
		}

		parseTimestamp(timestamp) {
				var d = new Date(timestamp);
				return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
		}

		pushTeamGoal(newState, event) {
				let goal = {
						scorer: event.label,
						time: event.time + ':00'
				};
				event.side === "home"
						? newState
								.gameData
								.info_home
								.goals
								.push(goal)
						: newState
								.gameData
								.info_away
								.goals
								.push(goal);
				return newState;
		}

		parseStateEvents() {
				let home_penalty = away_penalty = 0;
				let newState = this.state;
				newState
						.gameData
						.events
						.sort((event1, event2) => event1.time >= event2.time
								? 1
								: -1);
				for (var i = 0; i < newState.gameData.events.length; i++) {
						let event = newState.gameData.events[i];
						switch (event.category) {
								case "goal":
										newState = this.pushTeamGoal(newState, event);
										break;
								case "penaltyshot":
										if (event.side === "home") {
												if (home_penalty == newState.gameData.info_home.shootoutscore) {
														newState.gameData.events[i].label = "Missed";
												}
												home_penalty = newState.gameData.events[i].label === "Scored"
														? (home_penalty + 1)
														: home_penalty;
										} else {
												if (away_penalty == newState.gameData.info_away.shootoutscore) {
														newState.gameData.events[i].label = "Missed";
												}
												away_penalty = newState.gameData.events[i].label === "Scored"
														? (away_penalty + 1)
														: away_penalty;
										}
										break;
						}
				}
				this.setState(newState);
		}

		processShootout(score, serie) {
				let p_score = 0;
				for (var i = 0; i < serie.length; i++) {
						if (p_score == score && serie[i] === 'Scored') {
								serie[i] = 'Missed';
						}
						p_score = serie[i] === 'Scored'
								? (p_score + 1)
								: p_score;
				}
				return {score: score, serie: serie};
		}

		initGameData(remoteData) {
				this.setState({
						gameData: {
								venue: {
										name: remoteData.venue_name,
										city: remoteData.city,
										cup: remoteData.competition_name,
										time: this.parseTimestamp(remoteData.date)
								},
								info_home: {
										name: remoteData.team_data[0].name,
										score: remoteData.team_data[0].score,
										logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Blackburn_Rovers.svg/1200px' +
														'-Blackburn_Rovers.svg.png',
										shootout: this.processShootout(remoteData.team_data[0].shootoutscore, remoteData.team_data[0].shootout),
										goals: []
								},
								info_away: {
										name: remoteData.team_data[1].name,
										score: remoteData.team_data[1].score,
										logo_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Oldham_Athletic_new_badge.png',
										shootout: this.processShootout(remoteData.team_data[1].shootoutscore, remoteData.team_data[1].shootout),
										goals: []
								},
								events: remoteData.events
						}
				});
				this.parseStateEvents();
		}

		componentDidMount() {
				return fetch('https://api.myjson.com/bins/utygh', {
						method: 'GET',
						headers: {
								'Accept': 'application/json'
						}
				}).then((response) => {
						response
								.json()
								.then((responseJson) => {
										this.initGameData(responseJson);
								});
				});
		} catch (error) {
				console.error(error);
		}

		render() {
				let img = require('./assets/sportdec-diamond.png');
				let modal_height = 50;

				return this.state.gameData
						? (
								<View style={{
										flex: 1
								}}>
										<View
												style={styles.container}
												onLayout
												={(event) => {
												this.setState({
														gameData: this.state.gameData,
														screen: {
																width: event.nativeEvent.layout.width,
																height: event.nativeEvent.layout.height
														}
												});
										}}>
												<View style={styles.titleView}>
														<Image source={img} style={styles.logo}></Image>
														<Text style={styles.titleText}>Match Results</Text>
												</View>
												<Game game={this.state.gameData} style={styles.gameContainer}/>
										</View>
										<ModalEvents
												screen={this.state.screen}
												logo={img}
												modal_height={modal_height}
												events={this.state.gameData.events}/>
								</View>
						)
						: null;
		}
}
const styles = StyleSheet.create({
		container: {
				flex: 1,
				marginTop: Platform.OS === 'ios'
						? 22
						: 0,
				backgroundColor: 'white'
		},
		titleView: {
				padding: 5,
				paddingTop: 20,
				backgroundColor: consts.colors.$royal,
				flexDirection: 'row',
				alignItems: 'flex-end'
		},
		titleText: {
				marginLeft: 10,
				fontSize: 20,
				color: 'white'
		},
		logo: {
				width: 25,
				height: 25
		},
		gameContainer: {
				flex: 1,
				justifyContent: 'flex-start'
		}
});