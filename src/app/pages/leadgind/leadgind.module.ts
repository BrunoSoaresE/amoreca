import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LeadgindRoutingModule } from "./leadgind-routing.module";
import { LeadgindComponent } from "./leadgind.component";
import { FaqModule } from "../../components/leadgind-page/faq/faq.module";
import { FeaturesModule } from "../../components/leadgind-page/features/features.module";
import { FeedbackModule } from "../../components/leadgind-page/feedback/feedback.module";
import { FinalCallModule } from "../../components/leadgind-page/final-call/final-call.module";
import { FooterModule } from "../../components/leadgind-page/footer/footer.module";
import { HeroModule } from "../../components/leadgind-page/hero/hero.module";
import { MetricsModule } from "../../components/leadgind-page/metrics/metrics.module";
import { NavbarModule } from "../../components/leadgind-page/navbar/navbar.module";
import { PlansModule } from "../../components/leadgind-page/plans/plans.module";
import { ProvaModule } from "../../components/leadgind-page/prova/prova.module";



@NgModule({
  imports: [
    CommonModule
    , LeadgindRoutingModule
    , FaqModule
    , FeaturesModule
    , FeedbackModule
    , FinalCallModule
    , FooterModule
    , HeroModule
    , MetricsModule
    , NavbarModule
    , PlansModule
    , ProvaModule


  ],
  declarations: [
    LeadgindComponent
  ],
  exports: [
    LeadgindComponent
  ]
})
export class LeadgindModule {
}

