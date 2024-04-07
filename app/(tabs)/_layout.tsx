import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,

        }}>
            <Tabs.Screen 
            name="index" 
            options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size}/>
            }} />
            
            <Tabs.Screen 
            name="profile" 
            options={{
                tabBarLabel: 'Profile',
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size}/>
            }} />
        </Tabs>
    );
};

export default Layout;