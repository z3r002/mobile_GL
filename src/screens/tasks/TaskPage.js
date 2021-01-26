import React, {useEffect} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  View,
  CheckBox,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AuthPage from '../auth/AuthPage';

//const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContentOptions={{
//         activeTintColor: '#e91e63',
//         itemStyle: {marginVertical: 30},
//       }}>
//       <Drawer.Screen name="Logout" component={AuthPage} />
//     </Drawer.Navigator>
//   );
// }

export const TaskPage = inject('tasks')(
  observer((props) => {
    useEffect(() => {
      console.log(props.tasks.tasks.length);
      if (!props.tasks.tasks.length) {
        props.tasks.loadTasks();
      }
    }, [props]);

    const renderItem = ({item}) => {
      return (
        <View key={item.id?.toString()} style={styles.element}>
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
              onValueChange={() => props.tasks.checkTodo(item)}
            />

            <Text onPress={() => props.tasks.editTodo(item)}>{item.body}</Text>
            <TouchableOpacity onPress={() => props.tasks.deleteTodo(item)}>
              <Text style={{fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
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
        <>
          <View style={styles.container}>
            {console.log(props.tasks.tasks)}
            <FlatList
              data={props.tasks.tasks}
              renderItem={renderItem}
              numColumns={1}
            />
          </View>
          <TouchableOpacity
            onPress={(item) => props.tasks.sendTodo(item)}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              position: 'absolute',
              bottom: 40,
              right: 20,
              height: 60,
              backgroundColor: '#32CD32',
              borderRadius: 100,
            }}>
            <Text style={{fontWeight: 'bold'}}>+</Text>
          </TouchableOpacity>
        </>
      );
    }
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
