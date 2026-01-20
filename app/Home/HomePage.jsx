import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  eventsFlagship,
  eventsFun,
  eventsClub,
  eventsAttractions,
} from "../data";
import Header from "../../Components/Header/Header";
import SearchBar from "../../Components/SearchBar/SearchBar";

const categories = [
  { id: "1", name: "Flagship", icon: "trophy-outline" },
  { id: "2", name: "Fun", icon: "happy-outline" },
  { id: "3", name: "Club", icon: "musical-notes-outline" },
  { id: "4", name: "Attractions", icon: "game-controller-outline" },
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => (
  <View>
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === item.name && styles.selectedCategoryItem,
          ]}
          onPress={() => setSelectedCategory(item.name)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={selectedCategory === item.name ? "#fff" : "#c0c0c0"}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.name && styles.selectedCategoryText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.categoryList}
    />
  </View>
);

const EventDetailModal = ({ visible, event, onClose, navigation }) => {

  const openEventRegistration = (event) => {
    onClose(); 
    navigation.navigate("EventRegistration", { event }); 
  };

  if (!event) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color="#fff" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: event.image }} style={styles.modalImage} />

            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>{event.title}</Text>

              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={20} color="#8A2BE2" />
                <Text style={styles.detailText}>{event.date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={20} color="#8A2BE2" />
                <Text style={styles.detailText}>{event.location}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="people-outline" size={20} color="#8A2BE2" />
                <Text style={styles.detailText}>{event.organizer}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="trophy-outline" size={20} color="#8A2BE2" />
                <Text style={styles.detailText}>{event.prizes}</Text>
              </View>

              <View style={styles.descriptionSection}>
                <Text style={styles.descriptionTitle}>About Event</Text>
                <Text style={styles.descriptionText}>{event.description}</Text>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => openEventRegistration(event)}
              >
                <LinearGradient
                  colors={["#8A2BE2", "#4B0082"]}
                  style={styles.registerGradient}
                >
                  <Text style={styles.registerButtonText}>Register Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const EventCard = ({ event, onPress }) => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.75;

  return (
    <TouchableOpacity
      style={[styles.eventCard, { width: cardWidth }]}
      onPress={() => onPress(event)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const BottomNavBar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { name: "Trophy", icon: "trophy-outline" },
    { name: "Events", icon: "checkmark-circle-outline" },
    { name: "My Events", icon: "images-outline" },
    { name: "Schedule", icon: "calendar-outline" },
  ];

  useEffect(() => {}, [activeTab, setActiveTab]);

  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBar}>
        {navItems.slice(0, 2).map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => setActiveTab(item.name)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={activeTab === item.name ? "#fff" : "#888"}
            />
            <Text
              style={[
                styles.navText,
                activeTab === item.name && styles.activeNavText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={{ width: 80 }} />
        {navItems.slice(2, 4).map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => setActiveTab(item.name)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={activeTab === item.name ? "#fff" : "#888"}
            />
            <Text
              style={[
                styles.navText,
                activeTab === item.name && styles.activeNavText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.centralButtonWrapper}>
        <LinearGradient
          colors={["#8A2BE2", "#4B0082"]}
          style={styles.centralButton}
        >
          <MaterialCommunityIcons
            name="star-four-points-outline"
            size={32}
            color="white"
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Flagship");
  const [activeTab, setActiveTab] = useState("Events");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { width } = useWindowDimensions();


  const getEventsByCategory = () => {
    switch (selectedCategory) {
      case "Flagship":
        return eventsFlagship;
      case "Fun":
        return eventsFun;
      case "Club":
        return eventsClub;
      case "Attractions":
        return eventsAttractions;
      default:
        return eventsFlagship;
    }
  };

  const events = getEventsByCategory();

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {activeTab === "Events" ? (
            <>
            <SearchBar />
          <ScrollView showsHorizontalScrollIndicator={false}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </ScrollView>
            <View>
              <FlatList
                data={events}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <EventCard event={item} onPress={handleEventPress} />
                )}
                contentContainerStyle={{
                  paddingLeft: (width - width * 0.75) / 2,
                  paddingRight: 10,
                }}
                snapToInterval={width * 0.75 + 15}
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
              />

              <View style={styles.pagination}>
                {events.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      activeIndex === index && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
            </View>
            </>
          ) : (
            <View style={{ alignItems: "center", marginTop: 50 }}>
                <Text style={styles.headerTitle}>
                  {activeTab}
                </Text>
              <FlatList
                data={events}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <EventCard event={item} onPress={() => console.log("clicked a registered event !")} />
                )}
                contentContainerStyle={{
                  paddingLeft: (width - width * 0.75) / 2,
                  paddingRight: 10,
                }}
                snapToInterval={width * 0.75 + 15}
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
              />
            </View>
          )}
        </ScrollView>
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

        <EventDetailModal
          visible={modalVisible}
          event={selectedEvent}
          onClose={() => setModalVisible(false)}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#20132b",
  },
  container: {
    flex: 1,
    backgroundColor: "#20132b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3a2d4a",
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginVertical: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  categoryList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 80,
  },
  selectedCategoryItem: {
    backgroundColor: "#4a3d5a",
  },
  categoryText: {
    color: "#c0c0c0",
    marginTop: 5,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  eventCard: {
    marginRight: 15,
    backgroundColor: "#3a2d4a",
    borderRadius: 20,
    overflow: "hidden",
    height: 450,
  },
  eventImage: {
    width: "100%",
    height: "70%",
  },
  eventInfo: {
    padding: 15,
    height: "30%",
  },
  eventTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  eventDate: {
    color: "#c0c0c0",
    fontSize: 14,
    marginTop: 5,
  },
  eventLocation: {
    color: "#c0c0c0",
    fontSize: 14,
    marginTop: 2,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  navBarContainer: {
    position: "relative",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: "#3a2d4a",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: "#fff",
  },
  centralButtonWrapper: {
    position: "absolute",
    top: 0,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  centralButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#8A2BE2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#20132b",
    borderRadius: 20,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  modalImage: {
    width: "100%",
    height: 300,
  },
  modalInfo: {
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
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
    marginLeft: 10,
  },
  descriptionSection: {
    marginTop: 20,
    marginBottom: 20,
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
  },
  registerGradient: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
