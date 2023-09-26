import Header from "./Header";

const PageHeader = ({ children, about = false }) => {

  return (
    <section
      className={`relative ${about ? 'lg:h-screen' : 'h-auto pb-12'} bg-cover bg-center bg-no-repeat mt-[0px] px-[20px] md:px-0 lg:px-0`}
      style={{ backgroundImage: `url(${ about ? '/home-bg.jpg' : '/all-talentz-header.jpg'})` }}
    >
      <Header />

      <div className={`flex items-center justify-center h-[100%]  ${about ? 'lg:mt-[-40px]' : ''}`}>
        {children}

      </div>
    </section>
  );
};

export default PageHeader;
