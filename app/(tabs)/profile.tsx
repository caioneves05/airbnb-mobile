import { SignedIn, useAuth } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { View, Text, Button } from "react-native"

const Profile = () => {

    const { signOut, isSignedIn } = useAuth()

    return (
        <View>
            <Button title="Log out" onPress={() => signOut()} />
            { !SignedIn && 
            <Link href={'/(modals)/login'}>
                <Text>Login</Text>
            </Link>
            }
        </View>
    )
}

export default Profile