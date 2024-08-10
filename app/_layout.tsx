import { GestureHandlerRootView } from 'react-native-gesture-handler';
import drawer, { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import { FilterDrawerLayout } from '@/components/FilterDrawerLayout';
import { HeaderRight } from '@/components/HeaderRight';
import { FilterDrawerProvider } from '@/contexts/FilterDrawerContext';
import { ModalProvider } from '@/contexts/ModalContext';

export default function RootLayout() {
	return (
		 <GestureHandlerRootView style={{ flex: 1 }}>
            <FilterDrawerProvider>
                <ModalProvider>
                    <Drawer 
                        drawerContent={() => <FilterDrawerLayout />}
                        screenOptions={
                            {drawerStyle: {
                                width: 380,
                                borderRadius: 60
                            }}
                        }
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
