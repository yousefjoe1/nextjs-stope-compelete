'use client';
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
function Aos() {
 useEffect(() => {
     AOS.init({
          duration: 800,
          once: false,
        })
  }, [])
  return '';
}
export default Aos;
