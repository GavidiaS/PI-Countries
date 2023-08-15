import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function ButtonScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <button className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={handleScrollToTop}><FontAwesomeIcon icon={faChevronUp} /></button>
  );
}