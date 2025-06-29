import Statistics from '../components/Statistics'
import useData from '../hooks/useData'

const SalaryStatisticsPage = () => {
  const {data: employees} = useData();

  return (
    <Statistics numbers={employees?.map(e => e.salary) || []} interval={5000} label={'Salary'} ></Statistics>
  )
}

export default SalaryStatisticsPage