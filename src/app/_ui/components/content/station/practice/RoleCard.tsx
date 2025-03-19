'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { LucideIcon } from 'lucide-react';

type RoleCardProps = {
  role: 'doctor' | 'patient';
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  onSelect: (role: 'doctor' | 'patient') => void;
};

export function RoleCard({ role, icon: Icon, title, description, features, onSelect }: RoleCardProps) {
  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary"
      onClick={() => onSelect(role)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Select {title} Role</Button>
      </CardFooter>
    </Card>
  );
}