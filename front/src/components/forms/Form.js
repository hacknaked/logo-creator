import { useRef } from "react";
import { useMutation } from "@apollo/client";
import Submit from "./Submit";

const Form = ({ children, mutation, onCompleted }) => {
  const [runMutation, { loading, error }] = useMutation(mutation, {
    onCompleted: onCompleted,
  });

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const input = {};
    formData.forEach((value, key) => {
      input[key] = value;
    });
    console.log(input);

    await runMutation({
      variables: { input: { companyName: input.companyName } },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-0 space-y-6">{children}</div>
        <div className="flex justify-center mt-4">
          <Submit disabled={loading}>
            {loading ? "Please wait..." : "Generate logo"}
          </Submit>
        </div>
      </form>
    </>
  );
};

export default Form;
