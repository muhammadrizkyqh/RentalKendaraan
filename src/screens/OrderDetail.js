import React, { useState } from "react";
import { Box, Button, Center, Heading, Text, Icon, useDisclose, Modal, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const OrderDetail = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [rejectionReason, setRejectionReason] = useState("");

  return (
    <Center flex={1} bg="white">
      <Box safeArea p="4" w="90%" maxW="300" py="8">
        <Heading size="lg" fontWeight="600" color="coolGray.800" textAlign="center">
          Order Detail
        </Heading>
        <Text mt="4">Order ID: {order.id}</Text>
        <Text>Customer: {order.customerName}</Text>
        <Text>Vehicle: {order.vehicleName}</Text>
        <Text>Status: {order.status}</Text>
        <Text>Start Date: {new Date(order.startDate.seconds * 1000).toLocaleDateString()}</Text>
        <Text>End Date: {new Date(order.endDate.seconds * 1000).toLocaleDateString()}</Text>
        <Button
          colorScheme="red"
          leftIcon={<Icon as={MaterialIcons} name="close" size="sm" color="white" />}
          onPress={onOpen}
          mt="4"
        >
          Reject
        </Button>
        <Button
          colorScheme="blue"
          leftIcon={<Icon as={MaterialIcons} name="arrow-back" size="sm" color="white" />}
          onPress={() => navigation.goBack()}
          mt="4"
        >
          Back
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Reject Order</Modal.Header>
            <Modal.Body>
              <Text mb="4">Please provide a reason for rejecting this order:</Text>
              <Input
                placeholder="Reason"
                value={rejectionReason}
                onChangeText={setRejectionReason}
                variant="filled"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                colorScheme="red"
                mr="2"
                onPress={async () => {
                  try {
                    const orderRef = doc(db, "orders", order.id);
                    await updateDoc(orderRef, { status: "Ditolak", rejectionReason });
                    onClose();
                    navigation.goBack();
                  } catch (error) {
                    console.error("Error rejecting order:", error);
                  }
                }}
              >
                Submit
              </Button>
              <Button colorScheme="gray" onPress={onClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </Center>
  );
};

export default OrderDetail;