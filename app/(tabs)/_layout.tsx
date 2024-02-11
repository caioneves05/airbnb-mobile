import Colors from "@/constants/Colors"
import { Tabs } from "expo-router"
import { Text, View } from "react-native"

const Layout = () => {
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.primary,
        }}>
            <Tabs.Screen 
            name="index" 
            options={{
                tabBarLabel: 'explore'
            }}>
            </Tabs.Screen>
        </Tabs>
    )
}

export default Layout