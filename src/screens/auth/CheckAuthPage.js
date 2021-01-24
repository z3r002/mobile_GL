import React from 'react';
import {ActivityIndicator} from 'react-native';
import {inject, observer} from 'mobx-react';

const CheckAuthPage = inject('auth')(
  observer((props) => {
    props.auth.check().finally(() => {
      if (props.auth.isAuth) {
        props.navigation.replace('TaskPage');
      } else {
        props.navigation.replace('AuthPage');
      }
    });

    return <ActivityIndicator />;
  }),
);
export default CheckAuthPage;
