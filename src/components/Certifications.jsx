import { useRef } from "react";
import GradualBlur from './GradualBlur';


export default function Certifications() {
  const ref = useRef(null)

  return (
    <section
      ref={ref}
      id="certifications"
      className=" text-center bg-slate-950 f"
    >
      <h2 className="text-4xl text-white mb-8 z-10 relative">Certifications</h2>
      <section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <        div style={{ height: '100%',overflowY: 'auto',padding: '6rem 30rem' }}>
        <img src="public/Screenshot 2026-03-01 164744.png" alt="" />
         </div>

      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
       />
     </section>
     <section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <        div style={{ height: '100%',overflowY: 'auto',padding: '6rem 30rem' }}>
        <img src="public/Screenshot 2026-03-01 164822.png" alt="" />
         </div>

      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
       />
     </section>
     <section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <        div style={{ height: '100%',overflowY: 'auto',padding: '6rem 30rem' }}>
        <img src="public/Screenshot 2026-03-01 164843.png" alt="" />
         </div>

      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential
        opacity={1}
       />
     </section>
    </section>
  );
}