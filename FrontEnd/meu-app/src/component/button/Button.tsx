import styles from "./Button.module.css";

type Props = {
  texto: string;
  Click?: () => void;
};



function Button({ texto, Click }: Props) {
  return (
    <>
      <button onClick={Click}  className={styles["botao"]} >
        {texto}
        </button>
    </>
  );
}

export default Button;
