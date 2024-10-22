import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verifyEmailLink?: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const VerifyEmail = ({ verifyEmailLink }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your Email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://${baseUrl}/static/favicon-32x32.png`}
            width="40"
            height="33"
            alt="Spacerr"
          />
          <Section>
            <Text style={text}>Hi from Spacerr Team,</Text>
            <Text style={text}>
              Someone recently requested to verify your email. If this was you, you can verify your
              email here:
            </Text>
            <Button style={button} href={verifyEmailLink}>
              Verify Email
            </Button>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email to anyone. See our
              Help Center for{" "}
            </Text>
            <Text style={text}>Happy voiage!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

VerifyEmail.PreviewProps = {
  verifyEmailLink: baseUrl,
} as VerifyEmailProps;

export default VerifyEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
