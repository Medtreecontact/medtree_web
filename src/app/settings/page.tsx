import { cookies } from "next/headers";
import { AboutSection } from "../_ui/components/settings/about_section";
import { CommunicationsSelection } from "../_ui/components/settings/communications_selection";
import { ContactForm } from "../_ui/components/settings/contact_form";
import { RequestAccountData } from "../_ui/components/settings/request_account_data";
import { RequestAccountDeletion } from "../_ui/components/settings/request_account_deletion";
import { ThemeSelection } from "../_ui/components/settings/theme_selection";
import { SESSION_COOKIE_NAME } from "@/core/constants";

export default async function SettingsPage() {
    let user = null;
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    if (session)
    {
        user = JSON.parse(session.value);
    }

    return (
        <div className="m-8 space-y-8">
            <ThemeSelection />
            <CommunicationsSelection userEmailsCommunications={user.emailsCommunications ?? false} userNotifications={user.notifications ?? false}/>
            <ContactForm />
            <RequestAccountData />
            <RequestAccountDeletion />
            <AboutSection />
        </div>
    );
}