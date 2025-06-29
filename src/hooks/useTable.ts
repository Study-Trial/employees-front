import useData from "./useData";
import { useSearchObject } from "./useSearchObject";


export const useTable = () => {
    const searchObject = useSearchObject();
    return useData(searchObject);
}   

export default useTable;