import ProfileHeader from "./components/profile-header";
import ProfileContent from "./components/profile-content";
import type WebApp from "@twa-dev/sdk";

export default function Page({ user }: typeof WebApp.initDataUnsafe) {
  if (!user) return <div>No Telegram user data found.</div>;

  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader user={user} auth_date={0} hash={""} signature={""} />
      <ProfileContent />
    </div>
  );
}
