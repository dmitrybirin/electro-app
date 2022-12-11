# Electro App ⚡️

This is simple RN app done for the assignment and fun ⚡️.

Development focused on iOS React Native app, 
no support for Android and web for now.

Overall work done:
- data fetching implemented
- graph shown

This was implemtented overall for 4 hours

[Victory charts](https://formidable.com/open-source/victory) used for the graph


Not done, but needed:
- [x] interactivity for the graph (possible to scroll, selecting the bar problematic, cause of bug in VictoryCharts)
- [x] icon for the app
- [ ] tests for fetching and the data functions
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
