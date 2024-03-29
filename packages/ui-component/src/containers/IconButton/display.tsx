/* eslint-disable react/function-component-definition */
/*
 * 用于测试时显示组件
 */
import MdQueue from '@material-design-icons/svg/round/queue.svg';
import { IconButton } from '.';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css';

export default function Display() {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconButton tip="test" placement="left">
        <MdQueue />
      </IconButton>
    </div>
  );
}
