# Sportdec front-end code challenge

##Assumptions and useful infos
* I assumed that in a real app scenario, some sort of team logo would have been provided, so I added manually in the info as if they were taken from the JSON.
* To mock interaction with a back-end Rest Service I hosted the JSON you provided at https://api.myjson.com/bins/utygh if, for some reason, it gets taken down you just need to replce the url in App.js at the beginning of "componentDidMount() line 144".
* The labels of the shootouts serie did not match with the ending of the game, so i add a bit of logic in the parsing of the JSON to correct the issue.
* The screenshoots of the two mains screens can be found in the folder "/screens/".

## Future Improvements
* Provide test
* Combine similar stylesheet in standard styles (es. for text: paragraph, title, subtitle...).
* Develop a library that manually adds svg as in this implementation directly from .svg file.
* Fully support landscape mode (currently UI renders almost correctly.) 

## Build info
The application was started up with Create React Native App, so it can be started with just npm start. I debugged it on my Android device using Expo and on an iOS simulator.