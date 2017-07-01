import{ Directive,HostListener,EventEmitter,Output,Input,OnInit,OnDestroy  } from '@angular/core';
import{ Router,NavigationExtras } from '@angular/router';

import{ SessionHandlerService } from './sessionHandler.service';
import{ SessionSettings } from './sessionSettings.model';



/**
 * 
 */
@Directive({
  selector:'[sessionHandlerControl]',
  providers:[ SessionHandlerService ]
})//Directive


/**
 * Directiva encargada de controlar apartir de que componente vamos a controlar la 
 * sesión de la aplicación, debe ser añadida en el componente contenedor apartir 
 * de donde empieze la parte privada de nuestra aplicación. 
 * 
 * Si nuestra aplicación es todo privado pondremos esta directiva apartir del 
 * componente que contenga todo el contenidos despues del login.
 * @class SessionHandlerDirective
 */
export class SessionHandlerDirective implements OnInit,OnDestroy {


  private timeout:any;
  private numTime:any;

  @Input('sessionSettings')
  private sessionSettings:SessionSettings;


  @Output('onEndsession')
  private onEndsession:EventEmitter<any>;
  


  /**
   * @constructor 
   * @param router 
   * @param sessionHandler
   * @description
   * Aquí añadiremos todas las configuraciones que nos 
   * inserten desde el exterior, cada una de ellas 
   * sobreescribirán las configuraciones por defecto 
   * de la directiva.
   */
  constructor(private router:Router,
              private sessionHandler:SessionHandlerService) {
      this.numTime = 0;
  }//Constructor



  /**
   * @public 
   * @method 
   * @description
   * Angular cycle of life method, when 
   * the component that has this directive
   * is initialize this method is called
   */
  ngOnInit() {
    
    this.onEndsession = new EventEmitter();
    this.sessionHandler.configure( this.sessionSettings );
    
    if( this.sessionHandler.isActived ) {
      this.startSessionTimeout();
    }//If
  
  }//onInit



  /**
   * @public 
   * @method 
   * @description
   * Angular cycle of life method, when 
   * this component destroy this method is called 
   */
  ngOnDestroy() {

  }//ngOnDestroy


  /**
   * @public
   * @method @event
   * @param event
   * @description
   * Método que detecta todos los movimientos que 
   * realize el usuario dentro del componente donde 
   * esta añadida esta directiva, es muy importante que 
   * este componente sea contenedor de toda la dimensión 
   * de pantalla para controlar correctamente la sesión del usuario. 
   */
  @HostListener('mousemove',[ '$event' ]) 
  onMousemove(event:MouseEvent) {

    //Eliminamos el timeout anterior iniciado si existe
    this.stopSessionTimeout();
    //Aqui preguntamos si esta activada la sesión 
    //en el servicio de manejador realizamos la 
    //contabilización desde que el usuario no esta operando
    //con la aplicación.
    this.startSessionTimeout();
    
  }//onmousemove




  @HostListener('mouseclick',[ '$event' ])
  onMouseClick(event:MouseEvent) {
    this.stopSessionTimeout();
    this.startSessionTimeout();
  }//onMouseClick




  private stopSessionTimeout() {
    
    if( this.timeout ) {
      this.sessionHandler.killSession();
      clearTimeout( this.timeout );
      this.timeout = 0;
    }//if

  }//stopSessionTimeout




  private startSessionTimeout() {

    if( !this.timeout && this.sessionHandler.isActived ){

      this.sessionHandler.startSession();
      this.timeout = setTimeout(() => { 
        
        this.whenEndSession();

    },(this.sessionHandler.maxMinutesOfSession * 60000));

    }//if
  }//startSessionTimeout




  /**
   * @private 
   * @method
   * @description
   * Cuando el final de sesión llega 
   * debemos sacar al usuario a la ruta definida 
   * en las opciones de configuración de la sesión
   */
  private whenEndSession() {
    //Lanzamos el evento al exterior para poder
    //detectar el final de la sessión
    this.onEndsession.emit();

    if( this.sessionHandler.redirect ) {
      //Redireccionamos la aplicación a la ruta 
      //que este definida en el objeto de configuración
      //con parametros si estos estan definidos
      let params:Array<any> = this.sessionHandler.routeParams;

     if( params ) {
        let navigationExtras:NavigationExtras = this.generateAllQueryParams( params ); 
        return this.router.navigate([ this.sessionHandler.routeLocationWhenEndSession ], navigationExtras);
      }//if

      //Redireccionamos directamente si la sesión no 
      //tiene definida parametros de ruta de redireccionamiento
      this.router.navigate([ this.sessionHandler.routeLocationWhenEndSession ]);

    }//if
  }//WhenEndSession






  /**
   * @private 
   * @method
   * @description
   * Método que genera todos aquellos parametros que 
   * esten definidos en las opciones de configuración de la sesión
   */
  private generateAllQueryParams(params:Array<any>):NavigationExtras {
  
    var navigationExtras:NavigationExtras = {queryParams:{}};
    params.forEach((param) => {
     
      for(let key in param) {
        //navigationExtras.queryParams[ "exception" ] = "unauthorized";
        navigationExtras.queryParams[ key ] = param[ key ];
      }//for
    });//forEach
    
    return navigationExtras;
  
  }//GenerateAllQueryParams




}//SessionHandlerDirective