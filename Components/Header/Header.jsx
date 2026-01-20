import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileModal = ({ visible, onClose, navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (visible) {
        try {
          const storedUserData = await AsyncStorage.getItem('userLogged');
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        } catch (error) {
          console.error("Failed to fetch user data from storage", error);
        }
      }
    };
    fetchUserData();
  }, [visible]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userLogged');
      navigation.replace('AuthScreen');
      onClose();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {userData ? (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Profile</Text>
                <TouchableOpacity onPress={onClose}>
                  <Feather name="x" size={28} color="#c0c0c0" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileInfo}>
                <View style={styles.avatar}>
                  <Feather name="user" size={40} color="#fff" />
                </View>
                <Text style={styles.name}>{userData.name}</Text>
                <View style={styles.infoRow}>
                  <Feather name="mail" size={20} color="#888" />
                  <Text style={styles.infoText}>{userData.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Feather name="phone" size={20} color="#888" />
                  <Text style={styles.infoText}>{userData.phone}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogout}>
                <LinearGradient
                  colors={['#8A2BE2', '#4B0082']}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>Logout</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.infoText}>Loading profile...</Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openNotifications = () => {
    console.log("Notifications icon pressed");
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Feather name="user" size={24} color="#e0e0e0" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>EVENTS</Text>
      <TouchableOpacity onPress={openNotifications}>
        <Ionicons name="notifications-outline" size={24} color="#e0e0e0" />
      </TouchableOpacity>
      <ProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#20132b',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#20132b',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3a2d4a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#c0c0c0',
    marginLeft: 10,
  },
  buttonWrapper: {
    width: '100%',
    height: 50,
    marginTop: 'auto',
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

