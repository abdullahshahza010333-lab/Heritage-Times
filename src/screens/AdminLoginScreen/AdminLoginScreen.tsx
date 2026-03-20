import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import styles from './AdminLoginScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminLogin'>;

const ADMIN_EMAIL = 'admin@heritagetimes.com';
const ADMIN_PASSWORD = 'admin123';

const AdminLoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabled = useMemo(() => {
    return email.trim().length === 0 || password.trim().length === 0;
  }, [email, password]);

  const handleLogin = () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (normalizedEmail !== ADMIN_EMAIL || normalizedPassword !== ADMIN_PASSWORD) {
      Alert.alert('Login Failed', 'Invalid admin email or password.');
      return;
    }

    Alert.alert('Success', 'Admin logged in successfully.');
    navigation.goBack();
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
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminLoginScreen;
