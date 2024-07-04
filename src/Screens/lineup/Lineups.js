import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  I18nManager,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Button, Header, TextComponent} from '../../Components';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../Config/Colors';
import {
  FieldPic,
  FootballGround,
  persons,
  picture,
  Player1,
  Player2,
  Player3,
  PlayerImg,
} from '../../Components/Assets';
import TagLabel from '../../Components/TagLabel';
import {useDispatch, useSelector} from 'react-redux';
import {TeamMiddleware} from '../../Store/Middleware/TeamMiddleware';
import {HomeMiddleware} from '../../Store/Middleware/HomeMiddleware';
import {showAlert} from '../../Store/Actions/GeneralActions';
import ViewShot from 'react-native-view-shot';
import Draggable from 'react-native-draggable';

const Lineups = props => {
  const {t, i18n} = useTranslation();

  const navigation = useNavigation();

  // const layout = props.route.params.layout;
  const [Player, setPlayer] = useState(null);

  const layout401 = {
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout402 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout403 = {
    FWD: [
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },
    ],

    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout404 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout405 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout406 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },

      {
        player: null,
        style: {marginLeft: 130, position: 'absolute'},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout407 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
      {
        player: null,
        style: {marginLeft: 85, marginTop: -3, position: 'absolute'},
        code: 'DM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout408 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },

      {
        player: null,
        style: {marginLeft: 130, position: 'absolute'},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 64, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout409 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },

      {
        player: null,
        style: {marginLeft: 130, position: 'absolute'},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 64, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 145, marginTop: -15, position: 'absolute'},
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout410 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },

      {
        player: null,
        style: {marginLeft: 130, position: 'absolute'},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
      {
        player: null,
        style: {marginLeft: 85, marginTop: -3, position: 'absolute'},
        code: 'DM',
      },
      {
        player: null,
        style: {marginLeft: 127, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 145, marginTop: -15, position: 'absolute'},
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout411 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },

      {
        player: null,
        style: {marginLeft: 130, position: 'absolute'},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
      {
        player: null,
        style: {marginLeft: 85, marginTop: -3, position: 'absolute'},
        code: 'DM',
      },
      {
        player: null,
        style: {marginLeft: 127, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 64, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 145, marginTop: -15, position: 'absolute'},
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -65, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  const layout532 = {
    FWD: [
      {
        player: null,
        style: {marginTop: 10, marginRight: 45},
        code: 'LW',
      },

      {
        player: null,
        style: {marginTop: 50, marginLeft: 10},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginTop: 35},
        code: 'CM',
      },
      {
        player: null,
        style: {marginHorizontal: 10},
        code: 'DM',
      },
      {
        player: null,
        style: {marginTop: 35},
        code: 'DM',
      },
      {
        player: null,
        style: {marginHorizontal: 10},
        code: 'DM',
      },
      {
        player: null,
        style: {marginTop: 35},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: null,
        code: 'LB',
      },
      {
        player: null,
        style: {marginHorizontal: 40},
        code: 'CB',
      },
      {
        player: null,
        style: null,
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginBottom: 40},
        code: 'GK',
      },
    ],
  };
  const layout433 = {
    FWD: [
      {
        player: null,
        style: {marginLeft: 40, position: 'absolute'},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: -10, marginLeft: 85, position: 'absolute'},
        code: 'ST',
      },

      {
        player: null,
        style: {marginLeft: 130, position: 'absolute'},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginLeft: 43, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
      {
        player: null,
        style: {marginLeft: 85, marginTop: -3, position: 'absolute'},
        code: 'DM',
      },
      {
        player: null,
        style: {marginLeft: 127, marginTop: -14, position: 'absolute'},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginLeft: 25, marginTop: -15, position: 'absolute'},
        code: 'LB',
      },
      {
        player: null,
        style: {marginLeft: 107, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 64, marginTop: -15, position: 'absolute'},
        code: 'CB',
      },
      {
        player: null,
        style: {marginLeft: 145, marginTop: -15, position: 'absolute'},
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginTop: -31, marginLeft: 85, position: 'absolute'},
        code: 'GK',
      },
    ],
  };
  // const layout433 = {
  //   FWD: [
  //     {
  //       player: null,
  //       style: {marginTop: 50, marginLeft: 20},
  //       code: 'LW',
  //     },
  //     {
  //       player: null,
  //       style: {marginTop: 30, marginHorizontal: 35},
  //       code: 'ST',
  //     },

  //     {
  //       player: null,
  //       style: {marginTop: 50, marginRight: 20},
  //       code: 'RW',
  //     },
  //   ],
  //   MID: [
  //     {
  //       player: null,
  //       style: null,
  //       code: 'CM',
  //     },
  //     {
  //       player: null,
  //       style: {marginTop: 20, marginHorizontal: 30},
  //       code: 'DM',
  //     },
  //     {
  //       player: null,
  //       style: null,
  //       code: 'CM',
  //     },
  //   ],
  //   DEF: [
  //     {
  //       player: null,
  //       style: null,
  //       code: 'LB',
  //     },
  //     {
  //       player: null,
  //       style: {marginHorizontal: 30},
  //       code: 'CB',
  //     },
  //     {
  //       player: null,
  //       style: {marginRight: 30},
  //       code: 'CB',
  //     },
  //     {
  //       player: null,
  //       style: null,
  //       code: 'RB',
  //     },
  //   ],
  //   GKC: [
  //     {
  //       player: null,
  //       style: {marginBottom: 40},
  //       code: 'GK',
  //     },
  //   ],
  // };

  const layout442 = {
    FWD: [
      {
        player: null,
        style: {marginTop: 50, marginRight: 5, alignItems: 'center'},
        code: 'LW',
      },

      {
        player: null,
        style: {marginTop: 50, marginLeft: 5},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginTop: -10},
        code: 'CM',
      },
      {
        player: null,
        style: {marginTop: 20, marginHorizontal: 15},
        code: 'DM',
      },
      {
        player: null,
        style: {marginTop: 20, marginHorizontal: 15},
        code: 'DM',
      },
      {
        player: null,
        style: {marginTop: -10},
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: null,
        code: 'LB',
      },
      {
        player: null,
        style: {marginHorizontal: 30},
        code: 'CB',
      },
      {
        player: null,
        style: {marginRight: 30},
        code: 'CB',
      },
      {
        player: null,
        style: null,
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginBottom: 40},
        code: 'GK',
      },
    ],
  };

  const layout334 = {
    FWD: [
      {
        player: null,
        style: {marginTop: 50, marginLeft: 20},
        code: 'LW',
      },
      {
        player: null,
        style: {marginTop: 35, marginHorizontal: 15},
        code: 'ST',
      },
      {
        player: null,
        style: {marginTop: 35, marginHorizontal: 15},
        code: 'ST',
      },

      {
        player: null,
        style: {marginTop: 50, marginRight: 20},
        code: 'RW',
      },
    ],
    MID: [
      {
        player: null,
        style: null,
        code: 'CM',
      },
      {
        player: null,
        style: {marginTop: -20, marginHorizontal: 40},
        code: 'DM',
      },
      {
        player: null,
        style: null,
        code: 'CM',
      },
    ],
    DEF: [
      {
        player: null,
        style: null,
        code: 'LB',
      },
      {
        player: null,
        style: {marginHorizontal: 30},
        code: 'CB',
      },

      {
        player: null,
        style: null,
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginBottom: 40},
        code: 'GK',
      },
    ],
  };

  const layout5311 = {
    FWD: [
      {
        player: null,
        style: {marginTop: 40},
        code: 'ST',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginTop: 25},
        code: 'CM',
      },
      {
        player: null,
        style: {marginHorizontal: 30},
        code: 'DM',
      },
      {
        player: null,
        style: {marginTop: 25},
        code: 'CM',
      },
    ],
    MID2: [
      {
        player: null,
        style: null,
        code: 'CM ',
      },
      {
        player: null,
        style: {marginTop: -20, marginHorizontal: 60},
        code: 'DM ',
      },
      {
        player: null,
        style: null,
        code: 'CM ',
      },
    ],
    DEF: [
      {
        player: null,
        style: null,
        code: 'LB',
      },
      {
        player: null,
        style: {marginHorizontal: 30},
        code: 'CB',
      },

      {
        player: null,
        style: null,
        code: 'RB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginBottom: 40},
        code: 'GK',
      },
    ],
  };

  const layout4411 = {
    FWD: [
      {
        player: null,
        style: {marginTop: 40},
        code: 'ST',
      },
    ],
    MID: [
      {
        player: null,
        style: {marginTop: 25},
        code: 'CM ',
      },
      {
        player: null,
        style: {marginHorizontal: 50},
        code: 'DM',
      },
      {
        player: null,
        style: {marginTop: 25},
        code: 'CM',
      },
    ],
    MID2: [
      {
        player: null,
        style: {marginRight: 10},
        code: 'CM',
      },

      {
        player: null,
        style: {marginLeft: 10},
        code: 'DM ',
      },
    ],
    DEF: [
      {
        player: null,
        style: {marginTop: -15},
        code: 'LB ',
      },
      {
        player: null,
        style: {marginHorizontal: 30},
        code: 'CB',
      },

      {
        player: null,
        style: {marginRight: 30},
        code: 'RB',
      },
      {
        player: null,
        style: {marginTop: -15},
        code: 'LB',
      },
    ],
    GKC: [
      {
        player: null,
        style: {marginBottom: 40},
        code: 'GK',
      },
    ],
  };

  const [layouts, setlayout] = useState(layout411);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  let newData = [];
  const user = useSelector(state => state.AuthReducer.user);
  const PlayerData1 = useSelector(state => state.TeamReducer.selectedLineUp);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TeamMiddleware.teamDetails({id: user?.myTeam?.id}));
    if (user?.teams?.length > 0)
      dispatch(
        TeamMiddleware.getLineUpPlayers({
          id: user?.teams[0].id,
          tournament: user.myMatch.tournament?.id,
        }),
      );
  }, [user?.teams[0].id]);
  useEffect(() => {
    const playerDataLength = PlayerData1?.length;

    // Define your layouts
    switch (playerDataLength) {
      case 1:
        setlayout(layout401);
        break;
      case 2:
        setlayout(layout402);
        break;
      case 3:
        setlayout(layout403);
        break;
      case 4:
        setlayout(layout404);
        break;
      case 5:
        setlayout(layout405);
        break;
      case 6:
        setlayout(layout406);
        break;
      case 7:
        setlayout(layout407);
        break;
      case 8:
        setlayout(layout408);
        break;
      case 9:
        setlayout(layout409);
        break;
      case 10:
        setlayout(layout410);
        break;
      default:
        setlayout(layout411);
    }
  }, [PlayerData1]);

  const PlayerData = useSelector(state => state.TeamReducer.SelectedTeam);

  const [array, setarray] = useState([
    {
      player: null,
      code: 'ST',
    },
    {
      player: null,

      code: 'ST',
    },
    {
      player: null,
      code: 'ST',
    },
    {
      player: null,
      code: 'ST',
    },
  ]);

  const {height, width} = Dimensions.get('window');
  const ref = useRef();

  const setlayouts = () => {
    switch (layout.title) {
      case '4-4-2':
        setlayout(layout442);
        break;
      case '5-3-2':
        setlayout(layout532);
        break;
      case '4-3-3':
        setlayout(layout433);
        break;
      case '5-3-1-1':
        setlayout(layout5311);
        break;
      case '3-3-4':
        setlayout(layout334);
        break;
      case '4-4-1-1':
        setlayout(layout4411);
        break;

      default:
        break;
    }
  };
  const [isSelected, setisSelected] = useState(false);

  const data = [
    {
      id: 4,
      name: 'Robert Lewandowski',
      image: Player1,
      code: 'CM',
    },
    {
      id: 5,
      name: 'Thibaut Courtois',
      image: Player2,
      code: 'GK',
    },
    {
      id: 6,
      name: 'Luka Modrić',
      image: Player1,
      code: 'CB',
    },
    {
      id: 7,
      name: 'Vinícius Júnior',
      image: Player1,
      code: 'LB',
    },
    {
      id: 8,
      name: 'Ousmane Dembélé',
      image: Player2,
      code: 'LW',
    },
  ];
  const isAllPositionsFilled = () => {
    for (const key in layouts) {
      for (const item of layouts[key]) {
        if (!item.player) {
          return false;
        }
      }
    }
    return true;
  };

  const onSubmitLineup = () => {
    ref.current.capture().then(img => {
      let image = img.split('/');
      let imgObject = {
        name: image[image.length - 1],
        uri: img,
        // size: 423,
        type: 'image/png',
      };
      if (imgObject)
        dispatch(
          HomeMiddleware.setLineup({
            match: user?.myMatch?.id,
            team: user?.myTeam?.id,
            lineUp: imgObject,
          }),
        )
          .then(() => navigation.navigate('BottomTabs'))
          .catch();
    });
    // for (const [key] of Object.entries(layouts)) {
    //   for (const [index, item] of layouts[key].entries()) {
    //     console.log(item.player?.id)
    //     if (!item?.player?.id) {
    //       dispatch(
    //         showAlert({
    //           title: 'LineUp',
    //           message: 'Please place all players in layout',
    //           status: 'Error',
    //         }),
    //       );
    //       return;
    //     }
    //   }
    // }
  };

  return (
    <View style={styles.container}>
      <Header title={t('Lineup')} leftIcon />
      <View style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <TextComponent
            text={t(
              'Choose your lineup, the remaining players will automatically be on the bench',
            )}
            style={[styles.Text, {marginTop: 20}]}
          />

          {/* <TextComponent
            text={layout.title}
            style={[
              styles.Text,
              {
                marginTop: 10,
                fontWeight: '700',
                fontSize: 18,
              },
            ]}
          /> */}
        </View>
        <ViewShot
          ref={ref}
          options={{fileName: 'Selected-Layout', format: 'png', quality: 0.9}}>
          <ImageBackground
            source={FootballGround}
            style={{
              // flex: 1,
              height: 450,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
            resizeMode={'stretch'}>
            {/* {layouts
              ? Object.keys(layouts).map(position => (
                console.log("**POSITION***",position),
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                    }}>
                    {layouts[position].map((item, index) => {
                      return (
                        <Draggable
                          // key={}
                          x={item.style?.marginLeft}
                          y={item.style?.marginTop}
                          // maxX={height}
                          // maxY={500}
                        >
                          <TouchableOpacity
                            key={index.toString()}
                            onPress={() => {
                              setisSelected(true);
                              setPlayer({...item, layout: position, index});
                            }}
                            style={{
                              alignItems: 'center',
                              opacity: isSelected
                                ? Player.index == index &&
                                  Player.code == item.code
                                  ? 1
                                  : 0.6
                                : 1,
                              ...item.style,
                            }}>
                            <View>
                              
                             
                              {item?.player?.player?.id ? <Image
                                source={
                                  item?.player?.player?.id?.picture
                                    ? {uri: item?.player?.player?.id?.picture}
                                    : PlayerImg 
                                }
                                defaultSource={FieldPic} 
                                resizeMode={'contain'}
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 100,
                                  borderColor: Colors.Dark_Blue,
                                  borderWidth: 0.5,
                                }}
                              /> : <Image
                              source={
                                FieldPic
                              }
                              defaultSource={FieldPic} 
                              resizeMode={'contain'}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                borderColor: Colors.Dark_Blue,
                                borderWidth: 0.5,
                              }}
                            />}
                              {item.player ? (
                                <View
                                  style={{
                                    borderRadius: 10,
                                    paddingHorizontal: 5,
                                    position: 'absolute',
                                    backgroundColor: Colors.SuccessGreen,
                                    right: 0,
                                  }}>
                                  <TextComponent
                                    text={item?.player?.player?.shirt}
                                    style={{
                                      alignSelf: 'center',
                                      fontWeight: '400',
                                      fontSize: 12,
                                      color: Colors.textColor,
                                      marginBottom: 2,
                                    }}
                                  />
                                </View>
                              ) : null}
                            </View>
                            <TextComponent
                              text={
                                item?.player?.player?.id?.fullName
                                  ? item?.player?.player?.id?.fullName
                                  : item.code
                              }
                              style={{
                                alignSelf: 'center',
                                fontWeight: '400',
                                fontSize: 14,
                                color: Colors.White,
                                marginBottom: 2,
                              }}
                            />
                          </TouchableOpacity>
                        </Draggable>
                      );
                    })}
                  </View>
                ))
              : null} */}
            {layouts
              ? Object.keys(layouts).map(
                  position => (
                    (
                      <View
                        key={position}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          width: '100%',
                        }}>
                        {layouts[position].map((item, index) => {
                          const isGoalkeeper = position === 'GKC';
                          return (
                            <React.Fragment key={index.toString()}>
                              {isGoalkeeper ? (
                                <TouchableOpacity
                                activeOpacity={0.8}
                                  onPress={() => {
                                    setisSelected(true);
                                    setPlayer({
                                      ...item,
                                      layout: position,
                                      index,
                                    });
                                  }}
                                  style={{
                                    alignItems: 'center',
                                    opacity: isSelected
                                      ? Player.index == index &&
                                        Player.code == item.code
                                        ? 1
                                        : 0.6
                                      : 1,
                                    ...item.style,
                                  }}>
                                  <View>
                                    {item?.player?.player?.id ? (
                                      <Image
                                        source={
                                          item?.player?.player?.id?.picture
                                            ? {
                                                uri: item?.player?.player?.id
                                                  ?.picture,
                                              }
                                            : PlayerImg
                                        }
                                        defaultSource={FieldPic}
                                        resizeMode={'contain'}
                                        style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 100,
                                          borderColor: Colors.Dark_Blue,
                                          borderWidth: 0.5,
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        source={FieldPic}
                                        defaultSource={FieldPic}
                                        resizeMode={'contain'}
                                        style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 100,
                                          borderColor: Colors.Dark_Blue,
                                          borderWidth: 0.5,
                                        }}
                                      />
                                    )}
                                    {item.player ? (
                                      <View
                                        style={{
                                          borderRadius: 10,
                                          paddingHorizontal: 5,
                                          position: 'absolute',
                                          backgroundColor: Colors.SuccessGreen,
                                          right: 0,
                                        }}>
                                        <TextComponent
                                          text={item?.player?.player?.shirt}
                                          style={{
                                            alignSelf: 'center',
                                            fontWeight: '400',
                                            fontSize: 12,
                                            color: Colors.textColor,
                                            marginBottom: 2,
                                          }}
                                        />
                                      </View>
                                    ) : null}
                                  </View>
                                  <TextComponent
                                    text={
                                      item?.player?.player?.id?.fullName
                                        ? item?.player?.player?.id?.fullName
                                        : item.code
                                    }
                                    style={{
                                      alignSelf: 'center',
                                      fontWeight: '400',
                                      fontSize: 14,
                                      color: Colors.White,
                                      marginBottom: 2,
                                    }}
                                  />
                                </TouchableOpacity>
                              ) : (
                                <Draggable
                                  x={item.style?.marginLeft}
                                  y={item.style?.marginTop}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      setisSelected(true);
                                      setPlayer({
                                        ...item,
                                        layout: position,
                                        index,
                                      });
                                    }}
                                    style={{
                                      alignItems: 'center',
                                      opacity: isSelected
                                        ? Player.index == index &&
                                          Player.code == item.code
                                          ? 1
                                          : 0.6
                                        : 1,
                                      ...item.style,
                                    }}>
                                    <View>
                                      {item?.player?.player?.id ? (
                                        <Image
                                          source={
                                            item?.player?.player?.id?.picture
                                              ? {
                                                  uri: item?.player?.player?.id
                                                    ?.picture,
                                                }
                                              : PlayerImg
                                          }
                                          defaultSource={FieldPic}
                                          resizeMode={'contain'}
                                          style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 100,
                                            borderColor: Colors.Dark_Blue,
                                            borderWidth: 0.5,
                                          }}
                                        />
                                      ) : (
                                        <Image
                                          source={FieldPic}
                                          defaultSource={FieldPic}
                                          resizeMode={'contain'}
                                          style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 100,
                                            borderColor: Colors.Dark_Blue,
                                            borderWidth: 0.5,
                                          }}
                                        />
                                      )}
                                      {item.player ? (
                                        <View
                                          style={{
                                            borderRadius: 10,
                                            paddingHorizontal: 5,
                                            position: 'absolute',
                                            backgroundColor:
                                              Colors.SuccessGreen,
                                            right: 0,
                                          }}>
                                          <TextComponent
                                            text={item?.player?.player?.shirt}
                                            style={{
                                              alignSelf: 'center',
                                              fontWeight: '400',
                                              fontSize: 12,
                                              color: Colors.textColor,
                                              marginBottom: 2,
                                            }}
                                          />
                                        </View>
                                      ) : null}
                                    </View>
                                    <TextComponent
                                      text={
                                        item?.player?.player?.id?.fullName
                                          ? item?.player?.player?.id?.fullName
                                          : item.code
                                      }
                                      style={{
                                        alignSelf: 'center',
                                        fontWeight: '400',
                                        fontSize: 14,
                                        color: Colors.White,
                                        marginBottom: 2,
                                      }}
                                    />
                                  </TouchableOpacity>
                                </Draggable>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </View>
                    )
                  ),
                )
              : null}
          </ImageBackground>
          {!isSelected ? (
            <View style={{alignItems: 'center', marginTop: 35}}>
              <TextComponent
                text={'Click on the position to select the player'}
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  color: '#666666',
                }}
              />
            </View>
          ) : (
            <View style={{backgroundColor: Colors.bottomTabColor}}>
              <TextComponent
                text={
                  'Choose the player from the list according to his position'
                }
                style={{
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#666666',
                  alignSelf: 'center',
                  flex: 1,
                }}
              />
              <ScrollView
                style={{backgroundColor: Colors.homeGray, height: '30%'}}>
                {PlayerData1?.length > 0 ? (
                  PlayerData1?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={() => {
                          const playerPosition = Player?.layout;
                          const playerIndex = Player?.index;

                          if (selectedPlayers.includes(item.player.id.id)) {
                            // Player is already selected, show alert
                            dispatch(
                              showAlert({
                                title: 'Player',
                                message: 'This player is already selected.',
                                status: 'Error',
                              }),
                            );
                            return;
                          }
                          let data = {...layouts};
                          if (
                            data[playerPosition] &&
                            data[playerPosition][playerIndex]
                          ) {
                            // Player is not selected for this position, proceed with the selection
                            data[playerPosition][playerIndex].player = item;
                            setSelectedPlayers(prevSelectedPlayers => [
                              ...prevSelectedPlayers,
                              item.player.id.id,
                            ]);
                          }
                          setlayout(data);
                          setPlayer(null);
                          setisSelected(false);
                        }}
                        style={[
                          styles.Menu,
                          {
                            borderBottomWidth:
                              newData.length - 1 === index ? 0 : 0.5,
                          },
                        ]}>
                        <TextComponent
                          text={item?.player.shirt}
                          style={[
                            styles.MenuText,
                            {
                              color: Colors.textColor,
                              fontSize: 18,
                              marginRight: 10,
                              fontWeight: '600',
                            },
                          ]}
                        />
                        <Image
                          source={
                            item?.player?.id?.picture
                              ? {uri: item?.player?.id?.picture}
                              : PlayerImg
                          }
                          style={styles.icon}
                          resizeMode={'contain'}
                        />
                        <View style={{marginLeft: 20, flex: 1}}>
                          <TextComponent
                            text={
                              item?.player?.id?.fullName
                                ? item?.player?.id?.fullName
                                : '--'
                            }
                            style={styles.MenuText}
                          />
                        </View>
                        <TagLabel
                          text={
                            item?.player?.id?.features?.inGamePosition
                              ?.shortPosition
                          }
                          bR={5}
                          pH={8}
                          TextStyle={{
                            fontSize: 14,
                            marginVertical: 2,
                            fontWeight: '700',
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <TextComponent
                    text={'No Player Available'}
                    style={{
                      alignSelf: 'center',
                      fontWeight: '400',
                      fontSize: 16,
                      color: Colors.Dark_Blue,
                      marginBottom: 10,
                    }}
                  />
                )}
              </ScrollView>
            </View>
          )}
        </ViewShot>
      </View>
      {!isSelected ? (
        <Button
          text={'Submit'}
          disabled={!isAllPositionsFilled()}
          styles={{
            opacity: !isAllPositionsFilled() ? 0.5 : 1,
            marginBottom: 30,
          }}
          onPress={() => {
            onSubmitLineup();
          }}
        />
      ) : null}
    </View>
  );
};

export default Lineups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  Text: {
    fontSize: 15,
    color: '#131F54',
    textAlign: 'center',
  },
  Menu: {
    flexDirection: 'row',
    height: 70,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
    borderColor: Colors.White,
  },
  MenuText: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: '600',
  },

  icon: {
    width: 40,
    height: 40,
    borderColor: Colors.SuccessGreen,
    borderRadius: 20,
    borderWidth: 1,
  },
});
