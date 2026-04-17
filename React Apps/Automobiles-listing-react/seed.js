import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const SUPABASE_URL = 'https://yvdjaeoiwvuqrkpuhcck.supabase.co';
const SUPABASE_KEY = 'sb_publishable_hm6uwYSW_JSY_Oj5Vq8DpQ_CQQYgEu9'; // Using the publishable key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const users = [
  { email: 'steve@gmail.com', name: 'Steve', phone_number: '555-1234' },
  { email: 'maria@gmail.com', name: 'Maria', phone_number: '555-5678' }
];

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function fetchImageBuffer(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

const photoUrls = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503376710915-d41c888d1db2?q=80&w=600&auto=format&fit=crop'
];

async function seedUser(user) {
  console.log(`\n--- Seeding user: ${user.email} ---`);
  
  // 1. Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: user.email,
    password: 'pass123',
    options: { data: { name: user.name } }
  });

  if (authError && authError.message !== 'User already registered') {
    console.error(`Error signing up ${user.email}:`, authError.message);
    return;
  }
  
  // Wait to allow potential external DB confirm if email confirmations are enabled
  console.log('Signed up! Signing in to get session...');
  
  // 2. Sign in to ensure session exists for RLS
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: 'pass123'
  });

  if (loginError) {
    console.error(`Could not sign in ${user.email}. Trying to proceed anyway... error:`, loginError.message);
    return;
  }

  const userId = loginData.user.id;
  console.log(`Logged in as ${user.email} (ID: ${userId})`);

  // 3. Create user profile
  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({ id: userId, name: user.name, email: user.email, phone_number: user.phone_number });
    
  if (profileError) {
    console.error('Error creating profile:', profileError.message);
  } else {
    console.log(`Profile created/updated for ${user.name}`);
  }

  // 4. Create 4-5 listings
  for (let i = 1; i <= 4; i++) {
    console.log(`Creating listing ${i}...`);
    const { data: listingData, error: listingError } = await supabase
      .from('listings')
      .insert({
        user_id: userId,
        title: `${user.name}'s Car ${i}`,
        description: `This is a great car owned by ${user.name}. Excellent condition, low mileage.`,
        price: 10000 + (Math.random() * 20000),
        location: 'Miami, FL'
      })
      .select('id')
      .single();

    if (listingError) {
      console.error('Error inserting listing:', listingError.message);
      continue;
    }

    const listingId = listingData.id;

    // 5. Upload 2-3 photos to storage bucket and insert into mapping table
    for (let p = 0; p < 2; p++) {
      const imgUrl = photoUrls[p % photoUrls.length];
      console.log(`  Downloading image ${p+1}...`);
      const buffer = await fetchImageBuffer(imgUrl);
      
      const fileName = `${listingId}/photo_${p}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('listing-photos')
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        console.error('  Error uploading photo:', uploadError.message);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('listing-photos')
        .getPublicUrl(fileName);

      // Insert into listing_photos table
      const { error: photoDbError } = await supabase
        .from('listing_photos')
        .insert({
          listing_id: listingId,
          url: urlData.publicUrl
        });

      if (photoDbError) {
        console.error('  Error mapping photo to DB:', photoDbError.message);
      } else {
        console.log(`  Photo ${p+1} inserted successfully!`);
      }
    }
  }
}

async function runSeed() {
  for (const user of users) {
    await seedUser(user);
    await supabase.auth.signOut();
  }
  console.log('\n--- SEED COMPLETE ---');
}

runSeed();
