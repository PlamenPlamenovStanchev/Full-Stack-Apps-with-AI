import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';
import { clearMasterKey, decryptData, encryptData } from '../../utils/crypto';

type VaultEntry = {
  id: string;
  title: string;       // unencrypted
  username?: string;   // encrypted
  password?: string;   // encrypted
  comments?: string;   // encrypted
  created_at: string;  // unencrypted
  last_modified: string; // unencrypted
};

const VaultItem = ({ item, onDelete, onEdit }: { item: VaultEntry, onDelete: (id: string) => void, onEdit: (item: VaultEntry) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => onEdit(item)} style={{ padding: 5, marginRight: 10 }}>
            <Text style={{ color: 'blue' }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={{ padding: 5 }}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {item.username ? <Text style={{ marginBottom: 2 }}>User: {item.username}</Text> : null}
      
      {item.password ? (
        <View style={styles.passwordRow}>
          <Text style={{ flex: 1, marginRight: 10 }} selectable>
            {showPassword ? item.password : '••••••••'}
          </Text>
          <Button title={showPassword ? "Hide" : "Show"} onPress={() => setShowPassword(!showPassword)} />
        </View>
      ) : null}

      {item.comments ? <Text style={styles.comments}>Notes: {item.comments}</Text> : null}
      
      <View style={{ marginTop: 10 }}>
        <Text style={styles.metaText}>Created: {new Date(item.created_at).toLocaleDateString()}</Text>
        <Text style={styles.metaText}>Modified: {new Date(item.last_modified).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

export default function VaultScreen() {
  const { session, setMasterPasswordSet } = useAuth();
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const [searchQuery, setSearchQuery] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newComments, setNewComments] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (session) fetchEntries();
  }, [session]);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('vault').select('*').eq('user_id', session?.user.id).order('created_at', { ascending: false });
    if (error) {
      Alert.alert('Error fetching vault', error.message);
    } else if (data) {
      try {
        const decrypted = data.map((item) => ({
          id: item.id,
          title: item.title,
          username: item.encrypted_username ? decryptData(item.encrypted_username) : undefined,
          password: item.encrypted_password ? decryptData(item.encrypted_password) : undefined,
          comments: item.encrypted_comments ? decryptData(item.encrypted_comments) : undefined,
          created_at: item.created_at,
          last_modified: item.last_modified
        }));
        setEntries(decrypted);
      } catch (err: any) {
        Alert.alert('Decryption error', 'Incorrect master password.');
        clearMasterKey();
        setMasterPasswordSet(false); 
      }
    }
    setLoading(false);
  };

  const resetFormAndFetch = () => {
    setEditingId(null);
    setNewTitle('');
    setNewUsername('');
    setNewPassword('');
    setNewComments('');
    fetchEntries();
  };

  const saveEntry = async () => {
    if (!newTitle) {
      Alert.alert('Validation Error', 'Title/URL is required');
      return;
    }

    const encrypted_username = newUsername ? encryptData(newUsername) : null;
    const encrypted_password = newPassword ? encryptData(newPassword) : null;
    const encrypted_comments = newComments ? encryptData(newComments) : null;

    if (editingId) {
      const { error } = await supabase.from('vault').update({
        title: newTitle,
        encrypted_username,
        encrypted_password,
        encrypted_comments,
        last_modified: new Date().toISOString()
      }).eq('id', editingId);

      if (error) Alert.alert('Error updating', error.message);
      else resetFormAndFetch();
    } else {
      const { error } = await supabase.from('vault').insert([{
        user_id: session?.user.id,
        title: newTitle,
        encrypted_username,
        encrypted_password,
        encrypted_comments
      }]);

      if (error) Alert.alert('Error adding', error.message);
      else resetFormAndFetch();
    }
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from('vault').delete().eq('id', id);
    if (!error) fetchEntries();
  };

  const handleEdit = (item: VaultEntry) => {
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewUsername(item.username || '');
    setNewPassword(item.password || '');
    setNewComments(item.comments || '');
  };

  const lockVault = () => {
    clearMasterKey();
    setMasterPasswordSet(false);
    router.replace('/');
  };

  const filteredEntries = entries.filter((e) => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Vault</Text>
        <Button title="Lock Vault" onPress={lockVault} color="orange" />
        <View style={{ width: 10 }} />
        <Button title="Logout" onPress={() => supabase.auth.signOut()} color="red" />
      </View>

      <View style={[styles.mainLayout, isLargeScreen && styles.mainLayoutLarge]}>
        {/* Left Side: List & Search */}
        <View style={styles.listSection}>
          <TextInput 
            style={[styles.input, { marginBottom: 15 }]} 
            placeholder="🔍 Search entries by Title/URL..." 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
          />
          
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={filteredEntries}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => <VaultItem item={item} onDelete={deleteEntry} onEdit={handleEdit} />}
              style={styles.list}
            />
          )}
        </View>

        {/* Right Side: Add/Edit Form */}
        <View style={styles.formSection}>
          <View style={styles.addContainer}>
            <Text style={{ fontWeight: 'bold', marginBottom: 15, fontSize: 16 }}>
              {editingId ? 'Edit Entry' : 'Add New Entry'}
            </Text>
            <TextInput placeholder="* Title / URL" style={styles.input} value={newTitle} onChangeText={setNewTitle} />
            <TextInput placeholder="Username / Email" style={styles.input} value={newUsername} onChangeText={setNewUsername} autoCapitalize="none" />
            <TextInput placeholder="Password" style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry />
            <TextInput placeholder="Comments" style={styles.input} value={newComments} onChangeText={setNewComments} multiline />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              {editingId && <Button title="Cancel" onPress={() => resetFormAndFetch()} color="gray" />}
              <View style={{ flex: 1, marginLeft: editingId ? 10 : 0 }}>
                <Button title={editingId ? "Update Entry" : "Save to Vault"} onPress={saveEntry} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fafafa' },
  header: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginRight: 20 },
  mainLayout: { flex: 1, flexDirection: 'column' },
  mainLayoutLarge: { flexDirection: 'row' },
  listSection: { flex: 2, marginRight: 0 },
  formSection: { flex: 1, marginLeft: 0 },
  card: { padding: 15, borderWidth: 1, borderColor: '#ddd', marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  comments: { marginTop: 5, color: '#444', fontStyle: 'italic' },
  metaText: { fontSize: 10, color: '#aaa', marginTop: 4 },
  list: { flex: 1, paddingBottom: 20 },
  addContainer: { padding: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' }
});