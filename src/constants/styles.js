import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginBottom: 10,
  },
  buttonStyle: {
    fontSize: 20,
    color: 'darkblue',
  },
  textStyle: {
    fontSize: 20
  },
});

export default commonStyles;
