import React, {FC, useEffect} from 'react';
import {Provider} from 'react-redux';

import Route from './src';
import reduxStore from './src/redux/reduxStore';
import {
  saveCategoriesToStore,
  saveDataToStore,
} from './src/redux/reduxActions/actions';
import {getItem} from './src/utils/utils';

const App = () => {
  useEffect(() => {
    _getData();
  }, []);

  const _getData = () => {
    getItem('ALL_CATEGORIES').then(cb => {
      if (cb != null) {
        saveCategoriesToStore(cb);
      }
    });

    getItem('ALL_PRODUCTS').then(cb => {
      if (cb != null) {
        saveDataToStore(cb);
      }
    });
  };

  return (
    <Provider store={reduxStore}>
      <Route />
    </Provider>
  );
};

export default App;
