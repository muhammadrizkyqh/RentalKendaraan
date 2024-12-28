import React, { useState } from "react";
import { VStack, Input, Button, Box, Text, Center, Icon, useToast } from "native-base";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.show({ description: "Please fill in all fields", bgColor: "red.500" });
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.show({ description: "Login successful", bgColor: "green.500" });
      navigation.navigate("AdminDashboard");
    } catch (err) {
      toast.show({ description: "Invalid email or password", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center flex={1} bg="gray.100">
      <Box safeArea p="4" w="90%" maxW="400" py="8" bg="white" borderRadius="lg" shadow="2">
        <Text fontSize="2xl" fontWeight="bold" mb="4" textAlign="center" color="blue.700">
          Admin Login
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
          <Button colorScheme="blue" onPress={handleLogin} isLoading={isLoading}>
            Login
          </Button>
          <Text
            mt="4"
            textAlign="center"
            color="blue.500"
            onPress={() => navigation.navigate("AdminRegister")}
          >
            Don't have an account? Register
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default AdminLogin;
