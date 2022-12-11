# Electro App ⚡️

This is simple RN app done for the assignment and fun ⚡️.

Development focused on iOS React Native app, 
no support for Android and web for now.

Overall work done:
- data fetching implemented
- graph shown

This was implemtented overall for ~4 hours

![Simulator Screen Recording - iPhone 14 - 2022-12-11 at 04 44 04](https://user-images.githubusercontent.com/11785414/206883919-fca81607-2086-4917-87d7-d60b7b3ef93a.gif)


[Victory charts](https://formidable.com/open-source/victory) used for the graph


Not done, but needed:
- [x] interactivity for the graph (possible to scroll, selecting the bar problematic, cause of bug in VictoryCharts)
- [x] icon for the app
- [x] tests for fetching and the data functions
- [x] use date-fns for dates
- [x] check the actual data and dates :)
- [x] refactor different react components from App (for now it's not too much)

## Instructions to run

```bash
npm i
cd ios && bundle exec pod install 
npm run ios
```

You can also use npx pod-install for installing Pods for iOS
