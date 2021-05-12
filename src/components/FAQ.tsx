import { ReactNode, useRef, useState } from "react";

import styles from '../styles/modules/FAQ.module.css';

import DownArrow from '../../assets/svg/down-arrow.svg';

function FAQSection(props: {children: ReactNode, title: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const expansible = useRef<HTMLDivElement>(null);

  function handleToggleOpen() {
    if (!isOpen) {
      setIsOpen(true);
      expansible.current.style.maxHeight = `${expansible.current.scrollHeight + 12}px`;

      setTimeout(() => {
        expansible.current.scrollIntoView({behavior: 'smooth'});
      }, 200);
    } else {
      setIsOpen(false);
      expansible.current.style.maxHeight = null;
    }
  }

  return (
    <section className={styles.section}>
      <header onClick={handleToggleOpen}>
        <h1>{props.title}</h1>
        <DownArrow className={isOpen ? styles.flip : null} />
      </header>
      <div ref={expansible}>
        {props.children}
      </div>
    </section>
  )
}

export default function FAQ() {
  return (
    <article className={styles.faq}>
      <FAQSection title="What's ColorQuest?">
        <p>
          ColorQuest is a color picking game where your
          objective is to pick the right color as indicated
          by the code, be it in RGB or Hex.
          </p>

        <p>
          In the future, there will be another game mode where
          you have to type the code as indicated by the color,
          and also the HSL code option.
          </p>

        <p>
          The game was created with designers and artists in
          mind, but can be played by anyone :)
          </p>
      </FAQSection>
      <FAQSection title="What's New?">
        <p><em>05/14/2021 - The Game Launched</em></p>
        <p>So, that's new xD</p>
      </FAQSection>      
      <FAQSection title="What's Next?">
        <p>Next update will be some bugfixes.</p>
        <p>Soon, we will have more drawings for the other ranks.</p>
        <p>Looking ahead, sometime in the near future we're going to have the new mode. I promise.</p>
      </FAQSection>

    </article>
  );
}
