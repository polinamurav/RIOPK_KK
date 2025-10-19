import {Injectable} from '@angular/core';
import {CredentialsService} from "@app/services/authentication";
import {Client, IFrame, IMessage, StompSubscription} from '@stomp/stompjs';
import {IStompSocket} from '@stomp/stompjs/src/types';
import {of, Subject} from "rxjs";
import {environment} from "@env/environment";
import SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  private _onConnectEvent$ = new Subject<any>();


  //  https://tst-rkk-pos.vtbank.am/
  private serverUrl: string = environment.ws;
  private _stompClient: Client;
  private _isConnected: boolean;
  private _topics$ = new Map<string, StompSubscription>();

  constructor(
    // private router: Router,
    private credentialsService: CredentialsService,
    // private notificationService: NotificationService,
  ) {
  }

  get onConnectEvent$() {
    return this._onConnectEvent$.asObservable();
  }

  get stompClient() {
    return this._stompClient;
  }

  get isConnected(): boolean {
    return this._isConnected && !!this.stompClient;
  }

  get topics$() {
    return this._topics$;
  }


  connect() {
    if (this.credentialsService.isAuthenticated && !this.stompClient) {
      this._topics$ = new Map<string, StompSubscription>();
      // const clientId = this.credentialsService.credentials.clientId;
      // const ibId = this.credentialsService.credentials.ibId;
      // this.serverUrl = `${environment.ws}?CL_TP=C&CL_ID=${clientId}&IB_ID=${ibId}`;

      this._stompClient = new Client({
        debug: (str: any) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 2000,
        heartbeatOutgoing: 2000,
        connectionTimeout: 30000,
        webSocketFactory: () => new SockJS(this.serverUrl) as IStompSocket,
      });

      // @ts-ignore
      this.stompClient.activate();
      this.initSocket(this.stompClient);
    }
  }


  disconnectWS() {
    this.killSubscriptions();
    this.stompClient.deactivate().then(() => {
      // @ts-ignore
      this._stompClient = null;
    });
  }

  logOut() {
    if (!this.stompClient) {
      return;
    }
    this.disconnectWS();
  }

  send(path: string, message: string) {
    this.stompClient.publish({destination: `${path}`, body: message});
  }

  subscribeOnStream = (topicUrl: string, callBack: (response: any) => void): StompSubscription | null => {
    if(this.stompClient) {
      const topic = this.stompClient.subscribe(
        topicUrl,
        (messageOutput: any) => {
          if (messageOutput.body) {
            const response = JSON.parse(messageOutput.body);
            callBack(response)
          }
        });
      this.topics$.set(topicUrl, topic);

      return topic;
    }
    return null;
  }

  unsubscribeOnStream = (topicUrl: string): void => {
    if (this.topics$.has(topicUrl)) {
      const topic = this.topics$.get(topicUrl);
      if(topic) {
        topic.unsubscribe();
      }

      this.topics$.delete(topicUrl);
    }
  }


  private initSocket(stomp: Client) {
    stomp.onConnect = (frame: IFrame) => {
      this._onConnectEvent$.next('Connected: ' + frame);
      this._isConnected = true;


      console.log('Connected: ' + frame);
    };

    stomp.onDisconnect = () => {
      this._isConnected = false;
      console.log('WebSocket has been disconnected');
    };
  }

  private killSubscriptions() {
    this.topics$.forEach(topic => topic.unsubscribe());
  }
}
