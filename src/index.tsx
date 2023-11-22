import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

import {useSelector} from 'react-redux';
import CardComp from './Components/CardComp';
import DropDownComp from './Components/DropDownComp';
import TextInputComp from './Components/TextInputComp';
import {GET_PRODUCTS_BY_CATEGORY, SEARCH_API} from './config/urls';
import {
  getAllCatogoriesAction,
  getAllProductsActionAction,
  saveDataToStore,
} from './redux/reduxActions/actions';

const {height} = Dimensions.get('window');

interface AppProps {
  data: any;
  isLoading: any;
  fetchProductData: void;
}

const Route: FC<AppProps> = () => {
  const allCategoriesFromStore = useSelector(
    (state: any) => state?.reducers?.allCategories || [],
  );
  const allProductsFromStore = useSelector(
    (state: any) => state?.reducers?.allData || [],
  );

  console.log(allProductsFromStore, 'allProductsFromStore');

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState(allCategoriesFromStore || []);
  const [selectedCat, setselectedCat] = useState('Category');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMoreData, setIsMoreData] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (
      Array.isArray(allCategoriesFromStore) &&
      allCategoriesFromStore.length > 0
    ) {
      setCategories(allCategoriesFromStore);
    }
  }, [allCategoriesFromStore]);

  useEffect(() => {
    if (searchQuery.trim() === '') return;
    if (
      Array.isArray(allProductsFromStore) &&
      allProductsFromStore.length > 0
    ) {
      setData(allProductsFromStore);
    }
  }, [allProductsFromStore]);

  useEffect(() => {
    getAllCatogoriesAction();
    fetchProductData(1);
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      saveDataToStore(data);
    }
  }, [data]);

  useEffect(() => {
    setIsMoreData(false);
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        hitSearchApi(1);
      } else {
        setselectedCat('Category');
        setIsMoreData(false);
        setPage(1);
        fetchProductData(1);
      }
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const hitSearchApi = async (pageNo: number) => {
    try {
      const response = await axios.get(
        SEARCH_API + `?limit=20&skip=${pageNo || 1}&q=${searchQuery || ''}`,
      );
      const result = response?.data;
      console.log(result, 'resultresultresultresultresultresult', pageNo);

      if (Array.isArray(result?.products) && result?.products.length > 0) {
        let new_Arr = result?.products?.map((val: any) => {
          return {...val, data: val?.images};
        });
        if (pageNo === 1) {
          setData(new_Arr);
        } else {
          setData([...data, ...new_Arr]);
        }
        if (result?.products.length === 20) {
          setPage(pageNo + 1);
          setIsMoreData(true);
        } else {
          setIsMoreData(false);
        }
      } else {
        setData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsMoreData(false);
      console.error('Error fetching search results:', error);
    }
  };

  const hitCatSearchApi = async (val: any) => {
    setSearchQuery('');
    setIsLoading(true);
    setselectedCat(val);
    try {
      const response = await axios.get(GET_PRODUCTS_BY_CATEGORY + `/${val}`);
      let result = response?.data;
      if (Array.isArray(result?.products) && result?.products?.length > 0) {
        let new_Arr = result?.products?.map((val: any) => {
          return {...val, data: val?.images};
        });
        setData(new_Arr);
      }
      console.log('result', response?.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching products by category:', error);
    }
  };

  const fetchProductData = async (pageno: any) => {
    getAllProductsActionAction(pageno)
      .then((res: any) => {
        const result = res?.data;
        console.table(pageno, isMoreData, 'resultresult', result);

        if (Array.isArray(result?.products) && result?.products.length === 3) {
          setPage(pageno + 1);
          setIsMoreData(true);
        } else {
          setIsMoreData(false);
        }
        setRefresh(false);
        if (Array.isArray(result?.products) && result?.products?.length > 0) {
          let new_Arr = result?.products?.map((val: any) => {
            return {...val, data: val?.images};
          });

          if (pageno === 1) {
            setData(new_Arr);
          } else {
            setData([...data, ...new_Arr]);
          }
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsMoreData(false);
        setRefresh(false);
        setIsLoading(false);
      });
  };

  const _onEndReached = () => {
    if (searchQuery.trim() !== '') {
      setIsMoreData(false);
      return;
    }
    if (selectedCat !== 'Category') {
      setIsMoreData(false);
      return;
    }
    if (isMoreData) {
      fetchProductData(page);
    }
  };

  const _onRefresh = () => {
    setSearchQuery('');
    setIsMoreData(false);
    setRefresh(true);
    fetchProductData(1);
    setselectedCat('Category');
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const renderItem = element => {
    return (
      <CardComp
        key={String(element?.index)}
        headerText={element?.section?.title}
        descriptionText={element?.section?.description}
        source={{uri: element?.item}}
      />
    );
  };

  return (
    <View style={styles.mainCont}>
      <Text style={styles.headerText}>{'Products'}</Text>
      <View style={styles.dropView}>
        <DropDownComp
          selectedCategory={selectedCat}
          dropdownData={categories}
          onPressItem={(val: any) => hitCatSearchApi(val)}
        />
      </View>
      <TextInputComp
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <SectionList
        style={{marginTop: 32}}
        sections={data}
        extraData={data}
        keyExtractor={(item, index) => String(item + index)}
        renderSectionHeader={({section: {brand}}) => {
          return <Text style={styles.header}>{brand}</Text>;
        }}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.loadmore}>
              <Text style={styles.header}>{'No Data Found'}</Text>
            </View>
          )
        }
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={_onEndReached}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={_onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{marginBottom: 110}}>
            {isMoreData && (
              <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" color={'blue'} />
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

export default Route;

const styles = StyleSheet.create({
  loadmore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2,
  },
  mainCont: {
    flex: 1,
    marginTop: height / 14,
    paddingHorizontal: 16,
    zIndex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  dropView: {
    position: 'absolute',
    zIndex: 2,
    end: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    backgroundColor: 'lightgrey',
    paddingVertical: 4,
    color: 'black',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
});
