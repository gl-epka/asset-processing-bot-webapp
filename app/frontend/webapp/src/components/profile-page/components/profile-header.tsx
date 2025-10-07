import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AtSign, IdCard, WalletMinimal } from "lucide-react";

import WebApp from "@twa-dev/sdk";

export default function ProfileHeader({ user }: typeof WebApp.initDataUnsafe) {
  if (!user) {
    return null;
  }
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.photo_url} alt="Profile" />
              <AvatarFallback className="text-2xl">Pic</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">
                {user.first_name} {user.last_name}
              </h1>
              <Badge variant="secondary">
                <span className="me-0.5 size-2 rounded-full bg-amber-500" />
                MyShCh Member
              </Badge>
            </div>
            {/*<p className="text-muted-foreground">Senior Product Designer</p>*/}
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <IdCard className="size-4" />
                {user.id}
              </div>
              <div className="flex items-center gap-1">
                <AtSign className="size-4" />
                {user.username}
              </div>
              <div className="flex items-center gap-1">
                <WalletMinimal className="size-4" />
                0x000000000000000
              </div>
            </div>
          </div>
          {/*<Button variant="default">Edit Profile</Button>*/}
        </div>
      </CardContent>
    </Card>
  );
}
