/* eslint-disable @typescript-eslint/no-explicit-any */
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Listings } from "./Listings";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    listings: any;
    category: string;
}

export const ListingBottomSheet = ({ listings, category }: Props) => {
    const [refresh, setRefresh] = useState(0);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10', '100'], []);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };


    return (
            <BottomSheet
            style={styles.sheetContainer}
            index={1}
            ref={bottomSheetRef}
            enablePanDownToClose={false}
            snapPoints={snapPoints} 
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            >
                <View style={{ flex: 1 }}>
                    <Listings 
                    refresh={refresh}
                    listings={listings} 
                    category={category}/>
                    <View style={styles.absoluteBtn}>
                        <TouchableOpacity onPress={showMap} style={styles.btn}>
                            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
                            <Ionicons name="map" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
    ); 
};

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        borderRadius: 30,
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sheetContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        },
    }
});