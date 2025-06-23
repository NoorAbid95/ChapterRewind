import  { useEffect, useRef } from "react";
import lottie from "lottie-web";

const BowAnimation = () => {
  const container = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    anim.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://lottie.host/e6458185-0d6c-476c-af68-8ba1b99b8c75/xDDoiwLplM.json",
    });


    anim.current.goToAndStop(21, true);

    return () => anim.current.destroy();
  }, []);

  const handleMouseEnter = () => {
    anim.current.playSegments([21, 60], true); // draw
  };

  const handleMouseLeave = () => {
    anim.current.playSegments([21, 22], true); // idle
  };

  const handleClick = () => {
    anim.current.playSegments([61, 85], true); // fire
  };

  return (
    <div
      ref={container}
      className="w-[120px] cursor-pointer scale-x-[-1]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};

export default BowAnimation;
