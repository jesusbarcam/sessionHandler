import{ Injectable } from '@angular/core';
import{ SessionSettings } from './sessionSettings.model';



@Injectable()
export class SessionHandlerService {

  private _isActived:boolean;
  private _countdownNotification:boolean;
  private _redirect:boolean;
  private _maxMinutesOfSession:number;
  private _routeLocationWhenEndSession:string;
  private _routeParams:Array<any>;

  private sessionInitTime:any;

  private static DEFAULT_ROUTE_LOCATION_WHEN_END_SESSION:string = '';
  private static DEFAULT_IS_ACTIVED:boolean = true;
  private static DEFAULT_REDIRECT:boolean = true;
  private static DEFAULT_MAX_MINUTES_OF_SESSION:number = 1;//Minutos
  private static DEFAULT_COUNTDOWN_NOTIFICATION:boolean = true;


  constructor() {
    this._isActived = SessionHandlerService.DEFAULT_IS_ACTIVED;
    this._redirect = SessionHandlerService.DEFAULT_REDIRECT;
    this._routeLocationWhenEndSession = SessionHandlerService.DEFAULT_ROUTE_LOCATION_WHEN_END_SESSION;
    this._maxMinutesOfSession = SessionHandlerService.DEFAULT_MAX_MINUTES_OF_SESSION;
    this._countdownNotification = SessionHandlerService.DEFAULT_COUNTDOWN_NOTIFICATION;
    this._routeParams = null;
  }//constructor



  /**
   * @public
   * @method
   * @param settings
   * @description
   * Método encargado de configurar el servicio y modulo 
   * de control de sesión de la aplicación. 
   */
  public configure( settings:SessionSettings ) {

    if( settings ) {
      this._isActived = settings.autoInit || SessionHandlerService.DEFAULT_IS_ACTIVED;
      this._redirect = settings.redirect || SessionHandlerService.DEFAULT_REDIRECT;
      this._routeLocationWhenEndSession = settings.routeLocationWhenEndSession || SessionHandlerService.DEFAULT_ROUTE_LOCATION_WHEN_END_SESSION;
      this._maxMinutesOfSession = settings.maxMinutesOfSession || SessionHandlerService.DEFAULT_MAX_MINUTES_OF_SESSION;
      this._countdownNotification = settings.countdownNotification || SessionHandlerService.DEFAULT_COUNTDOWN_NOTIFICATION;
      this._routeParams = settings.routeParams || null;
    }//if
  
  }//configure

  
  

  /**
   * @public 
   * @method
   * @description
   * Método que recoge la fecha de inicio de la sesión
   */
  public startSession() {
    this.sessionInitTime = new Date();
  }//startSession



  /**
   * @public 
   * @method 
   * @description
   * Método encargado de dar por muerta la sesión de usuario
   */
  public killSession() {
    this.sessionInitTime = null;
  }//killSession





  public get isActived() {
    return this._isActived;
  }//isActived


  public set isActived(value:boolean) {
    this._isActived = value;
  }//isActived


  


  public get routeLocationWhenEndSession():string {
    return this._routeLocationWhenEndSession;
  }//routeLocationWhenEndSession


  public set routeLocationWhenEndSession(value:string) {
    this._routeLocationWhenEndSession = value;
  }//routeLocationWhenEndSession





  public get maxMinutesOfSession():number {
    return this._maxMinutesOfSession;
  }//maxDurationOfSession

  public set maxMinutesOfSession(value:number) {
    this._maxMinutesOfSession = value;
  }//maxMinutesOfSession






  public get routeParams():Array<any> {
    return this._routeParams;
  }//routeParams

  public set routeParams(value:Array<any>) {
    this._routeParams = value;
  }//routeParams



  public get redirect():boolean {
    return this._redirect;
  }//redirect

  public set redirect(value:boolean) {
    this._redirect = value;
  }//redirect


}//SessionHandlerService