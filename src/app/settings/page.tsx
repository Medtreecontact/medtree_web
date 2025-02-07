import { AboutSection } from "../_ui/components/settings/about_section";
import { CommunicationsSelection } from "../_ui/components/settings/communications_selection";
import { ContactForm } from "../_ui/components/settings/contact_form";
import { RequestAccountData } from "../_ui/components/settings/request_account_data";
import { RequestAccountDeletion } from "../_ui/components/settings/request_account_deletion";
import { ThemeSelection } from "../_ui/components/settings/theme_selection";

export default async function SettingsPage() {
    return (
        <div>
            <ThemeSelection />
            <CommunicationsSelection />
            <ContactForm />
            <RequestAccountData />
            <RequestAccountDeletion />
            <AboutSection />
        </div>
    );
}