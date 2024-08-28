import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperModule, SwiperPaginationInterface } from '../../theme/components/swiper/swiper.module';
import { Testimonial } from '../../common/interfaces/testimonial';
import { AppService } from '@services/app.service';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    SwiperModule,
    TranslateModule,
    MatButtonModule
  ],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  public testimonials: Testimonial[];
  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.testimonials = this.appService.getTestimonials();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      // breakpoints: {
      //   480: {
      //     slidesPerView: 1
      //   },
      //   740: {
      //     slidesPerView: 2,
      //   },
      //   960: {
      //     slidesPerView: 3,
      //   }
      // }
    }
  }

}
