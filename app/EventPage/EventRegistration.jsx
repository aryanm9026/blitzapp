import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Alert,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = `http://10.243.33.86:3000`;

export default function EventRegistrationScreen({ route, navigation }) {
    const { event } = route.params;
    const [userData, setUserData] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamCode, setTeamCode] = useState("");
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    const [showJoinTeam, setShowJoinTeam] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userLogged');
                if (storedData) {
                    setUserData(JSON.parse(storedData));
                } else {
                    Alert.alert("Authentication Error", "You must be logged in to register for events.");
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Error", "Could not retrieve user data.",error);
                navigation.goBack();
            }
        };
        fetchUserData();
    }, []);

    const handleIndividualRegistration = async () => {
        if (!userData) return;
        try {
            const res = await fetch(`${API_URL}/api/v1/individual/join`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventName: event.title, userEmail: userData.email, userName: userData.name}),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            Alert.alert('Success', `You have registered for ${event.title}!`);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Registration Error', error.message);
        }
    };

    const handleCreateTeam = async () => {
        if (!userData || !teamName) {
            Alert.alert('Input Error', 'Please enter a team name.');
            return;
        };
        try {
             const res = await fetch(`${API_URL}/team/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventName: event.title, teamName, leaderEmail: userData.email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Could not create team');
            Alert.alert('Success', `Team "${teamName}" created! Team Code: ${data.team.teamCode}`);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Team Creation Error', error.message);
        }
    };

    const handleJoinTeam = async () => {
        if (!userData || !teamCode) {
            Alert.alert('Input Error', 'Please enter a team code.');
            return;
        }
        try {
            const res = await fetch(`${API_URL}/team/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamCode: teamCode, userEmail: userData.email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Could not join team');
            Alert.alert('Success', `You have joined the team for ${event.title}!`);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Join Team Error', error.message);
        }
    };

    const renderRegistrationOptions = () => {
        if (event.category === 'Flagship') {
            return (
                <View>
                    <TouchableOpacity style={styles.registerButton} onPress={() => { setShowCreateTeam(true); setShowJoinTeam(false); }}>
                        <LinearGradient colors={["#8A2BE2", "#4B0082"]} style={styles.registerGradient}>
                            <Text style={styles.registerButtonText}>Create a Team</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {showCreateTeam && (
                        <View style={styles.formContainer}>
                            <TextInput
                                placeholder="Enter Team Name"
                                placeholderTextColor="#888"
                                style={styles.input}
                                value={teamName}
                                onChangeText={setTeamName}
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={handleCreateTeam}>
                                <Text style={styles.submitButtonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity style={styles.registerButton} onPress={() => { setShowJoinTeam(true); setShowCreateTeam(false); }}>
                        <LinearGradient colors={["#8A2BE2", "#4B0082"]} style={styles.registerGradient}>
                            <Text style={styles.registerButtonText}>Join a Team</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                    {showJoinTeam && (
                         <View style={styles.formContainer}>
                            <TextInput
                                placeholder="Enter Team Code"
                                placeholderTextColor="#888"
                                style={styles.input}
                                value={teamCode}
                                onChangeText={setTeamCode}
                                autoCapitalize="characters"
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={handleJoinTeam}>
                                <Text style={styles.submitButtonText}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            );
        } else {
            return (
                <TouchableOpacity style={styles.registerButton} onPress={handleIndividualRegistration}>
                    <LinearGradient colors={["#8A2BE2", "#4B0082"]} style={styles.registerGradient}>
                        <Text style={styles.registerButtonText}>Register as Individual</Text>
                    </LinearGradient>
                </TouchableOpacity>
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Event Details</Text>
                <View style={{width: 28}} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    
                    <View style={styles.detailRow}><Ionicons name="calendar-outline" size={20} color="#8A2BE2" /><Text style={styles.detailText}>{event.date}</Text></View>
                    <View style={styles.detailRow}><Ionicons name="location-outline" size={20} color="#8A2BE2" /><Text style={styles.detailText}>{event.location}</Text></View>
                    <View style={styles.detailRow}><Ionicons name="people-outline" size={20} color="#8A2BE2" /><Text style={styles.detailText}>{event.organizer}</Text></View>
                    <View style={styles.detailRow}><Ionicons name="trophy-outline" size={20} color="#8A2BE2" /><Text style={styles.detailText}>{event.prizes}</Text></View>

                    <View style={styles.descriptionSection}>
                        <Text style={styles.descriptionTitle}>About The Event</Text>
                        <Text style={styles.descriptionText}>{event.description}</Text>
                    </View>

                    {renderRegistrationOptions()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#20132b',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    eventImage: {
        width: '100%',
        height: 250,
    },
    detailsContainer: {
        padding: 20,
    },
    eventTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    detailText: {
        color: "#c0c0c0",
        fontSize: 16,
        marginLeft: 15,
    },
    descriptionSection: {
        marginTop: 10,
        marginBottom: 10,
    },
    descriptionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    descriptionText: {
        color: "#c0c0c0",
        fontSize: 15,
        lineHeight: 22,
    },
    registerButton: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 30,
        overflow: 'hidden',
    },
    registerGradient: {
        paddingVertical: 15,
        alignItems: "center",
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    formContainer: {
        marginVertical: 15,
        backgroundColor: '#2c1d3b',
        borderRadius: 15,
        padding: 20,
    },
    input: {
        backgroundColor: '#3a2d4a',
        color: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

