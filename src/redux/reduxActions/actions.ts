import axios from 'axios';
import {
  setAllCategories,
  setAllData,
  setPageNo,
} from '../reduxReducers/reducers';
import store from '../reduxStore';
import {GET_ALL_CATEGORIES, GET_PRODUCTS_DATA} from '../../config/urls';
import {setItem} from '../../utils/utils';

const {dispatch} = store;

export const saveCategoriesToStore = (data: any) => {
  dispatch(setAllCategories(data));
  setItem('ALL_CATEGORIES', data);
};

export const saveDataToStore = (data: any) => {
  dispatch(setAllData(data));
  setItem('ALL_PRODUCTS', data);
};

export const getAllCatogoriesAction = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(GET_ALL_CATEGORIES)
      .then(res => {
        saveCategoriesToStore(res?.data);
        setTimeout(() => {
          resolve(res);
        }, 300);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getAllProductsActionAction = (pageno: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(GET_PRODUCTS_DATA + `?limit=3&skip=${pageno || 1}`)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
