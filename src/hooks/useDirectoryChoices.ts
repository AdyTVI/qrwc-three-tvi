// hooks/useDirectoryChoices.ts
import { useQsys } from "@/context/QsysProvider";
import { useEffect, useState } from "react";

export const useDirectoryChoices = (
  componentName: string,
  controlName: string
) => {
  const { components } = useQsys();
  const [value, setValue] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    const control = components?.[componentName]?.controls?.[controlName];
    const currentValue = control?.state?.String;
    const availableChoices = control?.state?.Choices;

    if (typeof currentValue === "string") setValue(currentValue);
    if (Array.isArray(availableChoices)) setChoices(availableChoices);

    const interval = setInterval(() => {
      const updatedControl = components?.[componentName]?.controls?.[controlName];
      const newValue = updatedControl?.state?.String;
      const newChoices = updatedControl?.state?.Choices;

      if (typeof newValue === "string") setValue(newValue);
      if (Array.isArray(newChoices)) setChoices(newChoices);
    }, 200);

    return () => clearInterval(interval);
  }, [components, componentName, controlName]);

  // ✅ This is what sends the update to Q-SYS
  const select = (newValue: string) => {
    const control = components?.[componentName]?.controls?.[controlName];
    if (control && typeof control.update === "function") {
      control.update(newValue); // or control.update({ String: newValue }); depending on your schema
      setValue(newValue);
    } else {
      console.warn("Control or update function not available");
    }
  };

  return { value, choices, select };
};
