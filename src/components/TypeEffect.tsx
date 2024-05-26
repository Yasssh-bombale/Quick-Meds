import TypeWriterComponent from "typewriter-effect";

const TypeEffect = () => {
  return (
    <div className="text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500 font-semibold mt-10 lg:mt-20 mx-auto p-2">
      <TypeWriterComponent
        options={{
          strings: [
            "Connecting You with Local Pharmacies You Trust",
            "Empowering Local Pharmacies",
            "Your Community Pharmacies, Online and Ready",
            "Local Care, Global Convenience",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TypeEffect;
