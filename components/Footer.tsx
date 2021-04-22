export default function Footer( props: { style: 'main' | 'alt' } ) {
  return (
    <footer>
      {props.style === 'main' ? 
        <p>Enjoy the game? <a href="https://buymeacoffee.com">Buy me a coffee! &#x2615;</a></p> :
        <p>Created with &#x2665; and &#x2615; by <a href="https://github.com/heyset">Matheus "Set" Inacio</a>, 2021.</p>
      }
    </footer>
  );
}
