import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import imagePath from '../constants/imagePath';
const {width} = Dimensions.get('window');
interface DropDownCompProps {
  showDropdown: Boolean;
  dropdownData: Array<any>;
  selectedCategory: String;
  onPressItem: void;
}

const DropDownComp: FC<DropDownCompProps> = ({
  dropdownData = [],
  selectedCategory = 'Category',
  onPressItem = () => {},
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const _onPress = (val: any) => {
    setShowDropdown(false);
    onPressItem(val);
  };

  return (
    <View
      style={{
        width: width / 4,
      }}>
      <TouchableOpacity
        style={styles.topView}
        activeOpacity={0.7}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text numberOfLines={1} style={styles.text}>
          {selectedCategory}
        </Text>
        <Image source={imagePath.ic_downArrow} style={styles.img} />
      </TouchableOpacity>
      {showDropdown ? (
        <ScrollView style={styles.scrollStyle} contentContainerStyle={{}}>
          {dropdownData?.map((val: any, index: Number) => {
            return (
              <TouchableOpacity
                onPress={() => _onPress(val)}
                key={String(index + val)}
                style={styles.val}>
                <Text
                  style={{
                    ...styles.valText,
                    fontWeight: selectedCategory === val ? 'bold' : '300',
                  }}>
                  {val}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
};

export default React.memo(DropDownComp);

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    width: '80%',
    textTransform: 'capitalize',
  },
  val: {
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    textTransform: 'capitalize',
  },
  valText: {
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  scrollStyle: {
    marginTop: 16,
    backgroundColor: 'white',
    maxHeight: 300,
    borderWidth: 0.5,
  },
  topView: {
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical: 8,
  },
  img: {height: 12, width: 12},
});
