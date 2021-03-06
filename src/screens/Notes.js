import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import PitchHeader from '../components/PitchHeader';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import color from '../constants/color';

const isAndroid = Platform.OS == 'android';
const viewPadding = 10;

class Notes extends Component {
  state = {
    tasks: [],
    text: '',
  };

  changeTextHandler = text => {
    this.setState ({text: text});
  };

  addTask = () => {
    let notEmpty = this.state.text.trim ().length > 0;

    if (notEmpty) {
      this.setState (
        prevState => {
          let {tasks, text} = prevState;
          return {
            tasks: tasks.concat ({key: tasks.length, text: text}),
            text: '',
          };
        },
        () => Tasks.save (this.state.tasks)
      );
    }
  };

  deleteTask = i => {
    this.setState (
      prevState => {
        let tasks = prevState.tasks.slice ();

        tasks.splice (i, 1);

        return {tasks: tasks};
      },
      () => Tasks.save (this.state.tasks)
    );
  };

  componentDidMount () {
    Keyboard.addListener (
      isAndroid ? 'keyboardDidShow' : 'keyboardWillShow',
      e => this.setState ({viewPadding: e.endCoordinates.height + viewPadding})
    );

    Keyboard.addListener (
      isAndroid ? 'keyboardDidHide' : 'keyboardWillHide',
      () => this.setState ({viewPadding: viewPadding})
    );

    Tasks.all (tasks => this.setState ({tasks: tasks || []}));
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <PitchHeader />
        <View
          style={[styles.container, {paddingBottom: this.state.viewPadding}]}
        >

          <FlatList
            style={styles.list}
            data={this.state.tasks}
            renderItem={({item, index}) => (
              <View>
                <View style={styles.listItemCont}>
                  <Text style={styles.listItem}>
                    {item.text}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.deleteTask (index)}
                    underlayColor="transparent"
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color={color.red}
                    />
                  </TouchableOpacity>

                </View>
                <View style={styles.hr} />
              </View>
            )}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={this.changeTextHandler}
            onSubmitEditing={this.addTask}
            value={this.state.text}
            placeholder="Add Notes"
            returnKeyType="done"
            returnKeyLabel="done"
          />

        </View>
      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject (tasks, callback) {
    return callback (
      tasks ? tasks.split ('||').map ((task, i) => ({key: i, text: task})) : []
    );
  },
  convertToStringWithSeparators (tasks) {
    return tasks.map (task => task.text).join ('||');
  },
  all (callback) {
    return AsyncStorage.getItem ('TASKS', (err, tasks) =>
      this.convertToArrayOfObject (tasks, callback)
    );
  },
  save (tasks) {
    AsyncStorage.setItem ('TASKS', this.convertToStringWithSeparators (tasks));
  },
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F8f8f8',
    padding: viewPadding,
  },
  list: {
    width: '100%',
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
  },
  hr: {
    height: 1,
    backgroundColor: 'lightgray',
  },
  listItemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 60,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: isAndroid ? 0 : 1,
    width: '100%',
  },
});

export default Notes;
