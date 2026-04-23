import { BMICalculator } from '@/components/bmi-calculator';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={null}
      scrollEventThrottle={16}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BMICalculator />
      </ScrollView>
    </ParallaxScrollView>
  );
}
