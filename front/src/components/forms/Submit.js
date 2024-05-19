import Spinner from "./Spinner";
import { classNames } from "src/utils";

const Submit = ({ children, disabled }) => {
  return (
    <>
      <button
        type="submit"
        disabled={disabled}
        className={classNames(
          "px-10 py-3 rounded-full relative bg-indigo-700 text-white",
          "font-semibold mt-8 shadow-sm shadow-zinc-400  hover:shadow-none min-w-[220px]",
          "disabled:cursor-not-allowed disabled:border-transparent",
          "disabled:shadow-none disabled:bg-zinc-200 disabled:text-zinc-400"
        )}
      >
        {disabled && (
          <span className="absolute left-4">
            <Spinner />
          </span>
        )}

        {children || "Submit"}
      </button>
    </>
  );
};

export default Submit;
