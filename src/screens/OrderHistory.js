import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  ScrollView,
  Badge,
  Center,
  Button,
  Icon,
} from "native-base";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";

const OrderHistory = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

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

  return (
    <ScrollView flex={1} bg="gray.100">
      <Center>
        <Box safeArea p="4" w="90%" maxW="400" py="8">
          <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center" color="blue.700">
            Order History
          </Text>
          <VStack space={4}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Box
                  key={order.id}
                  bg="white"
                  p="4"
                  borderRadius="lg"
                  shadow="2"
                  w="100%"
                >
                  <Text fontSize="lg" fontWeight="bold" color="blue.700">
                    {order.vehicleName}
                  </Text>
                  <Text>
                    <Text bold>User:</Text> {order.userName}
                  </Text>
                  <Text>
                    <Text bold>Start Date:</Text>{" "}
                    {new Date(order.startDate.seconds * 1000).toDateString()}
                  </Text>
                  <Text>
                    <Text bold>End Date:</Text>{" "}
                    {new Date(order.endDate.seconds * 1000).toDateString()}
                  </Text>
                  <Badge
                    colorScheme={
                      order.status === "Menunggu Konfirmasi"
                        ? "yellow"
                        : order.status === "Dikonfirmasi"
                        ? "green"
                        : "red"
                    }
                    alignSelf="flex-start"
                  >
                    {order.status}
                  </Badge>
                </Box>
              ))
            ) : (
              <Text textAlign="center" color="gray.500">
                No orders found.
              </Text>
            )}
          </VStack>
          <Button
            mt="6"
            colorScheme="blue"
            leftIcon={<Icon as={MaterialIcons} name="arrow-back" size="sm" color="white" />}
            onPress={() => navigation.goBack()}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default OrderHistory;
