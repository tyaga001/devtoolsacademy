import Navigation from './Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <Navigation />
            {children}
        </div>
    )
}