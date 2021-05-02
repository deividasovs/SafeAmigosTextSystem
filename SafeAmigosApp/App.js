/**
 * @authors Deividas Ovsianikovas, Elliott Mcstay, Ryan Glynn, Evan Sourke, Padraig Halsted
 * @flow strict-local
 */

import Controller from './screens/SampleAppScreen'

///Called every time app is updated
const App = () => {
  return (Controller.instance.screen1());
};

export default App;
