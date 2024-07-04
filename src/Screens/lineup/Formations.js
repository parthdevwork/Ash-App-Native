import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Config/Colors';
import {useTranslation} from 'react-i18next';
import {Button, Header, TextComponent} from '../../Components';
import {
  layout334,
  layout433,
  layout4411,
  layout442,
  layout5311,
  layout532,
} from '../../Components/Assets';
import {useNavigation} from '@react-navigation/native';

const Formations = () => {
  const {t, i18n} = useTranslation();

  const navigation = useNavigation();

  const [layoutSelected, setlayout] = useState(null);

  let layout = [
    {
      id: 1,
      image: layout442,
      title: '4-4-2',
    },
    {
      id: 2,
      image: layout532,
      title: '5-3-2',
    },
    {
      id: 3,
      image: layout433,
      title: '4-3-3',
    },
    {
      id: 4,
      image: layout5311,
      title: '5-3-1-1',
    },

    {
      id: 5,
      image: layout334,
      title: '3-3-4',
    },
    {
      id: 6,
      image: layout4411,
      title: '4-4-1-1',
    },
  ];

  const renderLayout = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setlayout(item)}
        style={{
          width: 170,
          height: 170,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          backgroundColor:
            layoutSelected?.id == item.id
              ? 'rgba(0, 255, 148, 0.05)'
              : Colors.White,
          borderRadius: 20,
          borderColor:
            layoutSelected?.id == item.id
              ? 'rgba(0, 255, 148, 0.5)'
              : Colors.White,
          borderWidth: layoutSelected?.id == item.id ? 1 : 0,
        }}>
        <Image
          source={item.image}
          style={{width: 100, height: 100}}
          resizeMode={'contain'}
        />
        <TextComponent
          text={item.title}
          style={[
            styles.Text,
            {alignSelf: 'center', marginTop: 10, fontWeight: '600'},
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('Formations')} leftIcon />
      <FlatList
        style={{marginVertical: 10}}
        contentContainerStyle={{alignItems: 'center'}}
        data={layout}
        renderItem={renderLayout}
        numColumns={2}
        ListHeaderComponent={
          <TextComponent
            text={'Please choose the formations'}
            style={[styles.Text, {alignSelf: 'center', marginTop: 20}]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      <Button
        text={'Next'}
        disabled={layoutSelected ? false : true}
        styles={{opacity: !layoutSelected ? 0.5 : 1 , marginBottom:15}}
        onPress={() => {
          navigation.navigate('Lineups', {layout: layoutSelected});
          setlayout(null);
        }}
      />
    </View>
  );
};

export default Formations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  Text: {
    fontSize: 16,
    color: '#131F54',
  },
});
