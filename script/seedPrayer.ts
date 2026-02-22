
import "dotenv/config";
import { db } from "@/lib/db/drizzle";
import { prayerTemplate } from "@/lib/db/schema";

async function seedPrayers() {
const prayers = [

/*  JOIE  */
{ emotion: "JOIE", content: "Seigneur, merci pour cette joie qui habite mon cœur aujourd’hui. Merci pour cette lumière intérieure qui me rappelle que Tu es présent dans chaque détail de ma vie. Que ma joie soit enracinée en Toi et non dans les circonstances.", isPremium: false },
{ emotion: "JOIE", content: "Père céleste, je choisis d’accueillir la joie sans peur qu’elle disparaisse. Merci pour cette paix lumineuse qui m’enveloppe aujourd’hui.", isPremium: false },
{ emotion: "JOIE", content: "Seigneur, que ma joie soit profonde et stable. Qu’elle reflète ma confiance en Ton plan pour moi.", isPremium: false },
{ emotion: "JOIE", content: "Merci mon Dieu pour cette légèreté intérieure. Aide-moi à savourer pleinement ce moment de grâce.", isPremium: false },
{ emotion: "JOIE", content: "Aujourd’hui je reconnais Ta bonté dans ma vie. Que ma joie soit un témoignage de Ta fidélité.", isPremium: false },
{ emotion: "JOIE", content: "Seigneur, protège cette joie contre le doute et la comparaison. Apprends-moi à l’honorer.", isPremium: false },
{ emotion: "JOIE", content: "Merci pour la femme que je deviens. Que ma joie soit consciente et alignée.", isPremium: false },
{ emotion: "JOIE", content: "Mon Dieu, je célèbre aujourd’hui les petites victoires. Merci pour Ta présence constante.", isPremium: false },
{ emotion: "JOIE", content: "Que cette joie me fortifie et m’inspire à avancer avec confiance.", isPremium: false },
{ emotion: "JOIE", content: "Seigneur, fais de ma joie une force douce et stable.", isPremium: false },

/*  TRISTE  */
{ emotion: "TRISTE", content: "Seigneur, mon cœur est lourd aujourd’hui. Viens apaiser cette tristesse et enveloppe-moi de Ta douceur.", isPremium: false },
{ emotion: "TRISTE", content: "Père céleste, je dépose devant Toi cette peine que je ne comprends pas toujours.", isPremium: false },
{ emotion: "TRISTE", content: "Quand la tristesse m’envahit, rappelle-moi que je ne suis jamais seule.", isPremium: false },
{ emotion: "TRISTE", content: "Mon Dieu, aide-moi à accepter cette émotion sans honte.", isPremium: false },
{ emotion: "TRISTE", content: "Seigneur, transforme ma tristesse en croissance intérieure.", isPremium: false },
{ emotion: "TRISTE", content: "Je Te confie mes larmes, car Tu connais mon cœur.", isPremium: false },
{ emotion: "TRISTE", content: "Que Ta paix pénètre là où la douleur s’est installée.", isPremium: false },
{ emotion: "TRISTE", content: "Même dans la tristesse, je choisis de croire que Tu agis.", isPremium: false },
{ emotion: "TRISTE", content: "Apprends-moi à traverser cette saison avec foi.", isPremium: false },
{ emotion: "TRISTE", content: "Merci Seigneur de rester présent même quand je me sens vide.", isPremium: false },

/*ANXIEUSE */
{ emotion: "ANXIEUSE", content: "Seigneur, mon esprit est agité. Viens calmer mes pensées.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Père céleste, je Te remets mes inquiétudes.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Aide-moi à respirer profondément et à Te faire confiance.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Mon Dieu, éloigne la peur qui m’envahit.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Je choisis aujourd’hui de déposer mes craintes à Tes pieds.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Remplis mon cœur d’une paix qui dépasse ma compréhension.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Que ma foi soit plus forte que mon anxiété.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Guide-moi vers la sérénité intérieure.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Seigneur, apprends-moi à lâcher prise.", isPremium: false },
{ emotion: "ANXIEUSE", content: "Je refuse que l’angoisse définisse ma journée.", isPremium: false },

/*  FATIGUEE  */
{ emotion: "FATIGUEE", content: "Seigneur, je me sens épuisée. Renouvelle mes forces.", isPremium: false },
{ emotion: "FATIGUEE", content: "Donne-moi l’énergie nécessaire pour continuer.", isPremium: false },
{ emotion: "FATIGUEE", content: "Aide-moi à respecter mes limites.", isPremium: false },
{ emotion: "FATIGUEE", content: "Que je trouve du repos en Ta présence.", isPremium: false },
{ emotion: "FATIGUEE", content: "Restaure mon corps et mon esprit.", isPremium: false },
{ emotion: "FATIGUEE", content: "Apprends-moi à ralentir sans culpabilité.", isPremium: false },
{ emotion: "FATIGUEE", content: "Merci pour Ta force quand la mienne faiblit.", isPremium: false },
{ emotion: "FATIGUEE", content: "Je m’abandonne à Ton réconfort.", isPremium: false },
{ emotion: "FATIGUEE", content: "Donne-moi la clarté dans ma fatigue.", isPremium: false },
{ emotion: "FATIGUEE", content: "Seigneur, soutiens-moi aujourd’hui.", isPremium: false },

/*  EN_COLERE */
{ emotion: "EN_COLERE", content: "Seigneur, ma colère me submerge. Apaise mon cœur.", isPremium: false },
{ emotion: "EN_COLERE", content: "Aide-moi à répondre avec sagesse.", isPremium: false },
{ emotion: "EN_COLERE", content: "Transforme cette colère en force constructive.", isPremium: false },
{ emotion: "EN_COLERE", content: "Donne-moi le discernement.", isPremium: false },
{ emotion: "EN_COLERE", content: "Apprends-moi à pardonner.", isPremium: false },
{ emotion: "EN_COLERE", content: "Libère-moi de la rancune.", isPremium: false },
{ emotion: "EN_COLERE", content: "Que ma colère ne contrôle pas mes paroles.", isPremium: false },
{ emotion: "EN_COLERE", content: "Seigneur, purifie mes intentions.", isPremium: false },
{ emotion: "EN_COLERE", content: "Aide-moi à guérir intérieurement.", isPremium: false },
{ emotion: "EN_COLERE", content: "Je choisis la paix au lieu du conflit.", isPremium: false },

/*  RECONNAISSANTE  */
{ emotion: "RECONNAISSANTE", content: "Seigneur, merci pour Ta fidélité.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Je Te rends grâce pour chaque bénédiction.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Merci pour les leçons apprises.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Mon cœur déborde de gratitude.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Merci pour la croissance intérieure.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Je célèbre Tes bienfaits.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Merci pour Ta présence constante.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Aide-moi à rester reconnaissante.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Que la gratitude guide mes pensées.", isPremium: false },
{ emotion: "RECONNAISSANTE", content: "Merci pour aujourd’hui.", isPremium: false },

/*  EN_PAIX */
{ emotion: "EN_PAIX", content: "Seigneur, merci pour cette paix intérieure.", isPremium: false },
{ emotion: "EN_PAIX", content: "Que cette sérénité demeure en moi.", isPremium: false },
{ emotion: "EN_PAIX", content: "Je me repose en Ta présence.", isPremium: false },
{ emotion: "EN_PAIX", content: "Merci pour cette stabilité émotionnelle.", isPremium: false },
{ emotion: "EN_PAIX", content: "Je choisis de rester centrée.", isPremium: false },
{ emotion: "EN_PAIX", content: "Que mon esprit reste calme.", isPremium: false },
{ emotion: "EN_PAIX", content: "Merci pour cette clarté.", isPremium: false },
{ emotion: "EN_PAIX", content: "Je Te confie ma journée.", isPremium: false },
{ emotion: "EN_PAIX", content: "Que la paix guide mes décisions.", isPremium: false },
{ emotion: "EN_PAIX", content: "Je respire et je Te fais confiance.", isPremium: false },

/*  DISTRAITE */
{ emotion: "DISTRAITE", content: "Seigneur, aide-moi à me recentrer.", isPremium: false },
{ emotion: "DISTRAITE", content: "Ramène mon attention vers l’essentiel.", isPremium: false },
{ emotion: "DISTRAITE", content: "Donne-moi la discipline intérieure.", isPremium: false },
{ emotion: "DISTRAITE", content: "Éloigne les distractions inutiles.", isPremium: false },
{ emotion: "DISTRAITE", content: "Que je retrouve ma concentration.", isPremium: false },
{ emotion: "DISTRAITE", content: "Aide-moi à clarifier mes priorités.", isPremium: false },
{ emotion: "DISTRAITE", content: "Je choisis de me recentrer.", isPremium: false },
{ emotion: "DISTRAITE", content: "Guide mes pensées.", isPremium: false },
{ emotion: "DISTRAITE", content: "Que mon esprit soit discipliné.", isPremium: false },
{ emotion: "DISTRAITE", content: "Ramène-moi à Toi.", isPremium: false },

/*  MOTIVEE  */
{ emotion: "MOTIVEE", content: "Seigneur, merci pour cette énergie intérieure.", isPremium: false },
{ emotion: "MOTIVEE", content: "Aide-moi à transformer ma motivation en action.", isPremium: false },
{ emotion: "MOTIVEE", content: "Que je reste disciplinée.", isPremium: false },
{ emotion: "MOTIVEE", content: "Guide mes ambitions.", isPremium: false },
{ emotion: "MOTIVEE", content: "Je choisis la persévérance.", isPremium: false },
{ emotion: "MOTIVEE", content: "Renforce ma détermination.", isPremium: false },
{ emotion: "MOTIVEE", content: "Merci pour cette force intérieure.", isPremium: false },
{ emotion: "MOTIVEE", content: "Que je progresse chaque jour.", isPremium: false },
{ emotion: "MOTIVEE", content: "Soutiens mes projets.", isPremium: false },
{ emotion: "MOTIVEE", content: "Je crois en la femme que je deviens.", isPremium: false },

/*  STRESSEE  */
{ emotion: "STRESSEE", content: "Seigneur, le stress m’envahit. Apaise-moi.", isPremium: false },
{ emotion: "STRESSEE", content: "Donne-moi le calme au milieu du chaos.", isPremium: false },
{ emotion: "STRESSEE", content: "Je Te confie mes responsabilités.", isPremium: false },
{ emotion: "STRESSEE", content: "Aide-moi à ralentir.", isPremium: false },
{ emotion: "STRESSEE", content: "Que Ta paix m’enveloppe.", isPremium: false },
{ emotion: "STRESSEE", content: "Guide-moi vers la clarté.", isPremium: false },
{ emotion: "STRESSEE", content: "Je refuse de me laisser submerger.", isPremium: false },
{ emotion: "STRESSEE", content: "Renforce ma stabilité intérieure.", isPremium: false },
{ emotion: "STRESSEE", content: "Donne-moi la patience.", isPremium: false },
{ emotion: "STRESSEE", content: "Merci pour Ta présence rassurante.", isPremium: false },

];
  try {
    await db.insert(prayerTemplate).values(prayers as any);

  } catch (error) {
    console.error("Erreur lors du seed des prières :", error);
  }
}

seedPrayers();