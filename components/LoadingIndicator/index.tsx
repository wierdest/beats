import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';

interface LoadingindicatorProps {
  size?: number | "small" | "large" | undefined
  color: string
}

export const Loadingindicator = ({ size, color }: LoadingindicatorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!isLoading) {
    return null; 
  }


  return (
    <View style={[styles.container]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}