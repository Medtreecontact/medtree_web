'use client';

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_ui/shadcn/components/ui/card";
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
import { LucideIcon } from 'lucide-react';
import { cn } from "@/app/_ui/shadcn/lib/utils";

type RoleCardProps = {
  role: 'doctor' | 'patient';
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  onSelect: (role: 'doctor' | 'patient') => void;
  isSelected?: boolean;
};

export function RoleCard({ 
  role, 
  icon: Icon, 
  title, 
  description, 
  features, 
  onSelect,
  isSelected = false 
}: RoleCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 cursor-pointer overflow-hidden",
        isSelected 
          ? "border-primary/80 shadow-lg ring-2 ring-primary/30" 
          : "hover:shadow-md hover:border-primary/50 hover:translate-y-[-4px]"
      )}
      onClick={() => onSelect(role)}
    >
      <div className={cn(
        "absolute inset-x-0 h-1 top-0 transition-colors", 
        isSelected ? "bg-primary" : "bg-transparent"
      )} />
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className={cn(
            "p-3 rounded-full transition-colors", 
            isSelected 
              ? "bg-primary text-primary-foreground" 
              : "bg-primary/10 text-primary"
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {title}
              {isSelected && (
                <Badge variant="outline" className="border-primary text-primary ml-1">
                  Sélectionné
                </Badge>
              )}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Fonctionnalités:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className={cn(
                  "mt-1 h-2 w-2 rounded-full flex-shrink-0",
                  isSelected ? "bg-primary" : "bg-primary/70"
                )} />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Button 
          className={cn("w-full", isSelected ? "bg-primary" : "")}
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? "Rôle sélectionné" : `Choisir le rôle de ${title.toLowerCase()}`}
        </Button>
      </CardFooter>
    </Card>
  );
}