"use client";

import { useState } from "react";
import { Switch } from "../../shadcn/components/ui/switch";
import { updateCommunicationsPreferences } from "@/app/actions/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Bell, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export function CommunicationsSelection({userNotifications, userEmailsCommunications}: {userNotifications: boolean, userEmailsCommunications: boolean}) {
  const [notificationSwitch, setNotificationSwitch] = useState(userNotifications);
  const [emailSwitch, setEmailSwitch] = useState(userEmailsCommunications);

  const handleNotificationSwitch = async (checked:boolean) => {
    setNotificationSwitch(checked);
    await updateCommunicationsPreferences("notifications", checked);
    toast(checked ? "Notifications activées" : "Notifications désactivées");
  }

  const handleEmailSwitch = async (checked:boolean) => {
    setEmailSwitch(checked);
    await updateCommunicationsPreferences("emailsCommunications", checked);
    toast(checked ? "Emails commerciaux activés" : "Emails commerciaux désactivés");
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Notifications</CardTitle>
              </div>
              <Switch
                checked={notificationSwitch}
                onCheckedChange={handleNotificationSwitch}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription>
              Recevoir des notifications concernant MedTree.
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Emails commerciaux</CardTitle>
              </div>
              <Switch
                checked={emailSwitch}
                onCheckedChange={handleEmailSwitch}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription>
              Recevez des emails promotionnels concernant MedTree.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Emails de sécurité</CardTitle>
            </div>
            <Switch
              checked={true}
              disabled
              aria-readonly
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription>
            Recevez des emails concernant la sécurité de votre compte (obligatoire).
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}


