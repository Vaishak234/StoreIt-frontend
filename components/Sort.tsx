'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


const Sort = () => {

  
  const path = usePathname();
  const router = useRouter()

  const handleSort = (value: string) => {

    router.push(`${path}?sort=${value}`);
  };


  return (
    <div>
      <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
        <SelectTrigger className="sort-select">
          <SelectValue placeholder={sortTypes[0].value} />
        </SelectTrigger>
        <SelectContent className="sort-select-content">
          {
            sortTypes.map((sort, index) => (
              <SelectItem
                key={`${sort.label}_${index}`}
                className="shad-select-item"
                value={sort.value}>
                {sort.label}
              </SelectItem>
            ))
          }

          
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
