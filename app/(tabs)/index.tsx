/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExploreHeader } from "@/components/ExploreHeader";
import { Listings } from "@/components/Listings";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { ListingsMap } from "@/components/ListingsMap";

import listingsData from '../../assets/data/airbnb-listings.json';
import listingsDataGeo from '../../assets/data/airbnb-listings.geo.json';

const Page = () => {
    const [category, setCategory] = useState('');
    const items = useMemo(() => listingsData as any, []);

    const onDataChanged = (category: string) => {
        console.log('CHANGED:', category);
        setCategory(category);
    };

    return(
        <View style={{ flex: 1, marginTop: 130 }}>
            <Stack.Screen options={{
                header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
            }}/>
            {/* <Listings listings={items} category={category}/> */}
            <ListingsMap listings={listingsDataGeo}/>
        </View>
    );
};

export default Page;