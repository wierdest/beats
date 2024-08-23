import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import { FilterDrawerLayout } from '@/components/FilterDrawerLayout';
import { HeaderRight } from '@/components/HeaderRight';
import { ModalProvider } from '@/contexts/ModalContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
// import { SplashScreenComponent } from '@/components/SplashScreen';
import { DatabaseProvider } from '@/contexts/DatabaseContext';
import { BeatProvider } from '@/contexts/BeatContext';
import { FilterProvider } from '@/contexts/FilterContext';

const RootLayoutConst = () => {
    const { isDarkMode } = useTheme();

    // const [isSplashVisible, setSplashVisible] = useState(true);

    // const handleFinishSplash = () => {
    //     setSplashVisible(false);
    // }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* {isSplashVisible ? (
                <SplashScreenComponent onFinish={handleFinishSplash} />
            ) : ( */}

                <ModalProvider>
                    <Drawer
                        drawerContent={() => <FilterDrawerLayout />}
                        screenOptions={{
                            drawerStyle: {
                                width: 380,
                                borderRadius: 60,
                                backgroundColor: isDarkMode ? 'black' : 'white'
                            },
                            headerStyle: {
                                backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
                            },
                            headerTintColor: isDarkMode ? 'white' : 'black'
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
            {/* )} */}
        </GestureHandlerRootView>
    );
}

const RootLayout = () => {
    return (
        <DatabaseProvider>
            <FilterProvider>
                <BeatProvider>
                    <ThemeProvider>
                        <RootLayoutConst />
                    </ThemeProvider>

                </BeatProvider>
            </FilterProvider>
        </DatabaseProvider>
    );
}

export default RootLayout;
