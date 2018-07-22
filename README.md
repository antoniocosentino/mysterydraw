<img src='/src/mystery.png' width='50%' />

**Live demo**: https://antoniocosentino.github.io/mysterymachine/

This is a small React.js utility for creating small groups of people starting from a team members list.

The randomization is pretty simple, the idea is to avoid close repetitions as much as possible. The app is not saving any data, the list is updated by the client and it's lost when the browser is closed / refreshed. 

If the requested n. of groups is bigger than the available data, team members will be repeated. This is particularly useful for the planning of team events, i.e. Mystery Lunches etc.

To run locally:
- clone this repo
- `npm i`
- `npm start`
