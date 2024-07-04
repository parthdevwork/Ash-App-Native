import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Pressable,
  Text,
} from 'react-native';
import TextComponent from '../../../Components/TextComponent';
import {Colors} from '../../../Config/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  persons,
  defender1,
  defender2,
  defender3,
  PlayerImg
} from '../../../Components/Assets';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import TagLabel from '../../../Components/TagLabel';

const Statistics = () => {
  const [open, setopen] = useState(true);
  const [openx, setopenx] = useState(true);
  const Tour = useSelector(state => state.HomeReducer.TourDetails);
  const navigation = useNavigation();
  
 
  
  return (
    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    //   nestedScrollEnabled
    //   style={styles.ScrollView}>
    //   {Tour?.statistics
    //     ? Object.keys(Tour?.statistics).map(position => {
    //         let title = '';
    //         switch (position) {
    //           case 'goals':
    //             title = 'Goals';
    //             break;
    //           case 'assists':
    //             title = 'Assists';
    //             break;
    //           case 'cleanSheets':
    //             title = 'Clean Sheets';
    //             break;
    //           case 'matches':
    //             title = 'Matches';
    //             break;
    //           case 'menOfTheMatch':
    //             title = 'Men Of The Match';
    //             break;
    //           case 'saves':
    //             title = 'Saves';
    //             break;
    //           case 'redCards':
    //             title = 'Red Cards';
    //             break;
    //           case 'tournaments':
    //             title = 'Tournaments';
    //             break;
    //           case 'yellowCards':
    //             title = 'Yellow Cards';
    //             break;
    //           default:
    //             break;
    //         }
    //         return (
    //           <View
    //             style={{
    //               width: '100%',
    //             }}>
    //             <View style={styles.dropdown_header}>
    //               <TextComponent style={styles.dropdown_text} text={title} />
    //             </View>
    //            { Tour?.statistics[position].length > 0 ?  (
    //               Tour?.statistics[position].map((item, index) => {
                   
    //                 switch (position) {
    //                   case 'goals':
    //                     score = item?.player?.id?.statistics?.goals;
    //                     break;
    //                   case 'assists':
    //                     score = item?.player?.id?.statistics?.assists;
    //                     console.log('score25', item?.player?.id?.statistics);
    //                     break;
    //                   case 'cleanSheets':
    //                     score = item?.player?.id?.statistics.cleanSheets;
    //                     break;
    //                   case 'matches':
    //                     score = item?.player?.id?.statistics?.matches;
    //                     break;
    //                   case 'menOfTheMatch':
    //                     score = item?.player?.id?.statistics?.menOfTheMatch;
    //                     break;
    //                   case 'saves':
    //                     score = item?.player?.id?.statistics?.saves;
    //                     break;
    //                   case 'redCards':
    //                     score = item?.player?.id?.statistics?.redCards;
    //                     break;
    //                   case 'tournaments':
    //                     score = item?.player?.id?.statistics?.tournaments;
    //                     break;
    //                   case 'yellowCards':
    //                     score = item?.player?.id?.statistics?.yellowCards;
    //                     break;
    //                   default:
    //                     break;
    //                 }
    //                 return (
    //                   <Pressable
    //                     style={styles.option}
    //                     onPress={() => navigation.navigate('Profile')}>
    //                     <View style={styles.flxDR}>
    //                       <Image
    //                         source={
    //                           item?.player?.id?.picture
    //                             ? {uri: item?.player?.id?.picture}
    //                             : persons
    //                         }
    //                         style={styles.icon_image}
    //                       />
    //                       <TextComponent
    //                         text={
    //                           item?.player?.id?.fullName
    //                             ? item?.player?.id?.fullName
    //                             : '--'
    //                         }
    //                         style={styles.left}
    //                       />
    //                     </View>
    //                     <View style={styles.flxDR}>
    //                       <TextComponent text={score === 0 ?'No Achievements':score} style={styles.left} />
    //                       <MaterialIcons
    //                         name={
    //                           !I18nManager.isRTL
    //                             ? 'keyboard-arrow-right'
    //                             : 'keyboard-arrow-left'
    //                         }
    //                         size={30}
    //                         color={Colors.Blue}
    //                         style={styles.left}
    //                       />
    //                     </View>
    //                   </Pressable>
                     
    //                 );
    //               })
    //             ) : (
    //               <TextComponent
    //                 text={'No Record Found'}
    //                 style={[styles.dropdown_text, {marginLeft: 10}]}
    //               />
    //             )}
    //           </View>
    //         );
    //       })
    //     : null}
    // </ScrollView>
    <ScrollView
    showsVerticalScrollIndicator={false}
    nestedScrollEnabled
    style={styles.ScrollView}>
    {Tour?.statistics
      ? Object.keys(Tour?.statistics).map(position => {
          let title = '';
          switch (position) {
            case 'goals':
              title = 'Goals';
              break;
            case 'assists':
              title = 'Assists';
              break;
            case 'cleanSheets':
              title = 'Clean Sheets';
              break;
            case 'matches':
              title = 'Matches';
              break;
            case 'menOfTheMatch':
              title = 'Men Of The Match';
              break;
            case 'saves':
              title = 'Saves';
              break;
            case 'redCards':
              title = 'Red Cards';
              break;
            case 'tournaments':
              title = 'Tournaments';
              break;
            case 'yellowCards':
              title = 'Yellow Cards';
              break;
            default:
              break;

              
          }
  
          const playersWithRecords = Tour?.statistics[position].filter(
            item => item?.player?.id?.statistics[position] > 0
            
          );
          
              return (
            <View
              style={{
                width: '100%',
              }}>
              <View style={styles.dropdown_header}>
                <TextComponent style={styles.dropdown_text} text={title} />
              </View>
              {playersWithRecords.length > 0 ? (
                playersWithRecords.map((item, index) => {
                  let score = item?.player?.id?.statistics[position] || 0;
                  return (
                    <Pressable
                      style={styles.option}
                      onPress={() => navigation.navigate('Profile')}>
                                <View style={styles.flxDR}>
                           <Image
                            source={
                              item?.player?.id?.picture
                                ? {uri: item?.player?.id?.picture}
                                : PlayerImg
                            }
                            style={styles.icon_image}
                          />
                    
                          <TextComponent
                            text={
                              item?.player?.id?.fullName
                                ? item?.player?.id?.fullName
                                : '--'
                            }
                            style={styles.left}
                          />
                        </View>
                        <View style={styles.flxDR}>
                          <TextComponent text={score === 0 ?'No Achievements':score} style={styles.left} />
                          <MaterialIcons
                            name={
                              !I18nManager.isRTL
                                ? 'keyboard-arrow-right'
                                : 'keyboard-arrow-left'
                            }
                            size={30}
                            color={Colors.Blue}
                            style={styles.left}
                          />
                        </View>
                    </Pressable>
                  );
                })
              ) : (
                <TextComponent
                  text={'No Record yet'}
                  style={[styles.dropdown_text, {marginLeft: 10}]}
                />
              )}
            </View>
          );
        })
      : null}
  </ScrollView>
  
  );
};

export default Statistics;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.homeGray,
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 17,
    backgroundColor: 'transparent',
    borderBottomColor: Colors.light_opacity,
    borderBottomWidth: 0.5,
  },
  dropdown_header: {
    width: '100%',
    backgroundColor: Colors.light_opacity,
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
    alignItems: 'center',
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dropdown_text: {
    color: Colors.Blue,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  see_all: {
    fontSize: 12,
  },
  flxDR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_image: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  left: {
    marginLeft: 10,
  },
  ScrollView: {
    width: '95%',
    alignSelf: 'center',
  },
});
