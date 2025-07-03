import { SkeletonCircle, SkeletonText, Stack, HStack } from "@chakra-ui/react"
import { FC } from "react"

interface Props {
    itemsCount: number;
}

const SkeletonLoader: FC<Props> = ({itemsCount}) => {

  return (
    <>
      <Stack gap="6" marginTop={"2"} marginStart={"2"} width="xl">
        {Array.from({length: itemsCount}).map((_, index) => (
        <HStack key={index}>
          <SkeletonCircle size="10" />
          <SkeletonText noOfLines={2} />
        </HStack> 
        ))}
      </Stack>
    </>
  )
}

export default SkeletonLoader;