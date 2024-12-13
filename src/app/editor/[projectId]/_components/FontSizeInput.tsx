import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent } from "react";

interface propsType {
  value: number;
  onChange: (value: number) => void;
}


export default function FontSizeInput({
  value,
  onChange
}: propsType) {

  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  }

  return(
    <>
      <div className="flex item-center">
        <Button
          onClick={decrement}
          variant={"outline"}
          className="p-2 rounded-r-none border-r-0"
          size={"icon"}
        >
          <Minus className="size-4" />
        </Button>
        <Input
          onChange={handleChange}
          value={value}
          className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
        />
        <Button
        onClick={increment}
          variant={"outline"}
          className="p-2 rounded-l-none border-l-0"
          size={"icon"}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </>
  );
}