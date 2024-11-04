import AppHeader from "../_ui/components/home/AppHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pr-4 pl-4">
        <AppHeader/>
            <main>
                {children}
            </main>
        </div>
    )
}
