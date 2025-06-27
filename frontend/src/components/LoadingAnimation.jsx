import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LoadingAnimation = ({ playing = false }) => {
  const container = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    anim.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "https://lottie.host/8af0c826-1577-4049-8cbc-f1f7bd1e2be5/0ocb1B2Zli.json",
    });

    anim.current.goToAndStop(285, true);
    return () => anim.current?.destroy();
  }, []);

  useEffect(() => {
    if (playing) {
      anim.current?.play();
    } else {
      anim.current?.goToAndStop(285, true);
    }
  }, [playing]);

  return (
    <div
      ref={container}
      className="w-[50px] h-[80px] "
    />
  );
};

export default LoadingAnimation;