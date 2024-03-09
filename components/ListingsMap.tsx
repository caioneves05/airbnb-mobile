/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";


interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listings: any;
} 

const INITIAL_REGION = {
    latitude: 52.431073,
    longitude: 13.389827,
    latitudeDelta: 9,
    longitudeDelta: 9
};

export const ListingsMap = ({ listings }: Props) => {

    const router = useRouter(); 

    const onMarkerSelected = (item: any) => {
        router.push(`/listing/${item.properties.id}`);
    };


    return (
        <View style={defaultStyles.container}>
            <MapView style={StyleSheet.absoluteFill}
            animationEnabled={false}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            showsUserLocation 
            showsMyLocationButton
            clusterColor="#fff"
            clusterTextColor="#000"
            clusterFontFamily="mon-sb"
            >
                {listings.features.map((listing: any) => (
                    <Marker 
                    key={listing.properties.id}
                    onPress={() => onMarkerSelected(listing)}
                    coordinate={{    
                        latitude: +listing.properties.latitude,
                        longitude: +listing.properties.longitude
                    }} 
                    >
                    <View style={styles.marker}>
                        <Text style={styles.markerText}>€ {listing.properties.price} </Text>
                    </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        textShadowOffset: {
            width: 1,
            height: 10
        }
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb'
    }
});