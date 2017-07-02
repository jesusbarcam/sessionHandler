/**
 * @class 
 * @description
 */
export class SessionSettings {

  private _routeParams:Array<any>;
  private _routeLocationWhenEndSession:string;
  private _maxMinutesOfSession:number; 
  private _redirect:boolean;
  private _autoInit:boolean;
  private _countdownNotification:boolean;




  public get routeParams(){ return this._routeParams;}
  public get routeLocationWhenEndSession() { return this._routeLocationWhenEndSession; }
  public get maxMinutesOfSession() { return this._maxMinutesOfSession;}
  public get redirect() {return this._redirect;}
  public get autoInit() {return this._autoInit;}
  public get countdownNotification() { return this._countdownNotification;}


  public set routeParams(parameters:Array<any>){
    this._routeParams = parameters;
  }

  public set routeLocationWhenEndSession(routeLocation:string){
    this._routeLocationWhenEndSession = routeLocation;
  }

  public set maxMinutesOfSession(maxMinutes:number){
    this._maxMinutesOfSession = maxMinutes;
  }

  public set redirect(value:boolean){
    this._redirect = value;
  }

  public set autoInit(value:boolean){
    this._autoInit = value;
  }

  public set countdownNotification(value:boolean) {
    this._countdownNotification = value;
  }

}//SessionSettings