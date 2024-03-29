/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import Peer from 'skyway-js';
import { compressAsync, decompressAsync } from '../util/compress';
import { MessagePack } from '../util/message-pack';
import { setZeroTimeout } from '../util/zero-timeout';
import { ConnectionCallback } from './connection';
import { PeerContext } from './peer-context';
import { PeerSessionGrade } from './peer-session-state';
import { SkyWayDataConnection } from './skyway-data-connection';
import { CandidateType } from './webrtc-stats';
import type { Connection } from './connection';

interface DataContainer {
  data: Uint8Array;
  peers?: string[];
  ttl: number;
  isCompressed?: boolean;
}

export class SkyWayConnection implements Connection {
  get peerId(): string {
    return this.peerContext ? this.peerContext.peerId : '???';
  }

  private _peerIds: string[] = [];

  get peerIds(): string[] {
    return this._peerIds;
  }

  peerContext: PeerContext = PeerContext.parse('???');

  readonly peerContexts: PeerContext[] = [];

  readonly callback: ConnectionCallback = new ConnectionCallback();

  bandwidthUsage = 0;

  private key = '';

  private peer: Peer | null = null;

  private connections: SkyWayDataConnection[] = [];

  private listAllPeersCache: string[] = [];

  private httpRequestInterval: number = performance.now() + 500;

  private outboundQueue: Promise<any> = Promise.resolve();

  private inboundQueue: Promise<any> = Promise.resolve();

  private relayingPeerIds: Map<string, string[]> = new Map();

  private maybeUnavailablePeerIds: Set<string> = new Set();

  open(peerId: string): void;
  open(userId: string, roomId: string, roomName: string, password: string): void;
  open(...args: any[]) {
    console.log('open', args);
    if (args.length === 0) {
      this.peerContext = PeerContext.create(PeerContext.generateId());
    } else if (args.length === 1) {
      this.peerContext = PeerContext.create(args[0]);
    } else {
      this.peerContext = PeerContext.create(args[0], args[1], args[2], args[3]);
    }
    this.openPeer();
  }

  close() {
    if (this.peer) this.peer.destroy();
    this.disconnectAll();
    this.peer = null;
    this.peerContext = PeerContext.parse('???');
  }

  connect(peerId: string): boolean {
    if (!this.shouldConnect(peerId)) return false;
    if (!this.peer) return false;

    const conn: SkyWayDataConnection = new SkyWayDataConnection(
      this.peer.connect(peerId, {
        serialization: 'none',
        metadata: { sendFrom: this.peerId },
      })
    );

    this.openDataConnection(conn);
    return true;
  }

  private shouldConnect(peerId: string): boolean {
    if (!this.peerContext || !this.peer || !this.peerId) {
      console.log('connect() is Fail. IDが割り振られるまで待てや');
      return false;
    }

    if (this.peerId === peerId) {
      console.log(`connect() is Fail. ${peerId} is me.`);
      return false;
    }

    if (this.findDataConnection(peerId)) {
      console.log(`connect() is Fail. <${peerId}> is already connecting.`);
      return false;
    }

    if (peerId && peerId.length && peerId !== this.peerId) return true;
    return false;
  }

  disconnect(peerId: string): boolean {
    const conn = this.findDataConnection(peerId);
    if (!conn) return false;
    this.closeDataConnection(conn);
    return true;
  }

  disconnectAll() {
    console.log('<closeAllDataConnection()>');
    for (const conn of this.connections.concat()) {
      this.closeDataConnection(conn);
    }
  }

  send(data: any, sendTo?: string) {
    if (this.connections.length < 1) return;
    const encoded = MessagePack.encode(data);
    if (!encoded) return;

    const container: DataContainer = {
      data: encoded,
      ttl: 1,
    };

    const { byteLength } = container.data;
    this.bandwidthUsage += byteLength;
    this.outboundQueue = this.outboundQueue.then(
      () =>
        new Promise<void>((resolve, reject) => {
          setZeroTimeout(async () => {
            if (1 * 1024 < container.data.byteLength && Array.isArray(data) && data.length > 1) {
              const compressed = await compressAsync(container.data);
              if (compressed && compressed.byteLength < container.data.byteLength) {
                container.data = compressed;
                container.isCompressed = true;
              }
            }
            if (sendTo) {
              this.sendUnicast(container, sendTo);
            } else {
              this.sendBroadcast(container);
            }
            this.bandwidthUsage -= byteLength;
            return resolve();
          });
        })
    );
  }

