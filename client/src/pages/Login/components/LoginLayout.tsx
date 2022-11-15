type LoginLayoutProps = {
    children: React.ReactNode;
}

function LoginLayout({ children }: LoginLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center flex-grow bg-gray-100 px-6 py-8 lg:px-20 lg:py-10">
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;