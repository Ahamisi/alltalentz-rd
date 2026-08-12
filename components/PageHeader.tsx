interface PageHeaderProps {
  children?: React.ReactNode;
  about?: boolean;
  bgImage?: string;
  showBg?: boolean;
}

const PageHeader = ({ children, about = false, bgImage, showBg = true }: PageHeaderProps) => {
  return (
    <section
      className={`relative ${about ? "h-auto lg:h-screen pb-12 lg:pb-0" : "h-auto pb-12"} ${bgImage ? "pb-3" : ""}  ${showBg ? "" : "bg-black"} bg-cover bg-center bg-no-repeat mt-0 px-[10px] md:px-0 lg:px-0`}
      style={{
        backgroundImage: showBg
          ? `url(${bgImage || (about ? "/home-bg.jpg" : "/all-talentz-header.jpg")})`
          : "none",
      }}
    >
      <div className={`flex items-center justify-center h-full  ${about ? "lg:mt-[-40px]" : ""}`}>
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
