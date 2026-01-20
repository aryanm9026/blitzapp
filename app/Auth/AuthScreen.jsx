import React, { useState } from "react";

import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = "http://10.0.2.2:3000"; // for pc emulator
const API_URL = `http://10.243.33.86:3000`;

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const resetState = () => {
      setEmail("");
      setName("");
      setPhone("");
      setOtp("");
      setIsOtpSent(false);
  }

  const handleSignup = async () => {
    if (!name || !phone || !email) {
        Alert.alert("Input Error", "Please fill in all fields for signup.");
        return;
    }

    if (!isOtpSent) {
        try {
            const res = await fetch(`${API_URL}/api/auth/register/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, phone })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");
            
            Alert.alert("Success", "OTP has been sent to your email.");
            setIsOtpSent(true);
        } catch (error) {
            Alert.alert("Signup Error", error.message);
        }
    } else {
        if (!otp) {
            Alert.alert("Input Error", "Please enter the OTP.");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/api/auth/register/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, name, phone })
            });
            const data = await res.json();
            console.log("Registration data:", data);
             if (!res.ok) throw new Error(data.message || "Something went wrong");
             await AsyncStorage.setItem('userRegistration', "true");

            Alert.alert("Success", "You have been registered successfully! Please log in.");
            resetState();
            setIsRegistering(false);
        } catch (error) {
            Alert.alert("Verification Error", error.message);
        }
    }
  };

  const handleLogin = async () => {
    if (!email) {
        Alert.alert("Input Error", "Please enter your email address.");
        return;
    }
    if (!isOtpSent) {
        try {
            const res = await fetch(`${API_URL}/api/auth/login/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");

            Alert.alert("Success", "Login OTP has been sent to your email.");
            setIsOtpSent(true);
            setIsRegistering(false);
        } catch (error) {
            Alert.alert("Login Error", error.message);
        }
    } else {
        if (!otp) {
            Alert.alert("Input Error", "Please enter the OTP.");
            return;
        }
        try {
            const res = await fetch(`${API_URL}/api/auth/login/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");
            
            console.log("Logged in user:", data.user);
            Alert.alert("Success", "Logged in successfully!");
            await AsyncStorage.setItem('userLogged', JSON.stringify(data.user));
            navigation.replace("Home");

        } catch (error) {
            Alert.alert("Login Error", error.message);
        }
    }
  };

  const startRegistration = () => {
      resetState();
      setIsRegistering(true);
  }
  
  const startLogin = () => {
      resetState();
      setIsRegistering(false);
  }

  const mainButtonText = isOtpSent ? 'Verify OTP' : (isRegistering ? 'Send OTP' : 'Send Login OTP');
  const mainAction = isRegistering ? handleSignup : handleLogin;
  let secondaryActionText = isRegistering ? 'Already have an account? Login' : "Don't have an account? Signup";
  const secondaryAction = isRegistering ? startLogin : startRegistration;
  
  if (isOtpSent) {
      secondaryActionText = isRegistering ? 'Re-enter details' : 'Use a different email';
  }


  return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons name="star-four-points-outline" size={64} color="white" />
                <Text style={styles.title}>{isRegistering ? 'Create Account' : 'Event Horizon'}</Text>
                <Text style={styles.subtitle}>{isOtpSent ? 'Enter the OTP from your email' : 'Sign in or create an account'}</Text>
            </View>
            
            {!isOtpSent && isRegistering && (
                <>
                <View style={styles.inputContainer}>
                    <Feather name="user" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput placeholder="Name" placeholderTextColor="#888" style={styles.input} value={name} onChangeText={setName} />
                </View>
                <View style={styles.inputContainer}>
                    <Feather name="phone" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput placeholder="Phone" placeholderTextColor="#888" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                </View>
                </>
            )}

            {!isOtpSent && (
                <View style={styles.inputContainer}>
                    <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput placeholder="Email" placeholderTextColor="#888" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                </View>
            )}
            
            {isOtpSent && (
                <View style={styles.inputContainer}>
                    <Feather name="key" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput placeholder="6-Digit OTP" placeholderTextColor="#888" style={styles.input} value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={6} />
                </View>
            )}
            
            <TouchableOpacity style={styles.buttonWrapper} onPress={mainAction}>
                <LinearGradient
                    colors={['#8A2BE2', '#4B0082']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>{mainButtonText}</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.buttonWrapper, styles.secondaryButton]} 
                onPress={secondaryAction}
            >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    {secondaryActionText}
                </Text>
            </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#20132b',
    },
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: { 
        fontSize: 32, 
        fontWeight: "bold", 
        color: '#fff',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#c0c0c0',
        marginTop: 5,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3a2d4a',
        borderRadius: 25,
        width: '100%',
        height: 50,
        marginVertical: 8,
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: { 
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    buttonWrapper: {
        width: '100%',
        height: 50,
        marginTop: 15,
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: { 
        color: "#fff", 
        fontWeight: "bold", 
        fontSize: 16 
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#4a3d5a',
        elevation: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#c0c0c0',
        fontSize: 14,
    }
});

