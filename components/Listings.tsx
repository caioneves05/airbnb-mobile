/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";

interface Props {
    listings: any[];
    category: string;
}

export const Listings = ({ category, listings: items }: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        console.log('RELOAD LISTINGS', items.length);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [category]);

    const renderRow: ListRenderItem<any> = ({ item }) => {
        return <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                    <Image source={{ uri: item.xl_picture_url }} style={styles.image}/>
                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
                        <Ionicons name="heart-outline" size={24} color={'#000'}/>
                    </TouchableOpacity>
                </View>

                <View>
                    
                </View>
            </TouchableOpacity>
        </Link>;
    };

    return (
        <View style={defaultStyles.container}>
            <FlatList
            renderItem={renderRow}
            ref={listRef}
            data={loading ? [] : items}/>
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10
    }
});