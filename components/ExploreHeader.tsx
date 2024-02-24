import Colors from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from 'expo-haptics';

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];


  interface Props {
    onCategoryChanged: (category: string) => void
  }
  

export const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({x: x, y:0, animated: true});
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  }; 

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.actionRow}>
                        <Link href={'/(modals)/booking'} asChild>
                            <TouchableOpacity style={styles.searchBtn}>
                              <Ionicons name="search" size={24}/>
                              <View>
                                <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                                <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere . Any week . Add guests</Text>
                              </View>
                            </TouchableOpacity>
                        </Link>

                        <TouchableOpacity style={styles.filterBtn}>
                            <Ionicons name="options-outline" size={24}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                    ref={scrollRef}
                    horizontal 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{
                      alignItems: 'center',
                      gap: 30,
                      paddingHorizontal: 16
                    }}>
                        { categories.map((categorie, index) => (
                          <TouchableOpacity
                          onPress={() => selectCategory(index)}
                          key={index} 
                          ref={(el) => itemsRef.current[index] = el}
                          style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                          >
                            <MaterialIcons name={categorie.icon as any} size={24} color={activeIndex === index ? '#000' : Colors.grey}/>
                            <Text>{categorie.name}</Text>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 130,
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 16,
      gap: 10,
    },
    filterBtn: {
      padding: 10,
      borderWidth: 1,
      borderColor: Colors.grey,
      borderRadius: 24
    },
    searchBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderColor: '#c2c2c2',
      borderWidth: StyleSheet.hairlineWidth,
      flex: 1,
      padding: 14,
      borderRadius: 30,
      backgroundColor: '#fff',

      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1
      }
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: Colors.grey,
    },
    categoryTextActive: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: '#000'
    },
    categoriesBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    categoriesBtnActive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: Colors.grey,
      borderBottomWidth: 2,
      paddingBottom: 8,
    },
});