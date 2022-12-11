# Electro App ⚡️

This is simple RN app done for the assignment and fun ⚡️.

Time planned to do: 1-1.5 hours.

Development focused on iOS React Native app, 
no support for Android and web for now.

Overall work done:
- data fetching implemented
- graph shown

I wasn't happy with result, therefore created separate branch with more work: [`more-time`](https://github.com/dmitrybirin/electro-app/tree/more-time)

[Gifted charts](https://gifted-charts.web.app/linechart) used for the graph

![Simulator Screen Recording - iPhone 14 - 2022-12-10 at 15 48 06](https://user-images.githubusercontent.com/11785414/206858530-a3e55f75-3d62-4ea1-9a72-2f603781a16e.gif)


Not done, but needed:
- interactivity for the graph
- icon for the app
- tests for fetching and the data functions
- use date-fns for dates
- check the actual data and dates :)
- refactor different react components from App (for now it's not too much)

## Instructions to run

```bash
npm i
cd ios && bundle exec pod install 
npm run ios
```

You can also use npx pod-install for installing Pods for iOS
