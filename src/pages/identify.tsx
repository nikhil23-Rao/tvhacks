import Message from "@/components/Message";
import { Navigation } from "@/components/Navigation";
import { Primary } from "@/components/Primary";
import { colors } from "@/config/colors";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { callAPI } from "@/callapi";

const Chat = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") as any);
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      <div
        style={{
          height: "100%",
          backgroundColor: theme === "dark" ? "#1A212D" : "",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              color: colors.primary,
              top: 50,
              position: "relative",
              fontSize: "3vw",
            }}
          >
            Capture An Image
          </h1>
          <p
            style={{
              maxWidth: 500,
              textAlign: "center",
              marginTop: 40,
              color: "gray",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            illum accusamus voluptas earum, ullam similique quisquam quos vitae
            consectetur tempore dicta, non libero perferendis, labore aliquam
            minima veritatis tenetur ducimus!
          </p>
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: -160,
          }}
        >
          <Webcam
            audio={false}
            height={800}
            screenshotFormat="image/jpeg"
            width={800}
            videoConstraints={videoConstraints}
            mirrored
          >
            {({ getScreenshot }) => (
              <Primary
                onClick={() => {
                  const imageSrc = getScreenshot();
                  console.log(imageSrc);
                  setImage(imageSrc);
                  callAPI(imageSrc);
                  onOpen();
                }}
                style={{
                  width: 68,
                  top: -160,
                  cursor: "pointer",
                }}
                title=""
                width={150}
                icon={
                  <i
                    className="fa fa-camera fa-2x"
                    style={{ marginRight: 10 }}
                  />
                }
              />
            )}
          </Webcam>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setStep(step === 0 ? 1 : 0);
              onClose();
            }}
            size={"full"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton
                style={{ border: "none", boxShadow: "none" }}
                onClick={onClose}
              />
              <ModalBody>
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={image}
                    style={{
                      borderRadius: 20,
                      width: 500,
                      height: 400,
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <h1>
                    Objects Detected: {step === 0 ? "Soda Can" : "Water Bottle"}
                  </h1>
                  <h1 style={{ color: colors.primary }}>
                    This item is Recyclable
                  </h1>
                  <h1 style={{ color: colors.primary }}>
                    Material: {step === 0 ? "Metal" : "Plastic"}
                  </h1>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Chat;
