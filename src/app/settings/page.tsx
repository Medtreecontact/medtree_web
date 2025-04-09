import { cookies } from "next/headers";
import { AboutSection } from "../_ui/components/settings/about_section";
import { CommunicationsSelection } from "../_ui/components/settings/communications_selection";
import { ContactForm } from "../_ui/components/settings/contact_form";
import { RequestAccountData } from "../_ui/components/settings/request_account_data";
import { RequestAccountDeletion } from "../_ui/components/settings/request_account_deletion";
import { ThemeSelection } from "../_ui/components/settings/theme_selection";
import { SESSION_COOKIE_NAME } from "@/core/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../_ui/shadcn/components/ui/card";
import { Palette, Bell, MessageSquare, FileText, UserX, Info } from "lucide-react";
import { Separator } from "../_ui/shadcn/components/ui/separator";

export default async function SettingsPage() {
    let user = null;
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        user = JSON.parse(session.value);
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
            
            <div className="grid gap-8">
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                            <Palette className="h-5 w-5 text-primary" />
                            <CardTitle>Apparence</CardTitle>
                        </div>
                        <CardDescription>Personnalisez l'affichage de MedTree</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ThemeSelection />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <CardTitle>Communications</CardTitle>
                        </div>
                        <CardDescription>Gérez vos préférences de communication</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CommunicationsSelection 
                            userEmailsCommunications={user.emailsCommunications ?? false} 
                            userNotifications={user.notifications ?? false}
                        />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            <CardTitle>Support</CardTitle>
                        </div>
                        <CardDescription>Besoin d'aide ? Contactez-nous</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContactForm />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <CardTitle>Données personnelles</CardTitle>
                        </div>
                        <CardDescription>Gérez vos données personnelles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <RequestAccountData />
                        <Separator />
                        <RequestAccountDeletion />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                            <Info className="h-5 w-5 text-primary" />
                            <CardTitle>Informations légales</CardTitle>
                        </div>
                        <CardDescription>À propos de MedTree</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AboutSection />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}