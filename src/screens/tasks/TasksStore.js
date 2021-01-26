import {action, makeObservable, observable} from 'mobx';
import Network from '../../services/Network';
import prompt from 'react-native-prompt-android';

class TasksStore {
  constructor() {
    makeObservable(this);
  }

  @observable addInput = '';
  @observable tasks = [];
  @observable loader = false;
  @observable beforeEditCache = '';

  @action setAddInput = (event) => {
    this.addInput = event.target.value;
  };

  @action checkTodo = async (todo) => {
    try {
      let body = {
        done: (todo.done = !todo.done),
        id: todo.id,
      };
      await Network(`tasks/${todo.id}`, 'PATCH', body);
    } catch (e) {
      console.log(e);
    }
  };

  @action editTodo = async (todo, event) => {
    prompt(
      'Измените заметку',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (value) => {
            try {
              let body = {
                body: value,
              };
              const response = await Network(`tasks/${todo.id}`, 'PATCH', body);

              this.tasks = this.tasks.filter((task) => task.id !== todo.id);
              this.tasks = [...this.tasks, response];
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      {
        type: 'text',
        cancelable: false,
        defaultValue: (this.beforeEditCache = todo.body),
      },
    );
  };

  @action
  deleteTodo = async (todo) => {
    try {
      let body = {
        count: todo.id,
      };
      const response = await Network(`tasks/${todo.id}`, 'DELETE', body);
      this.tasks = this.tasks.filter((task) => task.id !== todo.id);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  @action
  sendTodo = async (todo) => {
    prompt(
      'Добавьте заметку',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (value) => {
            try {
              let body = {
                title: 'something',
                body: value,
                done: false,
              };
              const response = await Network('tasks', 'POST', body);
              this.tasks = [...this.tasks, response];
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
      {
        type: 'text',
        cancelable: false,
        defaultValue: (this.beforeEditCache = todo.body),
      },
    );
  };

  @action loadTasks = () => {
    this.loader = true;
    Network('tasks')
      .then((data) => (this.tasks = data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loader = false;
      });
  };
}

const tasksStore = new TasksStore();
export default tasksStore;
