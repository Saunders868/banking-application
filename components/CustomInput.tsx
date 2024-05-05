import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const authFormSchema = formSchema("sign-up");

type Props = {
  form: {
    control: Control<z.infer<typeof authFormSchema>>;
  };
  name: FieldPath<z.infer<typeof authFormSchema>>;
  type: string;
  label: string;
  placeholder: string;
};

const CustomInput = ({ form, name, label, type, placeholder }: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
