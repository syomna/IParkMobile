import {StyleSheet} from 'react-native';
const mainSpace = 20;
const mainColor = '#21303e';
export const AuthStyle = StyleSheet.create({
  loginBody: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: mainSpace,
    paddingVertical: mainSpace,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 25,
    marginTop: 4,
  },
  button: {
    backgroundColor: mainColor,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    right: mainSpace,
    bottom: mainSpace,
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  input: {
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 16,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  back: {
    position: 'absolute',
    bottom: mainSpace,
    left: mainSpace,
    textDecorationLine: 'underline',
  },
});
