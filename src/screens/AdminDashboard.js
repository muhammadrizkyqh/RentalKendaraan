import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Center,
  Icon,
  Divider,
} from "native-base";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";

const AdminDashboard = ({ navigation }) => {
  const [orderStats, setOrderStats] = useState({
    total: 0,
    confirmed: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orders = snapshot.docs.map((doc) => doc.data());
      const stats = {
        total: orders.length,
        confirmed: orders.filter((order) => order.status === "Dikonfirmasi").length,
        rejected: orders.filter((order) => order.status === "Ditolak").length,
        pending: orders.filter((order) => order.status === "Menunggu Konfirmasi").length,
      };
      setOrderStats(stats);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("AdminLogin");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <Center flex={1} bg="gray.200">
      <Box safeArea p="4" w="90%" maxW="400" py="8" bg="white" borderRadius="lg" shadow="5">
        <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center" color="#1a73e8">
          Admin Dashboard
        </Text>
        <Divider my="4" />
        {/* Statistik Pesanan */}
        <HStack space={4} justifyContent="center" flexWrap="wrap" mb="6">
          <Box
            bg="blue.500"
            p="4"
            borderRadius="lg"
            shadow="2"
            w="45%"
            alignItems="center"
            mb="2"
          >
            <Icon as={<MaterialIcons name="assignment" />} size="lg" color="white" />
            <Text fontSize="md" fontWeight="bold" color="white" mt="2">
              Total Orders
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="white">
              {orderStats.total}
            </Text>
          </Box>
          <Box
            bg="green.500"
            p="4"
            borderRadius="lg"
            shadow="2"
            w="45%"
            alignItems="center"
            mb="2"
          >
            <Icon as={<MaterialIcons name="check-circle" />} size="lg" color="white" />
            <Text fontSize="md" fontWeight="bold" color="white" mt="2">
              Confirmed
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="white">
              {orderStats.confirmed}
            </Text>
          </Box>
          <Box
            bg="yellow.500"
            p="4"
            borderRadius="lg"
            shadow="2"
            w="45%"
            alignItems="center"
            mb="2"
          >
            <Icon as={<MaterialIcons name="hourglass-empty" />} size="lg" color="white" />
            <Text fontSize="md" fontWeight="bold" color="white" mt="2">
              Pending
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="white">
              {orderStats.pending}
            </Text>
          </Box>
          <Box
            bg="red.500"
            p="4"
            borderRadius="lg"
            shadow="2"
            w="45%"
            alignItems="center"
            mb="2"
          >
            <Icon as={<MaterialIcons name="cancel" />} size="lg" color="white" />
            <Text fontSize="md" fontWeight="bold" color="white" mt="2">
              Rejected
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="white">
              {orderStats.rejected}
            </Text>
          </Box>
        </HStack>
        <Divider my="4" />
        {/* Tombol Navigasi */}
        <VStack space={4}>
          <Button
            colorScheme="blue"
            leftIcon={<Icon as={MaterialIcons} name="directions-car" size="sm" color="white" />}
            onPress={() => navigation.navigate("ManageVehicles")}
          >
            Manage Vehicles
          </Button>
          <Button
            colorScheme="green"
            leftIcon={<Icon as={MaterialIcons} name="assignment" size="sm" color="white" />}
            onPress={() => navigation.navigate("ManageOrders")}
          >
            Manage Orders
          </Button>
          <Button
            colorScheme="yellow"
            leftIcon={<Icon as={MaterialIcons} name="history" size="sm" color="white" />}
            onPress={() => navigation.navigate("OrderHistory")}
          >
            View Order History
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<Icon as={MaterialIcons} name="logout" size="sm" color="white" />}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default AdminDashboard;
