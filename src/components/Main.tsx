import { Fragment, useContext } from 'react'

import Game from './main/Game';
import Configuration from 'components/Configuration';

import { GameContext } from 'contexts/GameContext';

export default function Main( props: {className: string}) {
  const { configIsOpen } = useContext(GameContext);

  return (
    <Fragment>
      {configIsOpen && <Configuration />}
      <Game className={props.className} />
    </Fragment>
  );
}
