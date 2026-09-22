import type { LandingContent } from "./types";
import { cottonLanding, jacquardLanding, neylonLanding, reflectiveLanding, satinLanding, silikonLanding } from "./vshivnye";
import { kartonLanding, plasticLanding, tracingLanding } from "./navesnye";
import { boxLanding, kraftLanding, ldpeLanding, paperLanding, zipLanding } from "./upakovka";
import { elasticLanding, fastenersLanding, jibbitzLanding, pullLanding } from "./furnitura";
import { dtfLanding, embroideryLanding, flextranLanding, rubberLanding } from "./nanesenie";
import { merchLanding, stickerpackLanding } from "./merch";
import {
  bannerLanding,
  bookletLanding,
  businesscardLanding,
  flagsLanding,
  leafletLanding,
  magazineLanding,
  printingLanding,
  stickerLanding,
} from "./poligrafiya";
import { corporateLanding, lendingLanding, shopLanding, sitesHubLanding } from "./sayty";

export type { LandingContent } from "./types";

export const landings: Record<string, LandingContent> = {
  jacquard: jacquardLanding,
  satin: satinLanding,
  silikon: silikonLanding,
  cotton: cottonLanding,
  neylon: neylonLanding,
  reflective: reflectiveLanding,
  "birki-karton": kartonLanding,
  tracing: tracingLanding,
  plastic: plasticLanding,
  "zip-pack": zipLanding,
  kraft: kraftLanding,
  paper: paperLanding,
  ldpebag: ldpeLanding,
  cardboardbox: boxLanding,
  fasteners: fastenersLanding,
  elastic: elasticLanding,
  pull: pullLanding,
  jibbitz: jibbitzLanding,
  rubber: rubberLanding,
  flextran: flextranLanding,
  directtofilm: dtfLanding,
  embroideryprint: embroideryLanding,
  merchi: merchLanding,
  stickerpack: stickerpackLanding,
  printing: printingLanding,
  businesscard: businesscardLanding,
  sticker: stickerLanding,
  leaflet: leafletLanding,
  booklet: bookletLanding,
  magazine: magazineLanding,
  flags: flagsLanding,
  banner: bannerLanding,
  "razrabotka-saytov": sitesHubLanding,
  lending: lendingLanding,
  "internet-magazin": shopLanding,
  "korporativnyy-sayt": corporateLanding,
};

export function getLanding(slug: string) {
  return landings[slug];
}
