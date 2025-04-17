import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import { ProfileForm } from "../_ui/components/profile/profile_form";
import { ChangePasswordForm } from "../_ui/components/profile/change_password_form";
import ShopButton from "../_ui/components/content/shop_button";
import { ProfilePicture } from "../_ui/components/profile/profile_picture";
import { getProfilePictureController } from '@/interface_adapters/controllers/profile/user_profile_picture_controller';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../_ui/shadcn/components/ui/card";
import { Separator } from "../_ui/shadcn/components/ui/separator";
import { LockKeyhole, UserCog, CreditCard } from "lucide-react";

export default async function ProfilePage() {
    let user = null;
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        user = JSON.parse(session.value);
        if (user.email.endsWith('@privaterelay.appleid.com')) {
            user.email = '';
        }
    }

    let profilePicture = "https://github.com/shadcn.png";
      
    try {
        profilePicture = await getProfilePictureController(user.uid, user.id);
    } catch (error) {
        console.log("using default profile picture");
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
            
            <Card className="mb-8">
                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                        <UserCog className="h-5 w-5 text-primary" />
                        <CardTitle>Informations générales</CardTitle>
                    </div>
                    <CardDescription>Vous pouvez modifier ces informations à tout moment</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-3/5">
                            <ProfileForm user={user}/>
                        </div>
                        <div className="md:w-2/5 flex justify-center md:justify-end items-start">
                            <ProfilePicture uid={user.uid} userId={user.id} profilePicture={profilePicture}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="mb-8">
                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                        <LockKeyhole className="h-5 w-5 text-primary" />
                        <CardTitle>Mot de passe</CardTitle>
                    </div>
                    <CardDescription>Gérez la sécurité de votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChangePasswordForm />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <CardTitle>Votre abonnement MedTree</CardTitle>
                    </div>
                    <CardDescription>Accédez à toutes les fonctionnalités de MedTree</CardDescription>
                </CardHeader>
                <CardContent>
                    {user.purchased ? (
                        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md border border-green-200">
                            <p className="font-medium">Vous avez un abonnement actif</p>
                            <p className="text-sm mt-1">Profitez de toutes les fonctionnalités de MedTree</p>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-amber-50 p-4 rounded-md border border-amber-200">
                            <div className="flex flex-col">
                                <p className="font-medium text-amber-800">Vous n'avez pas d'abonnement actif</p>
                                <p className="text-amber-700 text-sm mt-1">Vous accédez à une version limitée de MedTree</p>
                            </div>
                            <ShopButton />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}