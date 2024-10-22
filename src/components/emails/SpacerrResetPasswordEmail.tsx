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

interface SpacerrResetPasswordEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const SpacerrResetPasswordEmail = ({
  userFirstname,
  resetPasswordLink,
}: SpacerrResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Spacerr reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://${baseUrl}/static/favicon-32x32.png`}
            width="40"
            height="33"
            alt="Spacerr"
          />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Dropbox account. If this was
              you, you can set a new password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t request this, just
              ignore and delete this message.
            </Text>
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

SpacerrResetPasswordEmail.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as SpacerrResetPasswordEmailProps;

export default SpacerrResetPasswordEmail;

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
