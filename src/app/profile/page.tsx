import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import { ProfileForm } from "../_ui/components/profile/profile_form";
import { ChangePasswordForm } from "../_ui/components/profile/change_password_form";
import ShopButton from "../_ui/components/content/shop_button";
import { ProfilePicture } from "../_ui/components/profile/profile_picture";
import { getProfilePictureController } from '@/interface_adapters/controllers/profile/user_profile_picture_controller';

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
        profilePicture = await getProfilePictureController(user.id);
    } catch (error) {
        console.error(error);
    }

    return <div className="m-8">
        <div className="flex items-end space-x-4">
            <h2 className="text-2xl font-semibold">Informations générales</h2>
            <p className="text-lg text-gray-500">Vous pouvez modifier ces informations</p>
        </div>
        <div className="flex">
            <div className="w-1/2 flex items-center justify-start">
                <ProfileForm user={user}/>
            </div>
            <div className="w-1/2 flex items-center justify-start">
                <ProfilePicture userId={user.id} profilePicture={profilePicture}/>
            </div>
        </div>
        <h2 className="mt-8 text-2xl font-semibold">Mot de passe</h2>
        <ChangePasswordForm />
        <h2 className="mt-8 text-2xl font-semibold">Votre abonnement MedTree</h2>
        {user.purchased ? 
            <p>Vous avez un abonnement actif</p> 
        : 
            <div className="flex items-center space-x-6 mt-4">
                <div className="flex flex-col">
                    <p>Vous n'avez pas d'abonnement actif.</p>
                    <p> Vous accéder à une version limitée de MedTree.</p>
                </div>
                <ShopButton />
            </div>
        }
    </div>
}


// verify email
// change email
// profile picture