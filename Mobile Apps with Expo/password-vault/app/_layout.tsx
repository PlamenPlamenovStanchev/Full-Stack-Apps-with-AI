import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../providers/AuthProvider';

function RootLayoutNav() {
  const { session, isLoading, masterPasswordSet } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (inTabsGroup) {
        if (!session) {
          router.replace('/login');
        } else if (!masterPasswordSet) {
          // If we try to go to tabs but don't have master password, kick back
          router.replace('/unlock');
        }
    }
  }, [session, isLoading, masterPasswordSet, segments]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Log In', headerShown: true }} />
      <Stack.Screen name="register" options={{ title: 'Register', headerShown: true }} />
      <Stack.Screen name="initialize" options={{ title: 'Initialize Vault', presentation: 'modal' }} />
      <Stack.Screen name="unlock" options={{ title: 'Unlock Vault', presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
