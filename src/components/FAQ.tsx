import { ReactNode, useRef, useState } from "react";

import styles from '../styles/modules/FAQ.module.css';

import DownArrow from '../../assets/svg/down-arrow.svg';

function FAQSection(props: {children: ReactNode, title: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const expansible = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  function handleToggleOpen() {
    if (!isOpen) {
      setIsOpen(true);
      expansible.current.style.maxHeight = `${expansible.current.scrollHeight + 12}px`;

      setTimeout(() => {
        header.current.scrollIntoView({behavior: 'smooth'});
      }, 200);
    } else {
      setIsOpen(false);
      expansible.current.style.maxHeight = null;
    }
  }

  return (
    <section className={styles.section}>
      <header ref={header} onClick={handleToggleOpen}>
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
    <article id="FAQ" className={styles.faq}>
      <FAQSection title="What's ColorQuest?">
        <p>ColorQuest is a color picking game where your objective is to pick the right color as indicated by the code, be it in RGB or Hex.</p>
        <p>In the future, there will be another game mode where you have to type the code as indicated by the color, and also the HSL code option.</p>
        <p>The game was created with designers and artists in mind, but can be played by anyone :)</p>
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
      <FAQSection title="RGB? Hex? wut?">
        <p>Those are methods of writing colors.</p>
        <p>RGB means (Red, Green, Blue) and goes from 0 to 255.</p>
        <p>Hex means Hexadecimal and is basically the same thing, but it converts each piece to a hexadecimal number, so it’s smaller for computers to read.</p>
        <p>You can read more about the differences between them (and more) <a target="_blank" href="https://negliadesign.com/ask-a-designer/whats-the-difference-between-pms-cmyk-rgb-and-hex/">here</a>.</p>
      </FAQSection>
      <FAQSection title="What are those difficulties?">
        <p>The wrong answers can be off on any 1, 2 or 3 of the three primary colors. The difficulty dictates by how many units they are off.</p>
        <p>On Easy, that’s 90.</p>
        <p>On Medium, 50.</p>
        <p>On Hard, 25.</p>
        <p>And on Insane, by 10 only.</p>
      </FAQSection>
      <FAQSection title="Why, though?">
        <p>Mostly, for fun.</p>
        <p>But if you do art or design, you can definitely find it useful being able to eyeball colors, especially on real life where you usually don’t have an eyedropper tool laying around. ;)</p>
        <p>Just like musicians can train their ears to recognize notes, you too can train your eyes to recognize colors.</p>
      </FAQSection>
      <FAQSection title="How do I...">
        <p><em>Save my progress?</em> It should be automatic. If it isn't, please tell me. A note: it is <em>saved on your browser</em> only. So, for now, you cannot share progress between devices. Soon&trade; you will be able to log in.</p>
        <p><em>Change the difficulty?</em> Tap the cogwheel icon.</p>
        <p><em>Change the code mode?</em> See above</p>
        <p><em>Get a streak higher than 5?</em> You can’t. Five is the limit to avoid the frustration of losing a high streak.</p>
        <p><em>Get better at this?</em> I would say practice, but I’m not an artist. I love your interest, though ❤</p>
      </FAQSection>
      <FAQSection title="Can I hack ColorQuest?">
        <p>You definitely can, especially since <a target="_blank" href="https://github.com/heyset/colorquest">it’s opensource.</a></p>
        <p>For now, the repository is kind of a mess, since I'm still working on documentation and stuff, but feel free to have a look around, contribute if you wanna and spread the love.</p>
        <p>If you do find yourself using a major part of the code, I’d love a reference.</p>
      </FAQSection>
      <FAQSection title="Who are you?">
        <p>My name is Matheus Inacio, though online I usually go by Set.</p>
        <p>I’m a brazilian developer, unsure if the word “young” fits me anymore, and I’m currently unemployed.</p>
        <p>I love tabletop RPG, games, coffee, pizza, pets, long walks on the beach, and all the clichés, although the latter is a rare gem for me.</p>
      </FAQSection>
      <FAQSection title="Can I contact you?">
        <p>Sure thing! You can find me on <a target="_blank" href="https://www.linkedin.com/in/inaciomatheusdev/">LinkedIn</a> or <a target="_blank" href="https://www.instagram.com/inaciomatheus_/">Instagram.</a></p>
        <p>If you have any question, suggestion, complaint, compliment or other concern regarding ColorQuest specifically, you can email me at contact@colorquest.me.</p>
      </FAQSection>
    </article>
  );
}
