import { ChangeDetectionStrategy, Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SwiperConfigInterface, SwiperDirective, SwiperModule } from '../../../theme/components/swiper/swiper.module';
import { Property } from '@models/app.models';
import { Settings, SettingsService } from '@services/settings.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmbedVideoService } from '@services/embed-video.service';
import { DomHandlerService } from '@services/dom-handler.service';
import { emailValidator } from '../../../theme/utils/app-validators';
import { CompareOverviewComponent } from '@shared-components/compare-overview/compare-overview.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCardModule } from '@angular/material/card';
import { RatingComponent } from '@shared-components/rating/rating.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { PropertyItemComponent } from '@shared-components/property-item/property-item.component';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommentsComponent } from '@shared-components/comments/comments.component';
import { PropertiesCarouselComponent } from '@shared-components/properties-carousel/properties-carousel.component';
import { GetInTouchComponent } from '@shared-components/get-in-touch/get-in-touch.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Voos } from '@models/voos';
import { VoosService } from '@services/voos.service';
import { environment } from '../../../../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { LocalStorageUtils } from '../../../utils/localStorage';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CreateSession } from '@models/create_session';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-voo',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    MatSidenavModule,
    PipesModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgScrollbarModule,
    MatCardModule,
    RatingComponent,
    MatDatepickerModule,
    MatDividerModule,
    MatInputModule,
    PropertyItemComponent,
    CurrencyPipe,
    NgClass,
    GoogleMapsModule,
    MatExpansionModule,
    DatePipe,
    CommentsComponent,
    PropertiesCarouselComponent,
    GetInTouchComponent,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './voo.component.html',
  styleUrl: './voo.component.scss',
  providers: [EmbedVideoService, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VooComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  @ViewChildren(SwiperDirective) swipers: QueryList<SwiperDirective>;
  public dateForm: FormGroup;
  public sidenavOpen: boolean = true;
  public config: SwiperConfigInterface = {};
  public config2: SwiperConfigInterface = {};
  private sub: any;
  imagens: string = environment.imagensUrl;
  public voo: Voos;
  public createSession: CreateSession;
  public property: Property;
  public settings: Settings;
  public embedVideo: any;
  public relatedProperties: Property[];
  public featuredProperties: Property[];
  public agent: any;
  public mortgageForm: FormGroup;
  public monthlyPayment: any;
  public contactForm: FormGroup;
  public dataEscolhidaToogle: boolean = false;
  public dataEscolhida: Date;
  LocalStorage = new LocalStorageUtils();
  token!: string;
  userLogado: boolean = false;
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: true,
    fullscreenControl: true
  }
  lat: number = 0;
  lng: number = 0;
  private start = new Date(Date.now());
  readonly minDate = new Date(this.start.getFullYear(), 8, 20);
  readonly maxDate = new Date();

  constructor(public settingsService: SettingsService,
              public voosService: VoosService,
              public appService: AppService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              private embedService: EmbedVideoService,
              public snackBar: MatSnackBar,
              public fb: FormBuilder,
              private domHandlerService: DomHandlerService) {
              this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      // this.getPropertyById(params['id']);
      // this.getVooById(params['id']);
      this.getVooByUrl(params['url_voo']);
    });
    this.getRelatedProperties();
    this.getFeaturedProperties();
    this.getAgent(1);
    this.usuarioLogado();
    this.beginForm();
    if (this.domHandlerService.window?.innerWidth < 960) {
      this.sidenavOpen = false;
      if (this.sidenav) {
        this.sidenav.close();
      }
    };
    this.mortgageForm = this.fb.group({
      principalAmount: ['', Validators.required],
      downPayment: ['', Validators.required],
      interestRate: ['', Validators.required],
      period: ['', Validators.required]
    });
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  beginForm() {
    this.dateForm = this.fb.group({
      date: [null],
    });
  }

  valueChanged(event: any){
    this.dataEscolhidaToogle = true;
    this.dataEscolhida = event.target.value;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (this.domHandlerService.window?.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getPropertyById(id: number) {
    this.appService.getPropertyById(id).subscribe(data => {
      this.property = data;
      this.embedVideo = this.embedService.embed(this.property.videos[1].link);
      this.lat = +this.property.location.lat;
      this.lng = +this.property?.location.lng;
      if (this.domHandlerService.isBrowser) {
        this.config.observer = false;
        this.config2.observer = false;
        setTimeout(() => {
          this.config.observer = true;
          this.config2.observer = true;
          this.swipers.forEach(swiper => {
            if (swiper) {
              swiper.setIndex(0);
            }
          });
        });
      }  
    });
  }

  public getVooById(id: string) {
    this.voosService.obterVooPeloId(id).subscribe(data => {
      this.voo = data;
      console.log("VOO: "+this.voo);
      // this.embedVideo = this.embedService.embed(this.voo.videos[1].link);
      this.lat = +this.property.location.lat;
      this.lng = +this.property?.location.lng;
      if (this.domHandlerService.isBrowser) {
        this.config.observer = false;
        this.config2.observer = false;
        setTimeout(() => {
          this.config.observer = true;
          this.config2.observer = true;
          this.swipers.forEach(swiper => {
            if (swiper) {
              swiper.setIndex(0);
            }
          });
        });
      }  
    });
  }

  public getVooByUrl(url: string) {
    this.voosService.obterVooPelaUrl(url).subscribe(data => {
      this.voo = data;
      console.log("VOO: "+this.voo);
      // this.embedVideo = this.embedService.embed(this.voo.videos[1].link);
      this.lat = +this.property.location.lat;
      this.lng = +this.property?.location.lng;
      if (this.domHandlerService.isBrowser) {
        this.config.observer = false;
        this.config2.observer = false;
        setTimeout(() => {
          this.config.observer = true;
          this.config2.observer = true;
          this.swipers.forEach(swiper => {
            if (swiper) {
              swiper.setIndex(0);
            }
          });
        });
      }  
    });
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    };

    this.config2 = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: false,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        200: {
          slidesPerView: 2
        },
        480: {
          slidesPerView: 3
        },
        600: {
          slidesPerView: 4
        }
      }
    }

  }

  public onOpenedChange() {
    this.swipers.forEach(swiper => {
      if (swiper) {
        swiper.update();
      }
    });
  }

  public selectImage(index: number) {
    this.swipers.forEach(swiper => {
      if (swiper['elementRef'].nativeElement.id == 'main-carousel') {
        swiper.setIndex(index);
      }
    });
  }

  public abrirCheckout(): void {
    let obj = new CreateSession();
    obj.VooIdToReturn = this.activatedRoute.snapshot.params["id"];
    obj.DataEscolhida = this.dataEscolhida;
    
    // teste
    //obj.DataEscolhida = new Date(Date.UTC(this.dataEscolhida.getFullYear(), this.dataEscolhida.getMonth(), this.dataEscolhida.getDate()));

    // verifica se o usuario está logado
    if(this.userLogado){
      this.voosService.testeCheckout(obj).subscribe(
        success => { 
          console.log("URL: " + success);
          window.open(success, "_self");
        },
        error => {
          this.snackBar.open(error.error.errors[0], 'x', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  usuarioLogado() {
    this.token = this.LocalStorage.obterTokenUsuarioSession();
    
    if(this.token != null){
      this.userLogado = true;
    } else this.userLogado = false;
  }

  public onIndexChange(index: number) {
    this.swipers.forEach(swiper => {
      let elem = swiper['elementRef'].nativeElement;
      if (elem.id == 'small-carousel') {
        swiper.setIndex(index);
        for (let i = 0; i < elem.children[0].children.length; i++) {
          const element = elem.children[0].children[i];
          if (element.classList.contains('thumb-' + index)) {
            element.classList.add('active-thumb');
          }
          else {
            element.classList.remove('active-thumb');
          }
        }
      }
    });
  }

  public addToCompare() {
    this.appService.addToCompare(this.property, CompareOverviewComponent, (this.settings.rtl) ? 'rtl' : 'ltr');
  }

  public onCompare() {
    return this.appService.Data.compareList.filter(item => item.id == this.property.id)[0];
  }

  public addToFavorites() {
    this.appService.addToFavorites(this.property, (this.settings.rtl) ? 'rtl' : 'ltr');
  }

  public onFavorites() {
    return this.appService.Data.favorites.filter(item => item.id == this.property.id)[0];
  }

  public getRelatedProperties() {
    this.appService.getRelatedProperties().subscribe(properties => {
      this.relatedProperties = properties;
    })
  }

  public getFeaturedProperties() {
    this.appService.getFeaturedProperties().subscribe(properties => {
      this.featuredProperties = properties.slice(0, 3);
    })
  }

  public getAgent(agentId: number = 1) {
    var ids = [1, 2, 3, 4, 5]; //agent ids 
    agentId = ids[Math.floor(Math.random() * ids.length)]; //random agent id
    this.agent = this.appService.getAgents().filter(agent => agent.id == agentId)[0];
  }

  public onContactFormSubmit(values: Object) {
    if (this.contactForm.valid) {
      console.log(values);
    }
  }

  public onMortgageFormSubmit(values: Object) {
    if (this.mortgageForm.valid) {
      var principalAmount = values['principalAmount']
      var down = values['downPayment']
      var interest = values['interestRate']
      var term = values['period']
      this.monthlyPayment = this.calculateMortgage(principalAmount, down, interest / 100 / 12, term * 12).toFixed(2);
    }
  }
  public calculateMortgage(principalAmount: any, downPayment: any, interestRate: any, period: any) {
    return ((principalAmount - downPayment) * interestRate) / (1 - Math.pow(1 + interestRate, -period));
  }

}