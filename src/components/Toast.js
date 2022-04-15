import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";

const Toast = ({ type, message, setShowToast, link }) => {
  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }, []);
  return (
    <div
      className={`${styles.wrapper} ${
        type === "SUCCESS" ? `${styles.success}` : `${styles.error}`
      }`}
    >
      {type === "SUCCESS" && (
        <IoMdCheckmarkCircleOutline size={48} color="green" />
      )}
      {type === "ERROR" && <CgDanger size={48} color="red" />}
      <p className={styles.message}>
        {`${message.slice(0, 60)}`}
        {link && <a href={link}>here</a>}
      </p>
      <AiOutlineClose size={48} onClick={() => setShowToast(false)} />
    </div>
  );
};

const styles = {
  wrapper: `fixed top-5 left-5 px-4 py-2 rounded-xl w-72 z-50 font-medium flex justify-center items-center space-x-2 border`,
  success: `bg-green-100 border-green-500 text-green-500`,
  error: `bg-red-100 border-red-500 text-red-500`,
  message: `line-clamp-4`,
};

export default Toast;
