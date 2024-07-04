import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Header, TextComponent } from '../../Components'
import { useTranslation } from 'react-i18next'
import RNRestart from 'react-native-restart';
import { Colors } from '../../Config/Colors';


const Settings = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lang => {
    if (i18n.language == lang) {
    } else {
      try {
        i18n.changeLanguage(lang).then(() => {
          I18nManager.forceRTL(i18n.language == 'ar' ? true : false);
          RNRestart.restart();
        });
      } catch (error) { }
    }
  };



  return (
    <View style={styles.container}>
      <Header
        leftIcon={true}
        title={'Settings'}
      />

      <View style={{ padding: 20 }}>
        <TextComponent style={styles.heading} text={t('Change Language')} />

        <TouchableOpacity
          style={styles.langbtn}
          onPress={() => changeLanguage('en')}>
          <TextComponent style={styles.lang} text={t('English')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langbtn}
          onPress={() => changeLanguage('ar')}>
          <TextComponent style={styles.lang} text={t('Arabic')} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.homeGray,
  },
  langbtn: {
    // marginHorizontal: 10,
    // height: 35,
    backgroundColor: Colors.bottomTabColor,
    color: Colors.White,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    padding: 10
  },
  lang: {
    fontSize: 16,
    color: Colors.Dark_Blue,
    // textAlign: 'center',
    // marginHorizontal: 10
  },
  heading: {
    fontSize: 22,
    color: Colors.textColor,
    fontWeight: 'bold',
    marginVertical: 10
  },
})