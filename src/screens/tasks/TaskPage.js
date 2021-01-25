import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  View,
  CheckBox,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

export const TaskPage = inject('tasks')(
  observer((props) => {
    useEffect(() => {
      props.tasks.loadTasks();
    }, [props]);

    const renderItem = ({item}) => {
      console.log(item);
      return (
        <TouchableWithoutFeedback
          key={item.id?.toString()}
          onPress={() => press(item)}
          style={styles.element}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#9ff5d3',
            }}>
            <CheckBox
              value={item.done}
              onValueChange={(event) => props.tasks.checkTodo(item, event)}
            />

            <Text>{item.body}</Text>
            <TouchableWithoutFeedback
              onPress={() => props.tasks.deleteTodo(item)}>
              <Text style={{fontWeight: 'bold'}}>X</Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      );
    };

    const press = (item) => {
      props.navigation.navigate('AuthPage');
    };
    if (props.tasks.loader) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.indicator}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {console.log(props.tasks.tasks)}
          <FlatList
            data={props.tasks.tasks}
            renderItem={renderItem}
            numColumns={1}
          />
        </View>
      );
    }

    // if (props.tasks.loader) {
    //   return <ActivityIndicator size="large" />;
    // } else {
    //   return (
    //     <View className="tasks">
    //       <View className="test">
    //         <TextInput
    //           value={props.tasks.addInput}
    //           name="addInput"
    //           onChange={(value) => props.tasks.setAddInput(value)}
    //           type="text"
    //           className="addInput"
    //           placeholder="Напишите свою задачу..."
    //         />
    //         <Text onClick={props.tasks.sendTodo} className="addButton">
    //           +
    //         </Text>
    //       </View>
    //
    //       {props.tasks.tasks.map((todo) => (
    //         <View
    //           key={todo.id}
    //           onDoubleClick={(event) => props.tasks.editTodo(todo, event)}
    //           className="item">
    //           <TextInput
    //             type="checkbox"
    //             checked={todo.done}
    //             onChange={(event) => props.tasks.checkTodo(todo, event)}
    //           />
    //           {todo.body}
    //           <View
    //             onClick={() => props.tasks.deleteTodo(todo)}
    //             className="trash">
    //             X
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //   );
    // }
  }),
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  element: {
    flex: 1,
    flexDirection: 'column',
  },
  indicator: {
    flex: 1,
  },

  image: {
    margin: 2,
    height: 30,
    width: Dimensions.get('window').width,
  },
});
