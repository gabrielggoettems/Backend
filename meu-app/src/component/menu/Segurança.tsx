import Menu from "./Menu";

interface SegurancaProps {
  children: React.ReactNode;
}
const Seguranca:React.FC<SegurancaProps> = ({ children }) => {


  return (
    <>
    <Menu />
    {children}

    </>

  );
};
export default Seguranca;