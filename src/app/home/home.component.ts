import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  public ipAddress:String="";
  public isloggedin:boolean=false;

  //  browser
  browserName:any;
  browserVersion:any;


  /// web cam
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';



  constructor(private loginRegister:AuthService,public http:HttpClient)
  {
    console.log(localStorage.getItem('isLoggedIn'))
    if(localStorage.getItem('isLoggedIn')=='true')
    {
      this.isloggedin=true;
      console.log(localStorage.getItem('isLoggedin'))
    }
  }
  ngOnInit(): void {
    this.getIPAddress();
    // this.detectBrowserName();
    // this.detectBrowserVersion();
    this.browserName = this.detectBrowserName();
    this.browserVersion = this.detectBrowserVersion();


  }

  UserLoginRegister()
  {
    this.loginRegister.googleSignUpSignIn();

  }
  getIPAddress()
  {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress =res.ip;
      //alert(this.ipAddress);
    });
  }



  // broser detection
  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  detectBrowserVersion(){
      var userAgent = navigator.userAgent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if(/trident/i.test(matchTest[1])){
          tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
          return 'IE '+(tem[1] || '');
      }
      if(matchTest[1]=== 'Chrome'){
          tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest.join(' ');
  }


  // webcam

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

}
