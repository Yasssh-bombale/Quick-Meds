import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen p-2">
      {/* Navbar */}
      <Header />
      <div className="container mx-auto py-10 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
