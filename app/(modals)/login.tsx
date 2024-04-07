import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook'
}

const Page = () => {

    useWarmUpBrowser();
    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Strategy.Facebook });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            if(createdSessionId) {
                setActive!({ session: createdSessionId });

                router.back();
            }
        } catch (error) {
            console.log('OAuth error:', error);   
        }
    };

    return(
        <View style={styles.container}>
            <TextInput 
            autoCapitalize="none" 
            placeholder="Email" 
            style={[defaultStyles.inputField, { marginBottom: 30 }]}/>
            
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.separaterView}>
                <View style={{
                    flex:1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
                    <Text style={styles.separator}>or</Text>
                    <View style={{
                    flex:1,
                    borderBottomColor: '#000',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
            </View>

            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        padding: 26
    },
    separaterView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    separator: {
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
    }
});
export default Page;