// src/pages/Contact.tsx
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
  Button,
  Flex,
  FormLabel,
  List,
  ListItem,
  Link,
  useToast,
} from "@chakra-ui/react";
import "./Contact.css";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";
import Reveal from "./Reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios"


const schema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof schema>;

const Contact = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit= async (data: ContactFormData) =>{
    try{
      await axios.post("https://portfoliobackend-8c3x.onrender.com/api/mail/sendmail", data);
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
      }catch(error){
      toast({
        title: "Error",
        description: "There was an error sending your message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Fetch Error:", error);
    }
  }
  return (
    <Box minH="100vh" p={{base:4, sm:"40px", md:'40px', lg: 7, xl:16}} bg="white">
      <Reveal direction="up">
        <Heading textAlign={"center"} mb={10}>
          Contact Me
        </Heading>
      </Reveal>

      <Flex direction={{base: "column", lg:"row" ,xl:"row"}} >
        <Reveal direction="left">
          <Box mb={{base:50, lg:0}}  p={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
            
                <Box>
                  <FormLabel htmlFor="firstname">First name</FormLabel>
                  <Input
                    {...register("firstname")}
                    width={{base:"100%",md: "100%", lg:"120%" ,xl:"97%"}}
                    id="firstname"
                    name="firstname"
                    type="text"
                    focusBorderColor="green.500"
                  />
                  {errors.firstname && (
                    <Text color="red" fontSize="sm">
                      {errors.firstname.message}
                    </Text>
                  )}
                </Box>
                <Box>
                  <FormLabel htmlFor="lastname  ">Last name</FormLabel>
                  <Input
                    width={{base:"100%", lg:"120%",xl:"97%"}}
                    {...register("lastname")}
                    id="lastname"
                    name="lastname"
                    type="text"
                    focusBorderColor="green.500"
                  />
                  {errors.lastname && (
                    <Text color="red" fontSize="sm">
                      {errors.lastname.message}
                    </Text>
                  )}
                </Box>
            
              <FormLabel htmlFor="email" mt={4}>
                Email address
              </FormLabel>
              <Input
                  width={{base:"100%", lg:"120%", xl:"97%"}}
                {...register("email")}
                id="email"
                name="email"
                type="email"
                focusBorderColor="green.500"
              />
              {errors.email && (
                <Text color="red" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
              <FormLabel htmlFor="message" mt={4}>
                Message
              </FormLabel>
              <Textarea
                  width={{base:"100%", lg:"120%", xl:"97%"}}
                {...register("message")}
                id="message"
                name="message"
                focusBorderColor="green.500"
              />
              {errors.message && (
                <Text color="red" fontSize="sm">
                  {errors.message.message}
                </Text>
              )}
              <Button
                fontSize={13}
                p={6}
                borderRadius={25}
                mt={4}
                colorScheme="green"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Sending..."
              >
                SEND MESSAGE
              </Button>
            </form>
          </Box>
        </Reveal>
        <Reveal direction="right" >
          <Box ml={{base:0, lg:40}} p={2}>
            <FormLabel fontSize={20} mb={10}>Contact info</FormLabel>
            <List>
              <ListItem mb={5}>
                <Flex alignItems="center" gap={2}>
                  <FaLocationDot />
                  <span>10 Allen Nwachukwu Street, Abia State</span>
                </Flex>
              </ListItem>
              <ListItem mb={5}>
                <Flex alignItems="center" gap={2}>
                  <FaPhone color="green" />
                  <Link color={"green"} href="tel:+2348160459227">
                    +234 8160459227
                  </Link>
                </Flex>
              </ListItem>
              <ListItem mb={5}>
                <Flex alignItems="center" gap={2}>
                  <FaEnvelope color="green" />
                  <Link
                    color={"green"}
                    href="mailto:charlesjiwueze826@gmail.com"
                  >
                    charlesjiwueze826@gmail.com
                  </Link>
                </Flex>
              </ListItem>
              <ListItem mb={5}>
                <Flex alignItems="center" gap={2}>
                  <FaWhatsapp color="green" />
                  <Link color={"green"} href="https://wa.me/2348160459227">
                    Chat on WhatsApp
                  </Link>
                </Flex>
              </ListItem>
            </List>
          </Box>
        </Reveal>
      </Flex>
    </Box>
  );
};

export default Contact;
