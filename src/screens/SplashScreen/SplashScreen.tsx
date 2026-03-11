import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { moderateScale as RFValue } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './SplashScreen.styles';

type RootStackParamList = {
  SplashScreen: undefined;
  DonationSelection: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('DonationSelection');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Title */}
        <Text style={styles.title}>Heritage Times</Text>
        <Text style={styles.subtitle}>Help Us Make a Difference</Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size={RFValue(40)}
          color="#D4A574"
        />
      </View>
    </View>
  );
};

export default SplashScreen;
