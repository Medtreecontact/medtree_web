"use client";

import { useState } from "react";
import { Switch } from "../../shadcn/components/ui/switch";
import { updateCommunicationsPreferences } from "@/app/actions";

export function CommunicationsSelection({userNotifications, userEmailsCommunications}: {userNotifications: boolean, userEmailsCommunications: boolean}) {
  const [notificationSwitch, setNotificationSwitch] = useState(userNotifications);
  const [emailSwitch, setEmailSwitch] = useState(userEmailsCommunications);

  const handleNotificationSwitch = (checked:boolean) => {
    setNotificationSwitch(checked);
    updateCommunicationsPreferences("notifications", checked);
  }

  const handleEmailSwitch = (checked:boolean) => {
    setEmailSwitch(checked);
    updateCommunicationsPreferences("emailsCommunications", checked);

  }

  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl font-semibold">Email et Notifications</h3>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2">
              <div className="space-y-0.5">
                  <p className="text-lg font-semibold">Notifications</p>
                  <p className="text-gray-600">
                    Recevoir des notifications concernant MedTree.
                  </p>
              </div>
              <Switch
                  checked={notificationSwitch}
                  onCheckedChange={handleNotificationSwitch}
              />
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2">
              <div className="space-y-0.5">
                  <p className="text-lg font-semibold">Emails commerciaux</p>
                  <p className="text-gray-600">
                    Recevez des emails promotionels concernant MedTree.
                  </p>
              </div>
              <Switch
                  checked={emailSwitch}
                  onCheckedChange={handleEmailSwitch}
              />
          </div>
        </div>
        <div className="flex space-x-4">

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2">
              <div className="space-y-0.5">
              <p className="text-lg font-semibold">Emails de sécurité</p>
              <p className="text-gray-600">
                  Recevez des emails concernant votre compte.
              </p>
              </div>
              <Switch
                  checked={true}
                  disabled
                  aria-readonly
              />
          </div>
          <div className="flex  w-1/2">
              
          </div>
        </div>
    </div>
</div>
)
}

  
