import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect, useState } from 'react';
import { FilterDrawerLayout } from '@/components/FilterDrawerLayout';
import { HeaderRight } from '@/components/HeaderRight';
import { ModalProvider } from '@/contexts/ModalContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
// import { SplashScreenComponent } from '@/components/SplashScreen';
import { DatabaseProvider } from '@/contexts/DatabaseContext';
import { BeatProvider } from '@/contexts/BeatContext';
import { FilterProvider } from '@/contexts/FilterContext';
import { View } from 'react-native';
import { SettingsProvider } from '@/contexts/SettingsContext';
import LottieView from 'lottie-react-native';

const RootLayoutConst = () => {
    const { isDarkMode, globalColors } = useTheme();
    const [isLootieVisible, setIsLootieVisible] = useState(true)

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* {isSplashVisible ? (
                <SplashScreenComponent onFinish={handleFinishSplash} />
            ) : ( */}
            {isLootieVisible ? (
                <LottieView 
                    source={require('../assets/images/teste.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={()=>setIsLootieVisible(false)}
                    style={{
                        flex: 1,                   
                        justifyContent: 'center',  
                        alignItems: 'center',      
                        backgroundColor: '#eee',   
                    }}
                     />
            ) : (

            <ModalProvider>
                <Drawer
                    drawerContent={() => <FilterDrawerLayout />}
                    screenOptions={{
                        drawerStyle: {
                            width: 380,
                            borderRadius: 60,

                        },
                        headerStyle: {
                            height: 100,
                        },
                        headerTintColor: 'white',
                        headerBackground: () => (
                            <View style={{ flex: 1, backgroundColor: isDarkMode ? '#1e1e1e' : 'transparent' }}>
                                <View style={{ flex: 0.31, backgroundColor: globalColors.secondary }} />
                                <View style={{ flex: 0.69, backgroundColor: globalColors.primary }} />
                            </View>
                        ),
                    }}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            title: 'Beats',
                            headerRight: () => <HeaderRight />,
                            swipeEdgeWidth: 0,
                        }}
                    />
                </Drawer>
            </ModalProvider>
            )}
        </GestureHandlerRootView>
    );
}

const RootLayout = () => {
    return (
        <DatabaseProvider>
            <FilterProvider>
                <BeatProvider>
                    <ThemeProvider>
                        <SettingsProvider>
                            <RootLayoutConst />
                        </SettingsProvider>
                    </ThemeProvider>
                </BeatProvider>
            </FilterProvider>
        </DatabaseProvider>
    );
}

export default RootLayout;
