import {StyleSheet} from 'react-native';
const mainSpace = 20;
const mainColor = '#21303e';
const backgroundColor = '#f2f3f4';
const purpleColor = '#AA23B6';
export const ReservationStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {fontSize: 14, fontWeight: 'bold', color: '#cccee8'},
  subtitle: {fontSize: 14, color: '#8395c7', marginVertical: 4},
  card: {
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 20,
    marginVertical: 4,
    elevation: 4,
  },
  infoSection: {
    backgroundColor: mainColor,
    borderTopRightRadius: 6,
    padding: mainSpace,
    borderTopLeftRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 6,
    padding: mainSpace,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 6,
    paddingHorizontal: mainSpace,
    marginVertical: 14,
  },
  parking: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  parkingDate: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
    color: 'black',
  },
  durationSection: {
    paddingVertical: 14,
    backgroundColor: backgroundColor,
  },
  durationTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  durationTitle: {
    fontSize: 12,
    // fontWeight: 'bold',
    color: '#a9a9a9',
    textAlign: 'center',
  },

  price: {
    color: 'black',
    fontWeight: 'bold',
  },
  finalPriceTitle: {
    fontSize: 18,
  },
  finalPrice: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonView: {
    backgroundColor: 'white',
    padding: mainSpace,
  },
  button: {
    backgroundColor: mainColor,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authCard: {
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 20,
    marginVertical: mainSpace,
    elevation: 4,
    padding: mainSpace,
  },
  cardTitle: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: mainSpace,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    color: purpleColor,
  },
  authButtonText: {
    color: purpleColor,
    fontWeight: 'bold',
  },
  dividerTitle: {textAlign: 'center', marginVertical: 10},
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#5a6689',
    marginHorizontal: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLabel: {
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
  },
  dialogContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16,
  },
  dialogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginHorizontal: 6,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 6,
    marginTop: 10,
  },
  dialogButton: {
    backgroundColor: mainColor,
    flex: 1,
    paddingVertical: 6,
  },
  dialogButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  dialogInfoText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledPaymentCard: {backgroundColor: '#e0e0e0'},
  disabledPaymentLabel: {color: '#a0a0a0'},
});
