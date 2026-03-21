import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../navigation/types';
import styles from './AdminLoginScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminLogin'>;

const AdminLoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const disabled = useMemo(() => {
    return isLoading || email.trim().length === 0 || password.trim().length === 0;
  }, [email, isLoading, password]);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(normalizedEmail, normalizedPassword);
      Alert.alert('Success', 'Admin logged in successfully.');
      navigation.goBack();
    } catch (error: any) {
      const code = error?.code;

      if (code === 'auth/invalid-email') {
        Alert.alert('Login Failed', 'Please enter a valid email address.');
        return;
      }

      if (
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential'
      ) {
        Alert.alert('Login Failed', 'Invalid email or password.');
        return;
      }

      Alert.alert('Login Failed', error?.message ?? 'Unable to sign in right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Login</Text>
        <Text style={styles.subtitle}>Use admin credentials to access management actions.</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="admin@heritagetimes.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.loginButton, disabled && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={disabled}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminLoginScreen;
