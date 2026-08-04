import { NavLink } from "react-router-dom";
import React from "react";

interface MenuItems {
  label: string;
  path: string;
}

const menuItens: MenuItems[] = [
  { label: "Inicio", path: "/" },
  { label: "Cadastro", path: "/cadastro" },
  { label: "Usuario", path: "/usuario" },

  
  
];

const Menu:React.FC = () => {

  return (
    <>
      <nav>
        <ul>
    {
        menuItens.map(x=>(
            <li>
                <NavLink to={x.path}>
                {x.label}
                </NavLink>
            </li>




        ))

    }


        </ul>
      </nav>
    </>
  );
};
export default Menu;