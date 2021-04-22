import Game from './main/Game';

export default function Main( props: {className: string}) {
  return (
    <Game className={props.className} />
  );
}