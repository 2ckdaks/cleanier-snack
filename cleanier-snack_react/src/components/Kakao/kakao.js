import React, { useEffect, useRef, useState } from "react";

function Kakao() {
  const chatButtonRef = useRef();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("31c6141720a0187b318463386143352a"); // 발급받은 REST API 키
    }
    setIsButtonVisible(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isButtonVisible) {
      window.Kakao.Channel.createChatButton({
        container: chatButtonRef.current,
        channelPublicId: "_xoqxdgxj",
        title: "consult",
        size: "large",
        color: "yellow",
        shape: "pc",
        supportMultipleDensities: true,
      });
    }
  }, [isButtonVisible]);

  const buttonStyle = {
    position: "fixed",
    bottom: 100,
    right: windowWidth <= 767 ? 10 : 50,
    zIndex: 9999,
  };

  return (
    <div style={buttonStyle}>
      {isButtonVisible && (
        <div ref={chatButtonRef} id="kakao-talk-channel-chat-button"></div>
      )}
    </div>
  );
}

export { Kakao };
