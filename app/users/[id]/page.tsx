import prisma from "@/prisma/client";
import * as Form from "@radix-ui/react-form";
import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Text,
  TextField,
  Checkbox,
  Link,
} from "@radix-ui/themes";

const page = async ({ params }: { params: { id: string } }) => {
  const getUser = await prisma.user.findUnique({ where: { id: params.id } });

  return (
    <Container size="2" pt="9">
      <Card>
        <Form.Root className="flex justify-center">
          <Grid gap="2" p="9">
            <Form.Field name="name" className="grid mb-2 w-72">
              <Flex align="baseline" justify="between">
                <Form.Label className="text-xs">Full name</Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-red-500"
                >
                  Please enter your name
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <TextField.Root type="text" value={getUser?.name!} required />
              </Form.Control>
            </Form.Field>
            <Form.Field name="email" className="grid mb-2 w-72">
              <Flex align="baseline" justify="between">
                <Form.Label className="text-xs">Email</Form.Label>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-red-500"
                >
                  Please enter your email
                </Form.Message>
                <Form.Message
                  match="typeMismatch"
                  className="text-xs text-red-500"
                >
                  Please provide a valid email
                </Form.Message>
              </Flex>
              <Form.Control asChild>
                <TextField.Root type="email" value={getUser?.email!} required />
              </Form.Control>
            </Form.Field>
            <Text as="label" size="2">
              <Flex gap="2">
                <Checkbox checked={getUser?.accountVerified} />
                Put Check to verify this user
              </Flex>
            </Text>
            <Text as="label" size="2">
              <Link href="">Click here.</Link> To Change user password
            </Text>
            <Flex justify="center" pt="3" gap="2">
              <Form.Submit asChild>
                <Button>Update</Button>
              </Form.Submit>
            </Flex>
          </Grid>
        </Form.Root>
      </Card>
    </Container>
  );
};

export default page;
