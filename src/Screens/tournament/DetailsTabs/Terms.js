import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  I18nManager,
} from 'react-native';
import TextComponent from '../../../Components/TextComponent';
import {Colors} from '../../../Config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import Tag from '../../../Components/Tag';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import {HomeMiddleware} from '../../../Store/Middleware/HomeMiddleware';
import {showAlert} from '../../../Store/Actions/GeneralActions';
import {HomeAction} from '../../../Store/Actions/HomeAction';
import Modal from '../../../Components/Modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {constraints} from '../../../Config/Constraints';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Terms = () => {
  const insets = useSafeAreaInsets();
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const user = useSelector(state => state.AuthReducer.user);
  const isFocus = useIsFocused();
  const [matchingTeamId, setMatchingTeamId] = useState(null);

  useEffect(() => {
    for (let i = 0; i < Tour.teams.length; i++) {
      const tourTeamId = Tour.teams[i].team.id;

      for (let j = 0; j < user.teams.length; j++) {
        const userTeamId = user.teams[j].id;

        if (tourTeamId === userTeamId) {
          setMatchingTeamId(tourTeamId);
        }
      }
    }
  }, [isFocus, matchingTeamId]);

  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const [isSelected, setisSelected] = useState(
    Tour?.formalities.length > 0 ? Tour?.formalities[0] : null,
  );
  const dispatch = useDispatch();
  const [eligible, seteligible] = useState(false);
  const [acceptence, setacceptence] = useState(false);
  const [choosing, setchoosing] = useState(false);
  const [underReview, setunderReview] = useState(false);
  const [cancelReq, setcancelRequest] = useState(false);
  const [matchTourID, setMatchTourID] = useState('');

  // const checkTourID = async () => {
  //   const tourID = await AsyncStorage.getItem('tourID');
  //   setMatchTourID(tourID);
  // };

  // useEffect(() => {
  //   checkTourID();
  // }, [matchTourID, isFocus]);

  // useEffect(() => {
  //   console.log('====IDD', matchTourID);
  // }, [matchTourID]);

  useEffect(() => {
    const checkTourID = async () => {
      try {
        const tourID = await AsyncStorage.getItem('tourID');
        setMatchTourID(tourID);
      } catch (error) {
        console.error('Error retrieving tourID:', error);
      }
    };

    checkTourID();
  }, [isFocus]);

  const endsAt = Tour?.enrollmentEndsAt;
  const date = new Date(endsAt);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  // Function to add the appropriate suffix to the day
  const addSuffixToDay = day => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };
  // Extract the day and add the appropriate suffix
  const dayWithSuffix = addSuffixToDay(day);

  const formattedDate = `${month} ${dayWithSuffix}`;

  const sentRequest = () => {
    if (user?.teams?.length > 0) {
      dispatch(
        HomeMiddleware.requestToJoinTournament({
          team: user?.myTeam?.id,
          tour: Tour?.id,
        }),
      )
        .then(data => {
          let datas = {...Tour, team: data};
          dispatch(HomeAction.getTourDetail(datas));
        })
        .catch();
    } else {
      dispatch(
        showAlert({
          title: 'Team',
          message: 'Please Join Team First',
          status: 'Error',
        }),
      );
    }
  };

  const cancelRequest = () => {
    dispatch(
      HomeMiddleware.CancelRequestTournament({
        team: Tour?.team?.team,
        tour: Tour?.team?.tournament,
        id: Tour?.team?.id,
      }),
    )
      .then(() => {
        seteligible(false);
        let datas = {...Tour, team: null};
        dispatch(HomeAction.getTourDetail(datas));
      })
      .catch();
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.terms_view}>
          <FlatList
            data={Tour?.formalities}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: 5}}
            renderItem={({item, index}) => {
              return (
                <Tag
                  TextStyle={{marginVertical: I18nManager.isRTL ? 0 : 5}}
                  index={index}
                  text={t(item.key)}
                  backgroundColor={Colors.White}
                  Active={item._id == isSelected._id}
                  onPress={() => setisSelected(item)}
                />
              );
            }}
          />
          <View style={{paddingHorizontal: 15}}>
            {isSelected ? (
              <RenderHtml
                contentWidth={'100%'}
                baseStyle={{color: '#000'}}
                source={{html: isSelected?.document}}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          ...constraints.myShadow,
          backgroundColor: '#fff',
          paddingBottom: Platform.OS == 'ios' ? (insets.top != 20 ? 15 : 0) : 0,
        }}>
        {Tour?.team == null &&
        moment().diff(Tour.enrollmentEndsAt, 'day') <= 0 &&
        Tour?.status == 'UPCOMING' ? (
          <View>
            <View style={styles.bottom_View}>
              <MaterialIcons
                onPress={() => seteligible(!eligible)}
                name={eligible ? 'check-box' : 'check-box-outline-blank'}
                size={30}
                color={eligible ? Colors.SuccessGreen : Colors.Blue}
              />
              <View
                style={{
                  width: '90%',
                  marginLeft: 10,
                  marginTop: I18nManager.isRTL ? 10 : 0,
                }}>
                <TextComponent
                  style={styles.terms_text}
                  text={t(
                    'I have read and agree to the tournament terms and application usage policy',
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              disabled={eligible ? false : true}
              onPress={() => sentRequest()}
              style={[
                styles.request_button,
                {
                  backgroundColor: eligible
                    ? Colors.Dark_Blue
                    : Colors.light_purple,
                },
              ]}>
              <Text style={styles.button_text}>{t('Request to Join')}</Text>
            </TouchableOpacity>
          </View>
        ) : Tour?.team?.status == 'REVIEW' ? (
          <View>
            <View style={styles.under_review_bottom_View}>
              <TextComponent
                text={t('Under Review')}
                style={styles.underReview_text}
              />
              <TextComponent
                style={styles.terms_text}
                text={t('You can cancel your joining request at any time!')}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setcancelRequest(true);
              }}
              style={styles.cancel_request_button}>
              <Text style={styles.button_text}>
                {t('Cancel the Joining Request')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : Tour?.team?.status == 'PAYMENT' ? (
          <View>
            <View style={styles.under_review_bottom_View}>
              <TextComponent
                text={t('Initial Acceptance to Join')}
                style={styles.acceptance_text}
              />
              <TextComponent
                style={[styles.terms_text, {textAlign: 'center'}]}
                text={t(
                  'Pay the subscription fee within 3 days to avoid canceling the joining request',
                )}
              />
            </View>
            <TouchableOpacity
              // onPress={sentForApproval()}
              style={styles.acceptence_join_button}>
              <Text style={styles.accepteance_button_text}>
                {` Pay ${Tour?.entryFees + ' Sar'} to Join`}
              </Text>
            </TouchableOpacity>
          </View>
        ) : Tour?.team?.status == 'CONFIRMED' ? (
          <View>
            {matchTourID === Tour?.id ? (
              <View style={{height:60,justifyContent:'center'}}>
              <TextComponent
                style={[
                  styles.terms_text,
                  {textAlign: 'center', marginHorizontal: 20},
                ]}
                text={t(
                  'Your player lineup is locked in and ready to roll. Now, just sit tight until the tournament kicks off!',
                )}
              />
              </View>
            ) : (
              <>
                <View style={styles.under_review_bottom_View}>
                  <TextComponent
                    text={t('Approved')}
                    style={styles.acceptance_text}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TextComponent
                      style={[styles.terms_text, {textAlign: 'center'}]}
                      text={t(
                        `You can now select the players participating in the tournament, you must complete this before ${formattedDate}.`,
                      )}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PlayersList', {
                      Tour: {
                        Tid: Tour?.id,
                        age: Tour?.ageGroup,
                        genderMale: Tour?.isForMales,
                        totalRegisteredPlayers: Tour?.totalRegisteredPlayers,
                        matchingTeamId: matchingTeamId,
                      },
                    })
                  }
                  style={styles.request_button}>
                  <Text style={styles.button_text}>
                    {t('Choosing the Participating Players')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {/* <>
              <View style={styles.under_review_bottom_View}>
                <TextComponent
                  text={t('Approved')}
                  style={styles.acceptance_text}
                />
                <View style={{flexDirection: 'row'}}>
                  <TextComponent
                    style={[styles.terms_text, {textAlign: 'center'}]}
                    text={t(
                      `You can now select the players participating in the tournament, you must complete this before ${formattedDate}.`,
                    )}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PlayersList', {
                    Tour: {
                      Tid: Tour?.id,
                      age: Tour?.ageGroup,
                      genderMale: Tour?.isForMales,
                      totalRegisteredPlayers: Tour?.totalRegisteredPlayers,
                      matchingTeamId:matchingTeamId
                    },
                  })
                }
                style={styles.request_button}>
                <Text style={styles.button_text}>
                  {t('Choosing the Participating Players')}
                </Text>
              </TouchableOpacity>
            </> */}
          </View>
        ) : Tour?.team?.status == 'REJECTED' ? (
          <View style={styles.under_review_bottom_View}>
            <TextComponent
              text={t('Your Team has not been Selected')}
              style={{color: Colors.Blue}}
            />
            <TextComponent
              style={[styles.terms_text, {textAlign: 'center'}]}
              text={t(
                'Unfortunately, you were not selected for this tournament due to the large number of participants. We wish you to participate in the upcoming tournaments',
              )}
            />
          </View>
        ) : (
          <View style={styles.under_review_bottom_View}>
            <TextComponent
              text={t('Receiving Applications to Join has Closed')}
              style={{color: Colors.Blue}}
            />
            <TextComponent
              style={[styles.terms_text, {textAlign: 'center'}]}
              text={t(
                'Receiving applications for joining may be reopened in the event that we do not complete the required number of tournaments, keep following up',
              )}
            />
          </View>
        )}
      </View>

      {/* <<<<<<<<<================ Not Selected Bottom View ===================>>>>> */}
      {/* <View style={styles.under_review_bottom_View}>
              <TextComponent text={t('Your Team has not been Selected')} style={{ color: Colors.Blue }} />
              <TextComponent style={[styles.terms_text, { textAlign: 'center' }]} text={t('Unfortunately, you were not selected for this tournament due to the large number of participants. We wish you to participate in the upcoming tournaments')} />
            </View> */}

      {/* <<<<<<<<<================ Receiveing Closed Bottom View ===================>>>>> */}
      {/* <View style={styles.under_review_bottom_View}>
          <TextComponent text={t('Receiving Applications to Join has Closed')} style={{ color: Colors.Blue }} />
          <TextComponent style={[styles.terms_text, { textAlign: 'center' }]} text={t('Receiving applications for joining may be reopened in the event that we do not complete the required number of tournaments, keep following up')} />
        </View> */}
      <Modal
        animationType={'fade'}
        visible={cancelReq}
        close={true}
        text={t('Confirm')}
        OnClose={() => {
          setcancelRequest(false);
          cancelRequest();
        }}>
        <View
          style={{
            height: 180,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => setcancelRequest(false)}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 30,
            }}>
            <Ionicons
              name={'ios-close-circle-outline'}
              size={28}
              color={Colors.textColor}
            />
          </TouchableOpacity>
          <Ionicons
            name={'alert-circle-outline'}
            size={50}
            color={Colors.textColor}
          />
          <TextComponent
            text={t('Are you sure you want\ncancel the request?')}
            style={{fontSize: 22, color: Colors.textColor, textAlign: 'center'}}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  terms_view: {
    backgroundColor: Colors.White,
    paddingVertical: 10,
  },
  terms_text: {
    fontSize: 13,
    color: Colors.Blue,
    marginVertical: 3,
    lineHeight: 18,
  },
  bottom_View: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  request_button: {
    backgroundColor: Colors.Dark_Blue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 10,
  },
  cancel_request_button: {
    backgroundColor: Colors.cancel_red,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 10,
  },
  acceptence_join_button: {
    backgroundColor: '#00E283',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 10,
  },
  button_text: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: I18nManager.isRTL ? 'NotoSansArabic-Medium' : 'OpenSans-Medium',
  },
  accepteance_button_text: {
    color: Colors.Blue,
    fontSize: 16,
  },
  sub_toptab_element: {
    backgroundColor: Colors.Blue,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
    marginHorizontal: 5,
  },
  toptab_text: {
    color: Colors.SuccessGreen,
    fontSize: 12,
  },
  sub_toptab_view: {
    flexDirection: 'row',
    // alignItems: "center"
  },
  under_review_bottom_View: {
    alignItems: 'center',
    padding: 10,
    paddingTop: 13,
  },
  underReview_text: {
    color: '#F67E00',
  },
  acceptance_text: {
    color: '#00E283',
  },
});
