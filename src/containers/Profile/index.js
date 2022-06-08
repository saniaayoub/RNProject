import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Colors, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';

const Profile = () => {
  const refRBSheet = useRef();
  const loader = useSelector(state => state.AppReducer.loader);
  const userInfo = useSelector(state => state.AppReducer.userInfo);
  const userImage = useSelector(state => state.AppReducer.profileImg);
  const [userObj, setUserObj] = useState({});
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [validName, setValidName] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [validState, setValidState] = useState(true);
  const [validCountry, setValidCountry] = useState(true);
  const [validphoneno, setValidphoneno] = useState(true);
  const [errName, setErrName] = useState('');
  const [errAddress, setErrAddress] = useState('');
  const [errState, setErrState] = useState('');
  const [errCountry, setErrCountry] = useState('');
  const [errphoneno, setErrphoneno] = useState('');

  useEffect(() => {
    setUserObj({
      name: '',
      email: '',
      state: '',
      address: '',
      country: '',
      phoneno: '',
    });
    dispatch(AppAction.GetInfo());
    dispatch(AppAction.ImgRetrieve());
    setTimeout(() => {
      setUserObj(userInfo);
    }, 100);
  }, []);

  const saveInfo = () => {
    if (!userObj.name) setErrName('Name cannot be empty');
    if (!userObj.email) setErrState('email cannot be empty');
    if (!userObj.state) setErrState('state cannot be empty');
    if (!userObj.address) setErrAddress('address cannot be empty');
    if (!userObj.country) setErrCountry('country cannot be empty');
    if (!userObj.phoneno) setErrphoneno('phonenono cannot be empty');
    else if (!validName) setErrName('Please enter valid name.');
    else if (!validState) setErrState('Please enter valid state.');
    else if (!validAddress) setErrAddress('Please enter valid address.');
    else if (!validCountry) setErrCountry('Please enter valid Country name.');
    else if (!validphoneno) setErrphoneno('Please enter valid phoneno no.');
    else dispatch(AppAction.SaveInfo(userObj));
  };

  const ImagePicker = () => {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity
          onPress={() => captureImage('photo')}
          style={{
            flexDirection: 'row',
            marginLeft: Metrix.HorizontalSize(20),
            marginTop: Metrix.VerticalSize(20),
          }}>
          <Icon name={'camera'} color={'black'} size={26} />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: Metrix.FontLarge,
              marginLeft: Metrix.HorizontalSize(20),
            }}>
            {' '}
            Capture Image{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => chooseFile('photo')}
          style={{
            flexDirection: 'row',
            marginLeft: Metrix.HorizontalSize(20),
            marginTop: Metrix.VerticalSize(20),
          }}>
          <Icon name={'upload'} color={'black'} size={26} />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: Metrix.FontLarge,
              marginLeft: Metrix.HorizontalSize(20),
            }}>
            {' '}
            Upload From Gallery{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        refRBSheet.current.close();
        dispatch(AppAction.ImgUpload({image: response.assets[0].uri}));
        dispatch(AppAction.ImgRetrieve());
        setImage(response.assets[0].uri);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      refRBSheet.current.close();
      dispatch(AppAction.ImgUpload({image: response.assets[0].uri}));
      dispatch(AppAction.ImgRetrieve());
      setImage(response.assets[0].uri);
    });
  };

  return (
    <View style={styles.container}>
      <Header.Standard
        leftIconName={'arrow-left'}
        onPressLeft={NavigationService.goBack}
        Heading={'Profile'}
      />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.White, fontSize: Metrix.FontExtraLarge}}>
            My Profile
          </Text>
          <Text style={{color: Colors.White, fontSize: Metrix.FontSmall}}>
            Please Complete your Profile
          </Text>
          <View style={{borderColor: 'red', borderWidth: 1}}>
            <Image
              source={{uri: image ? image : userImage}}
              style={styles.imageStyle}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                bottom: 10,
                zIndex: 1000,
              }}
              onPress={() => refRBSheet.current.open()}>
              <Icon name={'camera'} color={'red'} size={15} />
            </TouchableOpacity>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                container: {
                  borderTopLeftRadius: Metrix.VerticalSize(20),
                  borderTopRightRadius: Metrix.VerticalSize(20),
                  height: Metrix.VerticalSize(200),
                },
                wrapper: {
                  backgroundColor: 'transparent',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <ImagePicker />
            </RBSheet>
          </View>
          <View style={{paddingBottom: Metrix.VerticalSize(5)}}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Name{' '}
            </Text>
            <Forminput.TextField
              placeholder={'ABC'}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={name => {
                let validName = Utils.isFullNameValid(name);
                setUserObj({...userObj, name: name});
                setValidName(validName);
                setErrName('');
              }}
              errMsg={errName}
              value={userObj.name}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View
            style={{
              paddingTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
            }}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Email{' '}
            </Text>
            <Forminput.TextField
              placeholder={'XYZ'}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={email => {
                setUserObj({...userObj, email: email});
              }}
              value={userObj.email}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View style={{paddingVertical: Metrix.VerticalSize(5)}}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Address{' '}
            </Text>
            <Forminput.TextField
              placeholder={'Example'}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={address => {
                let validAddress = Utils.isFullNameValid(address);
                setUserObj({...userObj, address: address});
                setValidAddress(validAddress);
                setErrAddress('');
              }}
              errMsg={errAddress}
              value={userObj.address}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>

          <View style={{paddingVertical: Metrix.VerticalSize(5)}}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              State{' '}
            </Text>
            <Forminput.TextField
              placeholder={'ABC'}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={state => {
                let validState = Utils.isFullNameValid(state);
                setUserObj({...userObj, state: state});
                setValidState(validState);
                setErrState('');
              }}
              errMsg={errState}
              value={userObj.state}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View
            style={{
              paddingTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
            }}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              Country{' '}
            </Text>
            <Forminput.TextField
              placeholder={'ABC'}
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={country => {
                let validCountry = Utils.isFullNameValid(country);
                setUserObj({...userObj, country: country});
                setValidCountry(validCountry);
                setErrCountry('');
              }}
              errMsg={errCountry}
              value={userObj.country}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <View
            style={{
              paddingTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
            }}>
            <Text
              style={{
                paddingTop: Metrix.VerticalSize(5),
                color: Colors.White,
                fontSize: Metrix.FontSmall,
              }}>
              {' '}
              phoneno No.{' '}
            </Text>
            <Forminput.TextField
              placeholder={'123454'}
              returnKeyType="done"
              autoCapitalize="none"
              onChangeText={phoneno => {
                let validphoneno = Utils.isPhoneNumberValid(phoneno);
                setUserObj({...userObj, phoneno: phoneno});
                setValidphoneno(validphoneno);
                setErrphoneno('');
              }}
              errMsg={errphoneno}
              value={userObj.phoneno}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
              onSubmitEditing={() => saveInfo()}
            />
          </View>
          <Button.Standard
            text="Save"
            isLoading={loader}
            disabled={loader}
            onPress={() => {
              saveInfo();
            }}
            containerStyle={{marginTop: Metrix.VerticalSize(35)}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