  private sendUnicast(container: DataContainer, sendTo: string) {
    container.ttl = 0;
    const conn = this.findDataConnection(sendTo);
    if (conn && conn.open) conn.send(container);
  }

  private sendBroadcast(container: DataContainer) {
    for (const conn of this.connections) {
      if (conn.open) conn.send(container);
    }
  }

  setApiKey(key: string) {
    if (this.key !== key) console.log('Key Change');
    this.key = key;
  }

  listAllPeers(): Promise<string[]> {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-promise-executor-return
      if (!this.peer) return resolve([]);
      const now = performance.now();
      if (now < this.httpRequestInterval) {
        console.warn(`httpRequestInterval... ${this.httpRequestInterval - now}`);
        resolve(this.listAllPeersCache.concat());
        // eslint-disable-next-line consistent-return
        return;
      }
      this.httpRequestInterval = now + 6000;
      this.peer.listAllPeers((list) => {
        this.listAllPeersCache = list.concat();
        resolve(list);
      });
    });
  }

  private openPeer() {
    if (this.peer) {
      console.warn('It is already opened.');
      this.close();
    }
    if (!this.peerContext) return;
    const peer = new Peer(this.peerContext.peerId, { key: this.key }); // SkyWay
    peer.on('open', (id) => {
      console.log(`My peer ID is: ${id}`);
      if (!this.peerContext || this.peerContext.peerId !== id) {
        this.peerContext = PeerContext.parse(id);
      }
      this.peerContext.isOpen = true;
      console.log('My peer Context', this.peerContext);
      if (this.callback.onOpen) this.callback.onOpen(this.peerId);
    });

    peer.on('close', () => {
      console.log('Peer close');
      if (this.peerContext && this.peerContext.isOpen) {
        this.peerContext.isOpen = false;
        if (this.callback.onClose) this.callback.onClose(this.peerId);
      }
    });

    peer.on('connection', (conn) => {
      this.openDataConnection(new SkyWayDataConnection(conn));
    });

    peer.on('error', (err) => {
      console.error(`<${this.peerId}> ${err.type} => ${err.message}`);
      const errorMessage = `${this.getSkyWayErrorMessage(err.type)}\n\n${err.type}: ${err.message}`;
      switch (err.type) {
        case 'peer-unavailable': {
          const ret = /"(.+)"/.exec(err.message);
          if (ret) {
            const peerId = ret[1];
            this.disconnect(peerId);
          }
          break;
        }
        case 'disconnected':
        case 'socket-error':
        case 'unavailable-id':
        case 'authentication':
        case 'server-error':
          if (this.peerContext && this.peerContext.isOpen) {
            this.close();
            if (this.callback.onClose) this.callback.onClose(this.peerId);
          }
          break;
        default:
          break;
      }
      if (this.callback.onError) this.callback.onError(this.peerId, err.type, errorMessage, err);
    });
    this.peer = peer;
  }

  private openDataConnection(conn: SkyWayDataConnection) {
    if (this.addDataConnection(conn) === false) return;

    const index = this.connections.indexOf(conn);
    let context: PeerContext | null = null;
    if (index >= 0) context = this.peerContexts[index];

    this.maybeUnavailablePeerIds.add(conn.remoteId);
    conn.on('data', (data) => {
      this.onData(conn, data);
    });
    conn.on('open', () => {
      this.maybeUnavailablePeerIds.delete(conn.remoteId);
      if (context) context.isOpen = true;
      this.updatePeerList();
      if (this.callback.onConnect) this.callback.onConnect(conn.remoteId);
    });
    conn.on('close', () => {
      this.closeDataConnection(conn);
      if (this.callback.onDisconnect) this.callback.onDisconnect(conn.remoteId);
    });
    conn.on('error', () => {
      this.closeDataConnection(conn);
    });
    conn.on('stats', () => {
      if (!context) return;
      const deltaTime = performance.now() - conn.timestamp;
      const healthRate = deltaTime <= 10000 ? 1 : 5000 / (deltaTime - 10000 + 5000);
      const ping = healthRate < 1 ? deltaTime : conn.ping;
      const pingRate = 500 / (ping + 500);

      context.session.health = healthRate;
      context.session.ping = ping;
      context.session.speed = pingRate * healthRate;

      switch (conn.candidateType) {
        case CandidateType.HOST:
          context.session.grade = PeerSessionGrade.HIGH;
          break;
        case CandidateType.SRFLX:
        case CandidateType.PRFLX:
          context.session.grade = PeerSessionGrade.MIDDLE;
          break;
        case CandidateType.RELAY:
          context.session.grade = PeerSessionGrade.LOW;
          break;
        default:
          context.session.grade = PeerSessionGrade.UNSPECIFIED;
          break;
      }
      context.session.description = conn.candidateType;

      if (context.session.health < 0.2) {
        this.closeDataConnection(conn);
      }
    });
  }

  private closeDataConnection(conn: SkyWayDataConnection) {
    conn.close();
    const index = this.connections.indexOf(conn);
    if (index >= 0) {
      console.log(
        `${conn.remoteId} is えんいー` + `index:${index} length:${this.connections.length}`
      );
      this.connections.splice(index, 1);
      this.peerContexts.splice(index, 1);
    }
    this.relayingPeerIds.delete(conn.remoteId);
    this.relayingPeerIds.forEach((peerIds) => {
      const _index = peerIds.indexOf(conn.remoteId);
      if (_index >= 0) peerIds.splice(_index, 1);
    });
    console.log(
      `<close()> Peer:${conn.remoteId} length:${this.connections.length}:${this.peerContexts.length}`
    );
    this.updatePeerList();

    if (index >= 0 && this.callback.onDisconnect) this.callback.onDisconnect(conn.remoteId);
  }

  private addDataConnection(conn: SkyWayDataConnection): boolean {
    const existConn = this.findDataConnection(conn.remoteId);
    if (existConn !== null) {
      console.log(`add() is Fail. ${conn.remoteId} is already connecting.`);
      if (existConn !== conn) {
        if (existConn.metadata.sendFrom < conn.metadata.sendFrom) {
          this.closeDataConnection(conn);
        } else {
          this.closeDataConnection(existConn);
          this.addDataConnection(conn);
          return true;
        }
      }
      return false;
    }
    this.connections.push(conn);
    this.peerContexts.push(PeerContext.parse(conn.remoteId));
    console.log(`<add()> Peer:${conn.remoteId} length:${this.connections.length}`);
    return true;
  }

  private findDataConnection(peerId: string): SkyWayDataConnection | null {
    for (const conn of this.connections) {
      if (conn.remoteId === peerId) {
        return conn;
      }
    }
    return null;
  }

  private onData(conn: SkyWayDataConnection, container: DataContainer) {
    if (container.peers && container.peers.length > 0) this.onUpdatePeerList(conn, container);
    if (container.ttl > 0) this.onRelay(conn, container);
    if (this.callback.onData) {
      const { byteLength } = container.data;
      this.bandwidthUsage += byteLength;
      this.inboundQueue = this.inboundQueue.then(
        () =>
          new Promise<void>((resolve, reject) => {
            setZeroTimeout(async () => {
              const data = container.isCompressed
                ? await decompressAsync(container.data)
                : container.data;
              if (!data) return reject();
              this.callback.onData(conn.remoteId, MessagePack.decode(data));
              this.bandwidthUsage -= byteLength;
              return resolve();
            });
          })
      );
    }
  }

  private onRelay(conn: SkyWayDataConnection, container: DataContainer) {
    container.ttl--;

    const relayingPeerIds: string[] | undefined = this.relayingPeerIds.get(conn.remoteId);
    if (relayingPeerIds == null) return;

    for (const peerId of relayingPeerIds) {
      const _conn = this.findDataConnection(peerId);
      if (_conn && _conn.open) {
        console.log(`<${peerId}> 転送しなきゃ・・・`);
        _conn.send(container);
      }
    }
  }

  private onUpdatePeerList(conn: SkyWayDataConnection, container: DataContainer) {
    let relayingPeerIds: string[] = [];
    let unknownPeerIds: string[] = [];
    if (!container.peers) {
      console.error('peer is empty');
      return;
    }
    const diff = diffArray(this._peerIds, container.peers);
    relayingPeerIds = diff.diff1;
    unknownPeerIds = diff.diff2;
    this.relayingPeerIds.set(conn.remoteId, relayingPeerIds);
    container.peers = container.peers.concat(relayingPeerIds);

    if (unknownPeerIds.length) {
      for (const peerId of unknownPeerIds) {
        if (!this.maybeUnavailablePeerIds.has(peerId) && this.connect(peerId)) {
          console.log(`auto connect to unknown Peer <${peerId}>`);
        }
      }
    }
  }

  private updatePeerList(): string[] {
    const peerIds: string[] = [];
    for (const conn of this.connections) {
      if (conn.open) peerIds.push(conn.remoteId);
    }
    peerIds.push(this.peerId);
    peerIds.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    this._peerIds = peerIds;

    console.log('<update()>', peerIds);
    this.notifyPeerList();
    return peerIds;
  }

  private notifyPeerList() {
    if (this.connections.length < 1) return;
    const encoded = MessagePack.encode([]);
    if (!encoded) {
      console.error('encode failed');
      return;
    }
    const container: DataContainer = {
      data: encoded,
      peers: this._peerIds,
      ttl: 1,
    };
    this.sendBroadcast(container);
  }

  private getSkyWayErrorMessage(errType: string): string {
    switch (errType) {
      case 'room-error':
        return 'SkyWay Room API に問題が発生しました。';
      case 'permission':
        return '該当の SkyWay Room の利用が許可されてません。';
      case 'list-error':
        return 'SkyWay listAllPeers API が Disabled です。';
      case 'disconnected':
        return 'SkyWay のシグナリングサーバに接続されていません。';
      case 'socket-error':
        return 'SkyWay のシグナリングサーバとの通信で問題が発生しました。';
      case 'invalid-id':
        return 'Peer ID が不正です。';
      case 'unavailable-id':
        return 'その Peer ID すでに使用されています。';
      case 'peer-unavailable':
        return 'その Peer ID は利用できません。';
      case 'invalid-key':
        return 'SkyWay API キーが無効です。';
      case 'invalid-domain':
        return 'SkyWay API キーには現在のドメインは登録されていません。';
      case 'authentication':
        return '認証エラーです。';
      case 'server-error':
        return 'SkyWay のシグナリングサーバとの接続中に問題がありました。 少し待って、リトライしてください。';
      case 'sfu-client-not-supported':
        return 'このクライアントは SFU の使用をサポートしていません。最新の Google Chrome を使用してください';
      // case 'peer-unavailable': return 'Peer へデータを送信できませんでした。Peer ID が正しいことを確認してください。';
      case 'signaling-limited':
        return 'シグナリング回数が無償利用枠を超過しているため、全ての機能が利用できません。（SkyWay Community Edition のみ）';
      case 'sfu-limited':
        return 'SFU サーバの利用量が無償利用枠を超過しているため、SFU の機能が利用できません。（SkyWay Community Edition のみ）';
      case 'turn-limited':
        return 'TURN サーバの利用量が無償利用枠を超過しているため、TURN の機能が利用できません。（SkyWay Community Edition のみ）\nこの状態では、一部のユーザの接続に問題が発生する可能性があります。';
      // case 'peer-unavailable': return 'そのPeer IDは利用できません。';
      default:
        return 'SkyWayに関する不明なエラーが発生しました。';
    }
  }
}

function diffArray<T>(array1: T[], array2: T[]): { diff1: T[]; diff2: T[] } {
  const diff1: T[] = [];
  const diff2: T[] = [];

  let includesInArray1 = false;
  let includesInArray2 = false;

  for (const item of array1.concat(array2)) {
    includesInArray1 = array1.includes(item);
    includesInArray2 = array2.includes(item);
    if (includesInArray1 && !includesInArray2) {
      diff1.push(item);
    } else if (!includesInArray1 && includesInArray2) {
      diff2.push(item);
    }
  }
  return { diff1, diff2 };
}
