import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Utils} from '../../config';
import {MApAction} from '../../store/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Map = () => {
  const mapRef = useRef();
  const [location, setLocation] = useState({});
  const [region, setRegion] = useState({});
  const [address, setAddress] = useState('');
  const [loader, setLoader] = useState(true);
  const [marginBottom, setMarginBottom] = useState(1);

  useEffect(() => {
    Geocoder.init('AIzaSyDpjC5dmFxhdUHi24y0ZH6PGD_NhOLFCMA');
    getLocation();
  }, []);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setLocation(location);
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        getAddress(location);
        setLoader(false);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  const getAddress = location => {
    console.log('location', location);
    Geocoder.from(location?.latitude, location?.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const getPysicalAddress = location => {
    Geocoder.init('AIzaSyDpjC5dmFxhdUHi24y0ZH6PGD_NhOLFCMA');
    setTimeout(() => {
      Geocoder.from(location.description)
        .then(json => {
          var location = json.results[0].geometry.location;
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          mapRef.current.animateToRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        })
        .catch(error => console.warn(error));
    }, 1000);
  };
  return (
    <View style={styles.containerView}>
      <View>
        {/* <Header.Standard
          leftIconName={'arrow-left'}
          onPressLeft={NavigationService.goBack}
          Heading={address ? address : 'Location'}
        /> */}
        <View
          style={{
            zIndex: 1000,
            position: 'relative',

            width: '100%',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 70,
              left: 0,
              zIndex: 9999,
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <GooglePlacesAutocomplete
              placeholder={address}
              placeholderTextColor="#000"
              listViewDisplayed={true}
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details = null) => {
                getPysicalAddress(data);
              }}
              textInputProps={{placeholderTextColor: '#999'}}
              styles={{
                textInput: {
                  height: 45,
                  fontSize: 16,
                  color: '#000',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 5.46,

                  elevation: 9,
                },
                predefinedPlacesDescription: {
                  color: '#000',
                },
              }}
              query={{
                key: 'AIzaSyDpjC5dmFxhdUHi24y0ZH6PGD_NhOLFCMA',
                language: 'en',
              }}
              currentLocation={true}
              currentLocationLabel="Current location"
            />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={[styles.map, {marginBottom: marginBottom}]}
            initialRegion={region}
            showsCompass={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            onRegionChangeComplete={region => {
              setRegion(region);
            }}
            onMapReady={() => {
              setMarginBottom(0);
            }}>
            <Marker
              title="You are here"
              //  description='This is a description'
              coordinate={location}
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

export default Map;
