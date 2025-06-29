
import Statistics from "../components/Statistics"
import { getAge } from "../util/functions"
import useData from "../hooks/useData"

const AgeStatisticsPage = () => {
  const {data: employees} = useData();
 
   return (
     <Statistics numbers={employees?.map(e => getAge(e.birthDate)) || []} interval={10} label={'Age'} ></Statistics>
   )
 }

export default AgeStatisticsPage