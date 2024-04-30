import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function InputPassword({ ...props }) {
  const [changeInputType, setShangeInputType] = useState(true);
  return (
    <div className="relative">
      <Input
        type={changeInputType ? "password" : "text"}
        placeholder="****"
        {...props}
      />
      <Button
        type="button"
        className="absolute right-0 top-0 rounded-s-none"
        size={"icon"}
        onClick={() => setShangeInputType(!changeInputType)}
      >
        {changeInputType ? (
          <EyeOpenIcon className="w-4 h-4" />
        ) : (
          <EyeClosedIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
