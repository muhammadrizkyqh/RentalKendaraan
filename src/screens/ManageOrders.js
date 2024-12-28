import React, { useState, useEffect } from "react";
import { VStack, Box, Text, Button, Icon, Center, ScrollView, Heading } from "native-base";
import { db } from "../config/firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    });
    return unsubscribe;
  }, []);

  const handleConfirmOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: "Dikonfirmasi" });
      toast.show({ description: "Order confirmed successfully", bgColor: "green.500" });
    } catch (error) {
      toast.show({ description: `Error: ${error.message}`, bgColor: "red.500" });
    }
  };

  return (
    <ScrollView flex={1} bg="white">
      <Center flex={1} bg="white">
        <Box safeArea p="4" w="90%" maxW="300" py="8">
          <Heading size="lg" fontWeight="600" color="coolGray.800" textAlign="center">
            Manage Orders
          </Heading>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Box
                key={order.id}
                borderWidth={1}
                borderRadius="md"
                borderColor="coolGray.300"
                p="4"
                mb="2"
                w="100%"
              >
                <Text bold>Order ID: {order.id}</Text>
                <Text>Customer: {order.customerName}</Text>
                <Text>Vehicle: {order.vehicleName}</Text>
                <Text>Status: {order.status}</Text>
                <Button
                  colorScheme="blue"
                  size="sm"
                  leftIcon={<Icon as={MaterialIcons} name="visibility" size="sm" color="white" />}
                  onPress={() => navigation.navigate("OrderDetail", { order })}
                >
                  View Detail
                </Button>
                <Button
                  colorScheme="green"
                  size="sm"
                  mt="2"
                  onPress={() => handleConfirmOrder(order.id)}
                >
                  Confirm Order
                </Button>
              </Box>
            ))
          ) : (
            <Text mt="4" textAlign="center">
              No orders found.
            </Text>
          )}
        </Box>
      </Center>
    </ScrollView>
  );
};

export default ManageOrders;