export function getUserName(user) {
  return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Profile";
}

export function getUserAvatar(user) {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
}
