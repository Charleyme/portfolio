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

interface ContactProps {
  onSubmit: (data: ContactFormData) => void;
}

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

const Contact = ({ onSubmit }: ContactProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });
  return (
    <Box minH="100vh" p={{base:"22px", sm:"45px", md:'45px', lg: 10, xl:20}} bg="white">
      <Reveal direction="up" stagger>
        <Heading textAlign={"center"} mb={10}>
          Contact Me
        </Heading>
      </Reveal>

      <Flex direction={{base: "column", lg:"row" ,xl:"row"}}>
        <Reveal direction="left" stagger>
          <Box mb={{base:50, lg:0}}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction={{base:"column", lg:"row"}}>
                <Box>
                  <FormLabel htmlFor="firstname">First name</FormLabel>
                  <Input
                    {...register("firstname")}
                    width={{base:"100%",md: "100%", lg:"130%", xl:"150%"}}
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
                <Box ml={{base:0, lg: 20, xl:28}}>
                  <FormLabel htmlFor="lastname  ">Last name</FormLabel>
                  <Input
                    width={{base:"100%", lg:"148%",xl:"156%"}}
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
              </Flex>
              <FormLabel htmlFor="email" mt={4}>
                Email address
              </FormLabel>
              <Input
                  width={{base:"100%", lg:"120%"}}
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
                  width={{base:"100%", lg:"120%"}}
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
              >
                SEND MESSAGE
              </Button>
            </form>
          </Box>
        </Reveal>
        <Reveal direction="right" stagger>
          <Box ml={{base:0, lg:40}}>
            <FormLabel>Contact info</FormLabel>
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
