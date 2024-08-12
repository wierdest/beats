import { GestureHandlerRootView } from 'react-native-gesture-handler';
import drawer, { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import { FilterDrawerLayout } from '@/components/FilterDrawerLayout';
import { HeaderRight } from '@/components/HeaderRight';
import { FilterDrawerProvider } from '@/contexts/FilterDrawerContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import getStyles, { lightTheme, darkTheme } from './styles';

const RootLayoutConst = () => {
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
                <FilterDrawerProvider>
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
                </FilterDrawerProvider>
        </GestureHandlerRootView>
    );
}

const RootLayout = () => {
    return (
        <ThemeProvider>
            <RootLayoutConst />
        </ThemeProvider>
    );
}

export default RootLayout;
