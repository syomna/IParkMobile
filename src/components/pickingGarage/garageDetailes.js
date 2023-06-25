/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {Paragraph} from 'react-native-paper';
import {kCalculatePrice, kFormatDuration} from '../../utils/Constants';
import {Tab} from '@rneui/themed';
import svg1 from '../../assets/imgs/how_to_park_step_1.png';
import svg2 from '../../assets/imgs/how_to_park_step_2.png';
import svg3 from '../../assets/imgs/how_to_park_step_3.png';
import {getSelectedGarage} from '../../redux/slices/selectedGarage';
import {useNavigation} from '@react-navigation/native';
import {kRoutes} from '../../utils/routes';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const maxTranslateY = -SCREEN_HEIGHT + 10;
export const bottomSheetRefProps = {
  scrollTo: destination => {},
};

const GaragDetails = React.forwardRef(({id}, ref) => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.garageSpaces);
  const {duration} = useSelector(state => state.dateGeocode);
  const [garage, setGarage] = useState([]);
  // const { duration } = useSelector((state) => state.dateGeocode);
  const translateY = useSharedValue(0);
  const contxt = useSharedValue({y: 0});
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    setGarage(data.filter(g => g.garage.id === id));
  }, [data, id]);
  const scrollTo = useCallback(
    destination => {
      'worklet';
      translateY.value = withSpring(destination, {damping: 50});
    },
    [translateY],
  );
  useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);
  const gesture = Gesture.Pan()
    .onStart(() => {
      contxt.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + contxt.value.y;
      translateY.value = Math.max(translateY.value, maxTranslateY);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 0.25) {
        scrollTo(0);
      }
    });
  const reStyleBottomSheet = useAnimatedStyle(() => {
    // const borderRadius = interpolate(translateY.value, [maxTranslateY + 50, maxTranslateY], [25, 5], Extrapolate.CLAMP);
    return {
      // borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });
  if (garage.length <= 0) {
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );
  }
  // console.log(` details ${garage[0].garage.address}`);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, reStyleBottomSheet]}>
        <View style={styles.line} />
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 18}}>
            {garage[0].garage.garageName}
          </Text>
        </View>
        <Paragraph>
          <Text style={{fontSize: 14}}>{garage[0].garage.address}</Text>
        </Paragraph>
        <Paragraph>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Stars ></Stars> */}
              <Text>
                {garage[0].garage.reviews && garage[0].garage.reviews.length}
              </Text>
            </View>
          </View>
        </Paragraph>
        <View
          style={{backgroundColor: '#bfbcbc38', padding: 10, marginTop: 30}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: 'gray',
                paddingVertical: 5,
              }}>
              <Text style={{fontWeight: '600', color: '#000'}}>
                {kFormatDuration(duration)}
              </Text>
              <Text>Total duration</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: 'gray',
                paddingVertical: 5,
              }}>
              <Text style={{fontWeight: '600', color: '#000'}}>
                EGP{' '}
                {kCalculatePrice(duration, garage[0].garage.pricePerHour, 5)}
              </Text>
              <Text>Parking fee</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', paddingVertical: 5}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontWeight: '600', color: '#000'}}>
                  {garage[0].distance}
                </Text>
              </View>
              <Text>To destination</Text>
            </View>
          </View>
        </View>
        <Tab style={{marginTop: 30}} value={index} onChange={setIndex} dense>
          <Tab.Item
            style={{borderColor: '#000'}}
            titleStyle={{color: '#AA23B6'}}>
            Information
          </Tab.Item>
          <Tab.Item titleStyle={{color: '#AA23B6'}}>Reviews</Tab.Item>
          <Tab.Item titleStyle={{color: '#AA23B6'}}>How to park</Tab.Item>
        </Tab>
        <View style={index === 0 ? {height: 380} : styles.d_none}>
          <Text style={styles.description}>{garage[0].garage.description}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}>
            <Image
              source={{uri: garage[0].garage.imagesURL[0]}}
              style={styles.image}
            />
            <Image
              source={{uri: garage[0].garage.imagesURL[1]}}
              style={styles.image}
            />
          </View>
        </View>
        <View style={index === 1 ? {height: 380} : styles.d_none}>
          <Text style={styles.description}>There are no reviews</Text>
        </View>
        <View style={index === 2 ? {height: 380} : styles.d_none}>
          <View style={styles.container}>
            <View style={styles.item}>
              <Image source={svg1} style={[styles.imag, {marginTop: 25}]} />
              <View style={styles.itemContent}>
                <Text style={styles.boldText}>Once you've paid</Text>
                <Text style={{color: '#000', marginTop: 10}}>
                  You'll receive directions to the space and information on how
                  to access it
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Image source={svg2} style={styles.imag} />
              <View style={styles.itemContent}>
                <Text style={{color: '#000'}}>
                  The space owner/car park is notified of your booking
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Image source={svg3} style={styles.imag} />
              <View style={styles.itemContent}>
                <Text style={{color: '#000'}}>
                  Just turn up, park your vehicle and get on with your day!
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#AA23B6',
            // width: '100%',
            padding: 12,
            // borderRadius: 10,
            // marginVertical: 10,
          }}
          onPress={() => {
            const garageObj = garage[0].garage;
            const price = kCalculatePrice(
              duration,
              garage[0].garage.pricePerHour,
            );
            dispatch(getSelectedGarage({garageObj, price}));
            navigation.navigate(kRoutes.reservation);
          }}>
          <Text style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
});
export default GaragDetails;
const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: 20,
    color: '#000',
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 25,
  },
  d_block: {
    display: 'block',
  },
  d_none: {
    display: 'none',
  },
  image: {
    width: 150,
    height: 100,
  },
  description: {
    marginVertical: 20,
    color: '#000',
  },
  container: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imag: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  itemContent: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    fontSize: 18,
    marginTop: 15,
  },
});
