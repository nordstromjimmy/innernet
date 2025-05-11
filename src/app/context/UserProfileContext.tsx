"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Profile = {
  name: string | null;
  gender: string | null;
};

type UserProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  loading: true,
  refreshProfile: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
});

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("name, gender")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setProfile({ name: data.name, gender: data.gender }); // ✅ This must update the profile state
    }
  };

  useEffect(() => {
    refreshProfile().finally(() => setLoading(false));
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, loading, refreshProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
