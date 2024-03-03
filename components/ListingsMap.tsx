/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultStyles } from "@/constants/Styles";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listings: any;
} 

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9
};

export const ListingsMap = ({ listings }: Props) => {

    const onMarkerSelected = (event: any) => {
        console.log(event);
    };

    return (
        <View style={defaultStyles.container}>
            <MapView style={StyleSheet.absoluteFill} 
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            showsUserLocation 
            showsMyLocationButton>
                {listings.features.map((listing: any) => (
                    <Marker 
                    key={listing.properties.id}
                    onPress={() => onMarkerSelected(listing)}
                    coordinate={{    
                        latitude: +listing.properties.latitude,
                        longitude: +listing.properties.longitude
                    }} />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});