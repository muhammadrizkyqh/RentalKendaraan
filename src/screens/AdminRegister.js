import React, { useState } from "react";
import { VStack, Input, Button, Box, Text, Center, Icon, useToast } from "native-base";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

const AdminRegister = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      toast.show({ description: "Please fill in all fields", bgColor: "red.500" });
      return;
    }
    if (password !== confirmPassword) {
      toast.show({ description: "Passwords do not match", bgColor: "red.500" });
      return;
    }
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.show({ description: "Registration successful", bgColor: "green.500" });
      navigation.navigate("AdminLogin");
    } catch (err) {
      toast.show({ description: `Error: ${err.message}`, bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center flex={1} bg="gray.100">
      <Box safeArea p="4" w="90%" maxW="400" py="8" bg="white" borderRadius="lg" shadow="2">
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center" color="blue.700">
          Admin Register
        </Text>
        <VStack space={4}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            variant="filled"
            InputLeftElement={<Icon as={<MaterialIcons name="email" />} size="sm" ml="2" />}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            variant="filled"
            type="password"
            InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size="sm" ml="2" />}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            variant="filled"
            type="password"
            InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size="sm" ml="2" />}
          />
          <Button colorScheme="blue" onPress={handleRegister} isLoading={isLoading}>
            Register
          </Button>
          <Text
            mt="4"
            textAlign="center"
            color="blue.500"
            onPress={() => navigation.navigate("AdminLogin")}
          >
            Already have an account? Login
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default AdminRegister;
