import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};

const PHForm = ({ onSubmit, children, defaultValues }: TFromProps) => {
  const methods = useForm({defaultValues});

  return (
    <FormProvider {...methods}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default PHForm;
