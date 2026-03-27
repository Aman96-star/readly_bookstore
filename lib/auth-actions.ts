'use server';

import { createClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  // Create user profile in users table
  if (data.user) {
    const { error: profileError } = await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      role: 'customer',
    });

    if (profileError && !profileError.message.includes('duplicate')) {
      throw new Error(profileError.message);
    }
  }

  return data;
}

export async function logIn(email: string, password: string) {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logOut() {
  const supabase = createClient(await cookies());

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const supabase = createClient(await cookies());

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function getUserProfile() {
  const supabase = createClient(await cookies());

  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
