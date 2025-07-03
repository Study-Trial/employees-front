import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { FC } from "react";
import { useColorModeValue } from "./ui/color-mode";

interface Props {
  action: () => void;
  label?: string;
}

const DeletionButton: FC<Props> = ({ action, label="item"}) => {
    const bg = useColorModeValue("red.500", "red.200");
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button size="sm" background={bg}>
          Delete
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                This action cannot be undone. This will permanently delete the selected 
                {label} from our systems.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={action} background={bg}>Delete</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DeletionButton;