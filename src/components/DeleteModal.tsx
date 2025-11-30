import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>

        <ModalBody>
          <Text>Are you sure you want to delete this post? This action cannot be undone.</Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button
            colorScheme="red"
            onClick={onConfirm}
            isLoading={loading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
