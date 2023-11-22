import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface CardCompProps {
  imageProps: ImageProps;
  headerText: String;
  descriptionText: String;
}

const CardComp: FC<CardCompProps & ImageProps> = ({
  headerText = '',
  descriptionText = '',
  ...imageProps
}) => {
  return (
    <View style={styles.mainCont}>
      <View>
        <Image resizeMode="contain" style={styles.img} {...imageProps} />
      </View>
      <View style={styles.viewStyle}>
        <Text style={styles.text}>{headerText}</Text>
        <Text style={styles.text1}>{descriptionText}</Text>
      </View>
    </View>
  );
};

export default React.memo(CardComp);

const styles = StyleSheet.create({
  viewStyle: {
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    width: '100%',
  },
  img: {
    height: 96,
    width: 96,
    backgroundColor: 'black',
    borderRadius: 8,
  },

  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    width: '70%',
  },
  text1: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    width: '72%',
  },
  mainCont: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
});
