"use client";

import { useState } from "react";
import { Switch } from "../../shadcn/components/ui/switch";
import { set } from "zod";

export function CommunicationsSelection() {
  const [notificationSwitch, setnotificationSwitch] = useState(false);
  const [emailSwitch, setEmailSwitch] = useState(false);

//   const handleSwitchChange = (checked: boolean) => {
//     setIsSwitchOn(checked);
//   };

  return (
    <div className="w-full space-y-6">
      <h3 className="text-xl font-semibold">Email et Notifications</h3>
      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <p className="text-lg font-semibold">Notifications</p>
                <p className="text-gray-600">
                  Recevoir des notifications concernant MedTree.
                </p>
            </div>
            <Switch
                checked={notificationSwitch}
                onCheckedChange={setnotificationSwitch}
            />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <p className="text-lg font-semibold">Emails commerciaux</p>
                <p className="text-gray-600">
                  Recevez des emails promotionels concernant MedTree.
                </p>
            </div>
            <Switch
                checked={emailSwitch}
                onCheckedChange={setEmailSwitch}
            />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
    </div>
</div>
)
}

  
