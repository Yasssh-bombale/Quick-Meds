export type formLayoutTypes = {
  children: React.ReactNode;
  heading: string;
};

const FormPagesLayout = ({ children, heading }: formLayoutTypes) => {
  return (
    <div className="p-2 min-h-screen flex flex-col md:px-36">
      <h1 className="text-center text-4xl tracking-tight font-bold">
        {heading}
      </h1>

      {/*  formpages */}
      {children}
    </div>
  );
};

export default FormPagesLayout;
