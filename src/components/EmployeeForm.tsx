import { FC } from "react";
import { Employee } from "../model/dto-types";
import { useForm } from "react-hook-form";
import employeesConfig from "../../config/employees-config.json"
import {
  Stack,
  SimpleGrid,
  HStack,
  Field,
  Input, 
  NativeSelect,
  Button,
} from "@chakra-ui/react";

interface Props {
  submitter: (empl: Employee) => void;
}
const EmployeeForm: FC<Props> = ({ submitter }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>(
    {mode: "onChange"}
  );
  const onSubmit = (data: Employee) => {
    submitter(data)
    reset()
    alert("Employee successfully added")
  }
  const thisYear = new Date().getFullYear();
  const minYear = thisYear - employeesConfig.maxAge;
  const maxYear = thisYear - employeesConfig.minAge;

  return (
    <Stack  as="form" align="center" onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        columnGap="2" rowGap="4"
      >
        <Field.Root invalid={!!errors.department}>
          <Field.Label>Department</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field 
              placeholder="Select Department"
              {...register("department", { required: true })}
              
            >
                {employeesConfig.departments.map(d => <option key={d} value={d}>{d}</option>)}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>Department must be selected</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.fullName} >
          <Field.Label>Full Name</Field.Label>
          <Input size="sm" 
          placeholder="Enter Full Name" {...register("fullName", { 
            required: "Full Name is required",
            pattern: { value: /^[a-zA-Z\s'-]+$/, message: "Full Name must contain only letters, spaces, apostrophes and hyphens" },
            minLength: { value: 5, message: "Full Name must be at least 5 characters" },
            maxLength: { value: 50, message: "Full Name must be less than 50 characters" }
          })}
          />
          <Field.ErrorText>{errors.fullName?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.birthDate} >
          <Field.Label>Birth Date</Field.Label>
          <Input size="sm" type="date"
          placeholder="Select Birth Date" {...register("birthDate", { 
            required: "Birth Date is required",
            min: { value: `${minYear}-01-01`, message: `Birth Date must be no more than ${employeesConfig.maxAge} years ago` },
            max: { value: `${maxYear}-01-01`, message: `Birth Date must be at least ${employeesConfig.minAge} years ago` }
          })}
          />
          <Field.ErrorText>{errors.birthDate?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.salary}>
          <Field.Label>Salary</Field.Label>
          <Input size="sm" type="number" step={100}
          placeholder="Enter salary in NIS" {...register("salary", { 
            required: "Salary is required",
            min: { value: employeesConfig.minSalary, message: `Salary must be greater than ${employeesConfig.minSalary} NIS` },
            max: { value: employeesConfig.maxSalary, message: `Salary must be less than ${employeesConfig.maxSalary} NIS` },
            valueAsNumber: true
          })}
          />
          <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
        </Field.Root>
      </SimpleGrid>
      <HStack>
        <Button bg="green.500" type="submit">Save</Button>
        <Button bg="red.500" type="reset" onClick={() => reset()}>Reset</Button>
      </HStack>
    </Stack>
  );
};

export default EmployeeForm;
