import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  VStack,
  Center,
  ScrollView,
  HStack,
  Icon,
  Badge,
  useToast,
} from "native-base";
import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vehicles"), (snapshot) => {
      const vehicleList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(vehicleList);
    });
    return unsubscribe;
  }, []);

  const handleAddVehicle = async () => {
    if (!name || !type || !price) {
      toast.show({ description: "Please fill in all fields", bgColor: "red.500" });
      return;
    }
    try {
      setIsLoading(true);
      await addDoc(collection(db, "vehicles"), {
        name,
        type,
        price: parseFloat(price),
        available: true,
      });
      toast.show({ description: "Vehicle added successfully", bgColor: "green.500" });
      setName("");
      setType("");
      setPrice("");
    } catch (error) {
      toast.show({ description: `Error: ${error.message}`, bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (!editName || !editType || !editPrice) {
      toast.show({ description: "Please fill in all fields", bgColor: "red.500" });
      return;
    }
    try {
      setIsLoading(true);
      const vehicleRef = doc(db, "vehicles", editId);
      await updateDoc(vehicleRef, {
        name: editName,
        type: editType,
        price: parseFloat(editPrice),
      });
      toast.show({ description: "Vehicle updated successfully", bgColor: "green.500" });
      setEditId(null);
      setEditName("");
      setEditType("");
      setEditPrice("");
    } catch (error) {
      toast.show({ description: `Error: ${error.message}`, bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      setIsLoading(true);
      const vehicleRef = doc(db, "vehicles", vehicleId);
      await deleteDoc(vehicleRef);
      toast.show({ description: "Vehicle deleted successfully", bgColor: "green.500" });
    } catch (error) {
      toast.show({ description: `Error: ${error.message}`, bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStart = (vehicle) => {
    setEditId(vehicle.id);
    setEditName(vehicle.name);
    setEditType(vehicle.type);
    setEditPrice(vehicle.price.toString());
  };

  return (
    <ScrollView flex={1} bg="gray.100">
      <Center>
        <Box safeArea p="4" w="90%" maxW="400" py="8">
          <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center" color="blue.700">
            Manage Vehicles
          </Text>
          {editId ? (
            <VStack space={4} mt="4" bg="white" p="4" borderRadius="lg" shadow="2">
              <Text fontSize="lg" fontWeight="bold" color="blue.700">
                Edit Vehicle
              </Text>
              <Input
                placeholder="Vehicle Name"
                value={editName}
                onChangeText={setEditName}
                variant="filled"
              />
              <Input
                placeholder="Vehicle Type"
                value={editType}
                onChangeText={setEditType}
                variant="filled"
              />
              <Input
                placeholder="Price per Day"
                value={editPrice}
                onChangeText={setEditPrice}
                keyboardType="numeric"
                variant="filled"
              />
              <Button colorScheme="blue" onPress={handleEditSave} isLoading={isLoading}>
                Save Changes
              </Button>
              <Button colorScheme="gray" onPress={() => setEditId(null)}>
                Cancel
              </Button>
            </VStack>
          ) : (
            <VStack space={4} bg="white" p="4" borderRadius="lg" shadow="2">
              <Text fontSize="lg" fontWeight="bold" color="blue.700">
                Add New Vehicle
              </Text>
              <Input
                placeholder="Vehicle Name"
                value={name}
                onChangeText={setName}
                variant="filled"
              />
              <Input
                placeholder="Vehicle Type"
                value={type}
                onChangeText={setType}
                variant="filled"
              />
              <Input
                placeholder="Price per Day"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                variant="filled"
              />
              <Button colorScheme="blue" onPress={handleAddVehicle} isLoading={isLoading}>
                Add Vehicle
              </Button>
            </VStack>
          )}
          {vehicles.map((vehicle) => (
            <Box
              key={vehicle.id}
              bg="white"
              p="4"
              borderRadius="lg"
              shadow="2"
              my="3"
              w="100%"
            >
              <HStack justifyContent="space-between">
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="blue.700">
                    {vehicle.name}
                  </Text>
                  <Text>Type: {vehicle.type}</Text>
                  <Text>Price: ${vehicle.price}/day</Text>
                  <Badge
                    colorScheme={vehicle.available ? "green" : "red"}
                    alignSelf="flex-start"
                  >
                    {vehicle.available ? "Available" : "Not Available"}
                  </Badge>
                </VStack>
                <VStack space={2}>
                  <Button
                    size="sm"
                    leftIcon={
                      <Icon as={MaterialIcons} name="edit" size="sm" color="white" />
                    }
                    onPress={() => handleEditStart(vehicle)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    leftIcon={
                      <Icon as={MaterialIcons} name="delete" size="sm" color="white" />
                    }
                    onPress={() => handleDelete(vehicle.id)}
                  >
                    Delete
                  </Button>
                </VStack>
              </HStack>
            </Box>
          ))}
        </Box>
      </Center>
    </ScrollView>
  );
};

export default ManageVehicles;
