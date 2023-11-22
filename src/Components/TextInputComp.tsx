import React, {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

interface TextInputCompProps {
  inputProps: TextInputProps;
}

const TextInputComp: FC<TextInputProps & TextInputCompProps> = ({
  ...inputProps
}) => {
  return (
    <View style={styles.mainCont}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Products"
        {...inputProps}
      />
    </View>
  );
};

export default React.memo(TextInputComp);

const styles = StyleSheet.create({
  textInput: {
    marginTop: 24,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    flex: 1,
    color: 'black',
    fontSize: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
  },
  mainCont: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
    marginTop: 8,
  },
});
