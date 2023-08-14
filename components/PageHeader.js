import Header from "./Header";
const PageHeader = ({children}) => {
  return (
    <section
      className="relative h-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/all-talentz-header.jpg')" }}
    >
        <Header/>
        { children }
    </section>
  );
};

export default PageHeader;
