import { useRef, useState } from 'react';
import { Room } from '@/domain/udonarium/types';
import { useAppDispatch } from '@/store/hooks';

const centerStyle = { maxWidth: '500px', margin: '0 auto' } as const;
const rowStyle = {
  roomName: {
    display: 'inline-block',
    width: '150px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    verticalAlign: 'middle', // overflow: hiddenだとvertical-align:baseline が要素ボックスの垂直位置を参照してしまうためずれる
  },
  hasPassword: { display: 'inline-block', width: '30px' },
  numberOfEntrants: { display: 'inline-block', width: '30px' },
  connect: { display: 'inline-block', width: '120px', verticalAlign: 'baseline' },
} as const;

const RoomList: React.FC<{
  rooms: Room[];
  connectHandler: (con: { alias: string; pass: string }) => void;
}> = ({ rooms, connectHandler }) => {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedRoom, setRoom] = useState<null | Room>(null);
  const [pass, setPass] = useState('');
  const openDialog = (room: Room) => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }
    setRoom(room);
    dialogElement.showModal();
  };
  if (!rooms) return <div />;
  if (rooms.length === 0) {
    return <EmptyRooms />;
  }

  return (
    <div style={{ paddingLeft: '1rem' }}>
      <dialog ref={dialogRef}>
        <p style={{ marginBottom: '1rem' }}>{selectedRoom?.name} に 入室しますか？</p>
        {selectedRoom?.hasPassword ? (
          <label htmlFor="room-pass">
            パスワード:
            <input id="room-pass" type="password" onChange={(e) => setPass(e.target.value)} />
          </label>
        ) : (
          <div />
        )}
        <form method="dialog" style={{ marginTop: '2rem' }}>
          <button
            type="submit"
            className="button is-primary"
            disabled={selectedRoom?.hasPassword && pass.length === 0}
            onClick={() => {
              if (!selectedRoom) return;
              connectHandler({ alias: selectedRoom.alias, pass });
            }}
          >
            入室
          </button>

          <button type="submit" className="button" style={{ marginLeft: '2rem' }}>
            キャンセル
          </button>
        </form>
      </dialog>
      <ul style={{ listStyle: 'none' }}>
        <li style={{ textAlign: 'left', fontWeight: 'bold' }}>
          <span style={rowStyle.roomName}>部屋名</span>
          <span style={rowStyle.hasPassword}>鍵</span>
          <span style={rowStyle.numberOfEntrants}>👥</span>
          <span style={rowStyle.connect}>ルーム</span>
        </li>
        {rooms.map((room) => (
          <li key={room.alias} style={{ textAlign: 'left', lineHeight: '2' }}>
            <span style={rowStyle.roomName}>{room.name}</span>
            <span style={rowStyle.hasPassword}>{`${room.hasPassword ? '🔒️' : ''}`}</span>
            <span style={rowStyle.numberOfEntrants}>{room.numberOfEntrants}</span>
            <span style={rowStyle.connect}>
              <button type="button" onClick={() => openDialog(room)}>
                入室
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
const EmptyRooms: React.FC = () => (
  <div style={{ ...centerStyle }}>
    <div style={{ margin: '0 auto' }}>
      入室可能な部屋はありません。
      {/* <input type="button" onClick={() => window.location.reload()} value="再読み込み" /> */}
    </div>
  </div>
);

export default RoomList;
