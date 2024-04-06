import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col border border-black min-h-screen p-2">
      {/* Navbar */}
      <Header />
      <div className="container mx-auto py-10 min-h-screen">{children}</div>
      hey
    </div>
  );
};

export default Layout;
